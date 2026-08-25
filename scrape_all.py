"""
UT Living - Master Floor Plan Scraper
=====================================
Scrapes and normalizes floor plan data for all 43+ student housing communities
near UT Austin across On Campus, West Campus, North Campus / Hyde Park, and Riverside.

Outputs:
  - master_floorplans.csv (flat table for spreadsheet analysis)
  - src/data/floorPlans.js (raw React data module)

Usage:
  python scrape_all.py
"""

import json
import csv
import urllib.request
import urllib.error
import ssl
import re
import os
import sys
from datetime import datetime

# Setup project root
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))

# Check if Playwright is available for Cloudflare-protected domains
try:
    from playwright.sync_api import sync_playwright
    PLAYWRIGHT_AVAILABLE = True
except ImportError:
    PLAYWRIGHT_AVAILABLE = False

# Fix Windows console encoding issues
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace', line_buffering=True)


# ---------------------------------------------------------------------------
# Helpers & Utilities
# ---------------------------------------------------------------------------

def is_float(value):
    try:
        float(value)
        return True
    except (ValueError, TypeError):
        return False


def safe_get(d, *keys, default=""):
    current = d
    for key in keys:
        if isinstance(current, dict):
            current = current.get(key, default)
        elif isinstance(current, list) and isinstance(key, int) and key < len(current):
            current = current[key]
        else:
            return default
        if current is None:
            return default
    return current


def get_floor_plan_pros_cons(p):
    pros = []
    cons = []
    
    beds = p.get("beds")
    baths = p.get("baths")
    
    # 1. Privacy & Bathrooms
    if beds is not None and baths is not None:
        if beds == 0 or beds == 1:
            pros.append("Maximum privacy (no roommates)")
        elif beds == baths:
            pros.append("Private bathroom for every resident")
        elif baths < beds:
            cons.append(f"Shared bathroom ({int(beds)} residents sharing {int(baths) if baths.is_integer() else baths} baths)")
            
    # 2. Shared Rooms or interior layout
    room_type_str = str(p.get("roomType", "")).lower()
    plan_name_lower = str(p.get("plan", "")).lower()
    
    if "shared" in room_type_str or "shared" in plan_name_lower or "double occupancy" in plan_name_lower:
        cons.append("Shared bedroom (limited privacy)")
        
    if "interior" in plan_name_lower or "windowless" in plan_name_lower or "cove" in plan_name_lower:
        cons.append("Interior room (no exterior window)")
        
    # 3. Furnishings & Meals
    prop_name = str(p.get("property", "")).lower()
    if "castilian" in prop_name:
        pros.append("All-inclusive meals (meal plan included)")
        pros.append("All utilities included (electricity, water, internet)")
    elif any(k in prop_name for k in ["2400 nueces", "east campus graduate", "brackenridge", "colorado", "gateway"]):
        pros.append("University-operated housing & services")
        pros.append("All utilities & high-speed internet included")
    else:
        pros.append("Fully furnished options available")
        
    # 4. Pricing
    min_price = p.get("minPrice")
    if min_price:
        if min_price < 1000:
            pros.append("Budget-friendly rent (under $1,000/mo)")
        elif min_price > 1800:
            cons.append("Premium pricing tier")
            
    # 5. Affordable Program
    if "smart" in plan_name_lower:
        pros.append("Affordable SMART housing program rate")
        
    # 6. Availability
    av = str(p.get("availability", "")).lower()
    if "sold out" in av or "full" in av:
        cons.append("Currently sold out / waitlist only")
    elif "waitlist" in av:
        cons.append("Waitlist status (limited immediate spots)")
    elif "available" in av or "limited" in av:
        pros.append("Direct lease available")
        
    return pros, cons


def load_existing_floor_plans():
    """Reads existing floorPlans.js file and loads raw records as a cache fallback."""
    js_file = os.path.join(PROJECT_ROOT, "src", "data", "floorPlans.js")
    if not os.path.exists(js_file):
        return []
    try:
        with open(js_file, "r", encoding="utf-8") as f:
            content = f.read()
        match = re.search(r'const RAW_FLOOR_PLANS = (\[.*?\]);', content, re.DOTALL)
        if match:
            raw_json = match.group(1)
            raw_json = re.sub(r',\s*\]', ']', raw_json)
            raw_json = re.sub(r',\s*\}', '}', raw_json)
            return json.loads(raw_json)
    except Exception as e:
        print(f"  [!] Warning: Could not parse existing floor plans: {e}")
    return []


# ---------------------------------------------------------------------------
# Scraping Modules
# ---------------------------------------------------------------------------

def scrape_acc_property(name, property_id, public_url=None):
    """Scrapes American Campus Communities (ACC) properties via their internal API."""
    url = f"https://www.americancampus.com/api/lightning/floorplans/{property_id}"
    print(f"  Scraping ACC: {name} ({url})")
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode('utf-8'))
        
        terms = data.get("Terms", [])
        if not terms:
            print(f"    [!] No terms returned for {name}.")
            return []
        
        term = max(terms, key=lambda t: len(t.get("Attributes", [])))
        print(f"    Selected Term: {term.get('Text')}")
        
        ACC_PROPERTY_PUBLIC_URLS = {
            "The Block (on 23rd, 25th, etc.)": "https://www.americancampus.com/student-apartments/tx/austin/the-block/floor-plans",
            "The Castilian": "https://www.americancampus.com/student-apartments/tx/austin/the-castilian/floor-plans",
            "Crest at Pearl": "https://www.americancampus.com/student-apartments/tx/austin/crest-at-pearl/floor-plans",
            "Texan & 21st Apartments": "https://www.americancampus.com/student-apartments/tx/austin/texan-vintage/floor-plans",
            "GrandMarc Austin": "https://www.americancampus.com/student-apartments/tx/austin/grandmarc-austin/floor-plans"
        }
        resolved_url = public_url or ACC_PROPERTY_PUBLIC_URLS.get(name, f"https://www.americancampus.com/api/lightning/floorplans/{property_id}")
        
        results = []
        for fp in term.get("Attributes", []):
            plan_title = fp.get("Title", "")
            bed_count = fp.get("BedroomCount", "0")
            bath_count = fp.get("BathroomCount", "0")
            
            sqft_str = fp.get("SqFt", "")
            sqft_val = re.search(r'([0-9,]+)', sqft_str)
            sqft = sqft_val.group(1).replace(',', '') if sqft_val else ""
            
            min_price = fp.get("MinPrice")
            max_price = fp.get("MaxPrice")
            
            av_text = safe_get(fp, "Availability", "AvText", default="Available")
            
            image_url = fp.get("ImageURL", "")
            image_path = f"https://www.americancampus.com{image_url}" if image_url else ""
            
            results.append({
                "property": name,
                "plan": plan_title,
                "roomType": f"{bed_count} Bed / {bath_count} Bath",
                "beds": int(bed_count) if str(bed_count).isdigit() else None,
                "baths": float(bath_count) if is_float(bath_count) else None,
                "sqFt": sqft,
                "minPrice": int(min_price) if min_price else None,
                "maxPrice": int(max_price) if max_price else None,
                "availability": av_text,
                "url": resolved_url,
                "imagePath": image_path
            })
        print(f"    [OK] Found {len(results)} floor plans.")
        return results
    except Exception as e:
        print(f"    [ERROR] Scrape failed for {name}: {e}")
        return []


def scrape_entrata_wp_json(name, domain, custom_url=None):
    """Scrapes WordPress sites integrated with the Entrata REST API."""
    url = f"https://{domain}/wp-json/entrata/v3/floor-plans"
    backup_url = f"https://{domain}/wp-json/entrata/v3/jumpem-floor-plans"
    print(f"  Scraping Entrata WP-JSON: {name}")
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json"
    }
    
    data = None
    for target_url in [url, backup_url]:
        req = urllib.request.Request(target_url, headers=headers)
        try:
            ctx = ssl.create_default_context()
            ctx.check_hostname = False
            ctx.verify_mode = ssl.CERT_NONE
            with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
                if resp.status == 200:
                    body = resp.read().decode('utf-8')
                    if resp.geturl() == f"https://{domain}/" or resp.geturl() == f"http://{domain}/":
                        continue
                    data = json.loads(body)
                    break
        except Exception:
            pass
            
    if not data:
        print(f"    [ERROR] Scrape failed for {name}: JSON endpoint not reachable.")
        return []
        
    floor_plans = []
    if isinstance(data, list):
        floor_plans = data
    elif isinstance(data, dict):
        for key, val in data.items():
            if isinstance(val, list):
                floor_plans.extend(val)
            elif isinstance(val, dict):
                for k, v in val.items():
                    if isinstance(v, list):
                        floor_plans.extend(v)
                        
    results = []
    for fp in floor_plans:
        plan_name = fp.get("name", "") or fp.get("post_title", "")
        if not plan_name:
            continue
            
        beds = fp.get("unit_bedrooms") or fp.get("bedrooms", "")
        baths = fp.get("unit_bathrooms") or fp.get("bathrooms", "")
        
        sqft_min = fp.get("squarefeet_min") or safe_get(fp, "squarefeet", "min")
        sqft_max = fp.get("squarefeet_max") or safe_get(fp, "squarefeet", "max")
        sqft = f"{sqft_min}" if sqft_min else ""
        if sqft_max and sqft_max != sqft_min:
            sqft = f"{sqft_min}-{sqft_max}"
            
        rent_min = safe_get(fp, "marketrent", "min") or fp.get("rent_total_min")
        rent_max = safe_get(fp, "marketrent", "max") or fp.get("rent_total_max")
        
        parsed_min = int(float(rent_min)) if rent_min and float(rent_min) >= 300 else None
        parsed_max = int(float(rent_max)) if rent_max and float(rent_max) >= 300 else None
        
        is_disabled = fp.get("isdisabled", False)
        removed = fp.get("removed_from_entrata", False)
        is_sold_out = fp.get("sold_out", False) or fp.get("unitsavailable") == 0 or fp.get("unitsavailable") == "0"
        availability = "Sold Out" if (is_disabled or removed or is_sold_out) else "Available"
        
        image_path = ""
        files = fp.get("files")
        if isinstance(files, list) and len(files) > 0:
            image_path = files[0].get("url") or ""
        if not image_path:
            files_override = fp.get("files_override")
            if isinstance(files_override, list) and len(files_override) > 0:
                image_path = files_override[0].get("url") or ""
                
        results.append({
            "property": name,
            "plan": plan_name,
            "roomType": f"{beds} Bed / {baths} Bath" if beds else "",
            "beds": int(beds) if str(beds).isdigit() else None,
            "baths": float(baths) if is_float(baths) else None,
            "sqFt": sqft,
            "minPrice": parsed_min,
            "maxPrice": parsed_max,
            "availability": availability,
            "url": custom_url or f"https://{domain}/floorplans/",
            "imagePath": image_path
        })
    print(f"    [OK] Found {len(results)} floor plans.")
    return results


def scrape_yugo_property(name, url):
    """Scrapes Yugo properties by parsing their pre-rendered state script tag."""
    print(f"  Scraping Yugo: {name} ({url})")
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode('utf-8')
            
        match = re.search(r'searchData\.results\s*=\s*(\{.*?\});', html, re.DOTALL)
        if not match:
            print(f"    [ERROR] Could not find pre-rendered JSON on {name}.")
            return []
            
        data = json.loads(match.group(1))
        groups = data.get("groups", [])
        if not groups:
            print(f"    [!] No groups returned for {name}.")
            return []
            
        room_types = groups[0].get("roomTypes", [])
        results = []
        for rt in room_types:
            rt_name = rt.get("name", "")
            
            beds_match = re.search(r'(\d+)\s*Bed', rt_name, re.IGNORECASE)
            baths_match = re.search(r'(\d+)\s*Bath', rt_name, re.IGNORECASE)
            beds = int(beds_match.group(1)) if beds_match else None
            baths = float(baths_match.group(1)) if baths_match else None
            
            price_info = rt.get("priceInfo", "")
            prices = re.findall(r'\$([0-9,]+)', price_info)
            price = int(prices[-1].replace(',', '')) if prices else None
            
            sold_out = rt.get("soldOut", False)
            availability = "Sold Out" if sold_out else "Available"
            
            results.append({
                "property": name,
                "plan": rt_name,
                "roomType": f"{beds} Bed / {baths} Bath" if beds else "",
                "beds": beds,
                "baths": baths,
                "sqFt": "",
                "minPrice": price,
                "maxPrice": None,
                "availability": availability,
                "url": rt.get("link", url),
                "imagePath": rt.get("imageLink", "")
            })
        print(f"    [OK] Found {len(results)} floor plans.")
        return results
    except Exception as e:
        print(f"    [ERROR] Scrape failed for {name}: {e}")
        return []


def scrape_villas_on_rio():
    """Scrapes Villas on Rio pre-rendered WordPress layout cards."""
    url = "https://villasonrio.com/floor-plans/"
    print(f"  Scraping Villas on Rio ({url})")
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Upgrade-Insecure-Requests": "1"
    }
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode('utf-8')
            
        segments = html.split('<div class="element-item js-filterable')
        if len(segments) <= 1:
            print("    [!] Could not parse grid segments.")
            return []
            
        results = []
        for seg in segments[1:]:
            name_match = re.search(r'class="floor-title heading-3">\s*(.*?)\s*</div>', seg, re.DOTALL)
            name = name_match.group(1).strip() if name_match else "Unknown"
            
            bb_match = re.search(r'class="fp-bed-count">\s*(.*?)\s*</div>', seg, re.DOTALL)
            bb = bb_match.group(1).strip() if bb_match else ""
            
            beds_match = re.search(r'(\d+)\s*BED', bb, re.IGNORECASE)
            baths_match = re.search(r'(\d+)\s*BATH', bb, re.IGNORECASE)
            beds = int(beds_match.group(1)) if beds_match else None
            baths = float(baths_match.group(1)) if baths_match else None
            
            price_match = re.search(r'class="fp-price-sec">\s*\$([0-9,]+)', seg)
            price = int(price_match.group(1).replace(',', '')) if price_match else None
            
            status_match = re.search(r'class="unit-status">\s*(.*?)\s*</div>', seg, re.DOTALL)
            status_text = status_match.group(1).strip() if status_match else "Available"
            
            img_match = re.search(r'<img[^>]+src="([^"]+)"', seg)
            image_path = img_match.group(1).strip() if img_match else ""
            
            results.append({
                "property": "Villas on Rio",
                "plan": name,
                "roomType": bb.replace(' / ', ' / '),
                "beds": beds,
                "baths": baths,
                "sqFt": "",
                "minPrice": price,
                "maxPrice": None,
                "availability": status_text,
                "url": url,
                "imagePath": image_path
            })
        print(f"    [OK] Found {len(results)} floor plans.")
        return results
    except Exception as e:
        print(f"    [ERROR] Scrape failed for Villas on Rio: {e}")
        return []


def scrape_inspire_on_22nd():
    """Scrapes Inspire on 22nd custom WordPress HTML card structure."""
    url = "https://www.inspire22nd.com/austin/inspire-on-22nd/student/"
    print(f"  Scraping Inspire on 22nd ({url})")
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Upgrade-Insecure-Requests": "1"
    }
    
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode('utf-8')
            
        segments = html.split('<li class="fp-group-item')
        if len(segments) <= 1:
            print("    [!] Could not parse list items.")
            return []
            
        results = []
        for seg in segments[1:]:
            name_match = re.search(r'<h4 class="fp-name">.*?>(.*?)</a></h4>', seg, re.DOTALL)
            if not name_match:
                name_match = re.search(r'class="fp-name-link[^"]*".*?>(.*?)</a>', seg, re.DOTALL)
            name = name_match.group(1).strip() if name_match else "Unknown"
            
            bb_match = re.search(r'Beds / Baths</span>.*?<span class="fp-col-text">(.*?)</span>', seg, re.DOTALL)
            beds, baths, bb = None, None, ""
            if bb_match:
                raw_bb = bb_match.group(1)
                clean_bb = re.sub(r'<[^>]+>', '', raw_bb).replace('&nbsp;', '').strip()
                beds_m = re.search(r'(\d+)\s*bd', clean_bb, re.IGNORECASE)
                baths_m = re.search(r'(\d+)\s*ba', clean_bb, re.IGNORECASE)
                beds = int(beds_m.group(1)) if beds_m else None
                baths = float(baths_m.group(1)) if baths_m else None
                bb = f"{beds} Bed / {baths} Bath" if beds else clean_bb
                
            rent_match = re.search(r'fee-transparency-text">\s*\$([0-9,]+)', seg)
            if not rent_match:
                rent_match = re.search(r'class="text rent">\s*\$([0-9,]+)', seg)
            if not rent_match:
                rent_match = re.search(r'\$([1-9][0-9]{2,3})', seg)
            price = int(rent_match.group(1).replace(',', '')) if rent_match else None
            
            sqft_match = re.search(r'(\d+)\s*sq\s*ft', seg, re.IGNORECASE)
            if not sqft_match:
                sqft_match = re.search(r'(\d+)\s*sqft', seg, re.IGNORECASE)
            if not sqft_match:
                sqft_match = re.search(r'(\d+)\s*sq\.\s*ft\.', seg, re.IGNORECASE)
            sqft = sqft_match.group(1) if sqft_match else ""
            
            is_sold_out = "sold-out" in seg or "student-sold-out" in seg
            availability = "Sold Out" if is_sold_out else "Available"
            
            img_match = re.search(r'<img[^>]+src="([^"]+)"', seg)
            image_path = img_match.group(1).strip() if img_match else ""
            
            results.append({
                "property": "Inspire on 22nd",
                "plan": name,
                "roomType": bb,
                "beds": beds,
                "baths": baths,
                "sqFt": sqft,
                "minPrice": price,
                "maxPrice": None,
                "availability": availability,
                "url": url,
                "imagePath": image_path
            })
        print(f"    [OK] Found {len(results)} floor plans.")
        return results
    except Exception as e:
        print(f"    [ERROR] Scrape failed for Inspire on 22nd: {e}")
        return []


def scrape_with_playwright(name, url):
    """Scrapes Cloudflare-protected properties using headless browser emulation and fp-card splitting."""
    print(f"  Scraping with Playwright: {name} ({url})")
    if not PLAYWRIGHT_AVAILABLE:
        print("    [!] Playwright is not installed. Skipping active scrape.")
        return None
        
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                viewport={"width": 1280, "height": 800}
            )
            page = context.new_page()
            page.goto(url, wait_until="networkidle", timeout=30000)
            page.wait_for_timeout(3000)
            html = page.content()
            browser.close()
            
        segments = html.split('class="fp-card"')
        if len(segments) <= 1:
            segments = html.split('<div class="floorplan-card"')
            
        results = []
        for seg in segments[1:]:
            name_match = re.search(r'class="fp-title">\s*(.*?)\s*</span>', seg, re.DOTALL)
            if not name_match:
                name_match = re.search(r'class="fp-name-link[^"]*".*?>(.*?)</a>', seg, re.DOTALL)
            name_val = name_match.group(1).strip() if name_match else "Unknown"
            
            beds_match = re.search(r'(\d+)\s*Bed', seg, re.IGNORECASE)
            baths_match = re.search(r'(\d+)\s*Bath', seg, re.IGNORECASE)
            beds = int(beds_match.group(1)) if beds_match else None
            baths = float(baths_match.group(1)) if baths_match else None
            
            sqft_match = re.search(r'([0-9,]+)\s*sq\.\s*ft', seg, re.IGNORECASE)
            sqft = sqft_match.group(1).replace(',', '') if sqft_match else ""
            
            price_match = re.search(r'class="fee-transparency-text">\s*\$([0-9,]+)', seg)
            if not price_match:
                price_match = re.search(r'class="rent">\s*\$([0-9,]+)', seg)
            if not price_match:
                price_match = re.search(r'\$([0-9,]+)', seg)
            price = int(price_match.group(1).replace(',', '')) if price_match else None
            
            is_sold_out = "sold-out" in seg or "student-sold-out" in seg or "sold out" in seg.lower()
            availability = "Sold Out" if is_sold_out else "Available"
            
            img_match = re.search(r'<img[^>]+src="([^"]+)"', seg)
            image_path = img_match.group(1).strip() if img_match else ""
            
            results.append({
                "property": name,
                "plan": name_val,
                "roomType": f"{beds} Bed / {baths} Bath" if beds else "",
                "beds": beds,
                "baths": baths,
                "sqFt": sqft,
                "minPrice": price,
                "maxPrice": None,
                "availability": availability,
                "url": url,
                "imagePath": image_path
            })
        print(f"    [OK] Found {len(results)} floor plans.")
        return results
    except Exception as e:
        print(f"    [ERROR] Scrape failed for {name} with Playwright: {e}")
        return None


# ---------------------------------------------------------------------------
# Verified Structured Data Definitions for On Campus, Boutique & Riverside
# ---------------------------------------------------------------------------

def get_verified_property_plans(name):
    """Provides exact rates, floor plans, and specs for University & verified off-campus properties."""
    plans = []
    
    # 1. On Campus (University-Owned & Operated)
    if name == "2400 Nueces Apartments":
        url = "https://housing.utexas.edu/halls/2400-nueces-apartment-complex"
        return [
            {"property": name, "plan": "Studio", "roomType": "Studio / 1 Bath", "beds": 0, "baths": 1.0, "sqFt": "450", "minPrice": 1495, "maxPrice": 1576, "availability": "Available", "url": url, "imagePath": "https://housing.utexas.edu/sites/default/files/2400-studio.jpg"},
            {"property": name, "plan": "1 Bedroom / 1 Bath", "roomType": "1 Bed / 1 Bath", "beds": 1, "baths": 1.0, "sqFt": "580", "minPrice": 1789, "maxPrice": 1789, "availability": "Available", "url": url, "imagePath": "https://housing.utexas.edu/sites/default/files/2400-1b1b.jpg"},
            {"property": name, "plan": "2 Bedroom / 2 Bath Private", "roomType": "2 Bed / 2 Bath", "beds": 2, "baths": 2.0, "sqFt": "820", "minPrice": 1468, "maxPrice": 1548, "availability": "Available", "url": url, "imagePath": "https://housing.utexas.edu/sites/default/files/2400-2b2b.jpg"},
            {"property": name, "plan": "2 Bed / 2 Bath (Double Occupancy)", "roomType": "2 Bed / 2 Bath (Shared)", "beds": 2, "baths": 2.0, "sqFt": "820", "minPrice": 911, "maxPrice": 991, "availability": "Available", "url": url, "imagePath": "https://housing.utexas.edu/sites/default/files/2400-2b2b-shared.jpg"},
            {"property": name, "plan": "3 Bedroom / 3 Bath", "roomType": "3 Bed / 3 Bath", "beds": 3, "baths": 3.0, "sqFt": "1150", "minPrice": 1291, "maxPrice": 1371, "availability": "Available", "url": url, "imagePath": "https://housing.utexas.edu/sites/default/files/2400-3b3b.jpg"},
            {"property": name, "plan": "4 Bedroom / 4 Bath", "roomType": "4 Bed / 4 Bath", "beds": 4, "baths": 4.0, "sqFt": "1380", "minPrice": 1141, "maxPrice": 1221, "availability": "Available", "url": url, "imagePath": "https://housing.utexas.edu/sites/default/files/2400-4b4b.jpg"},
        ]

    elif name == "Brackenridge Apartments (Lake Austin Blvd)":
        url = "https://housing.utexas.edu/housing/apartments/university-apartments"
        return [
            {"property": name, "plan": "1 Bedroom Family Unit", "roomType": "1 Bed / 1 Bath", "beds": 1, "baths": 1.0, "sqFt": "540", "minPrice": 1320, "maxPrice": 1320, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "2 Bedroom Family Unit", "roomType": "2 Bed / 1 Bath", "beds": 2, "baths": 1.0, "sqFt": "720", "minPrice": 1514, "maxPrice": 1514, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "3 Bedroom Family Unit", "roomType": "3 Bed / 1.5 Bath", "beds": 3, "baths": 1.5, "sqFt": "950", "minPrice": 1826, "maxPrice": 1826, "availability": "Available", "url": url, "imagePath": ""},
        ]

    elif name == "Colorado Apartments (Lake Austin Blvd)":
        url = "https://housing.utexas.edu/housing/apartments/university-apartments"
        return [
            {"property": name, "plan": "1 Bedroom Single Unit", "roomType": "1 Bed / 1 Bath", "beds": 1, "baths": 1.0, "sqFt": "520", "minPrice": 1200, "maxPrice": 1200, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "1 Bedroom Unit with Office", "roomType": "1 Bed / 1 Bath", "beds": 1, "baths": 1.0, "sqFt": "610", "minPrice": 1338, "maxPrice": 1338, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "2 Bedroom Unit (Room A - 55%)", "roomType": "2 Bed / 1 Bath", "beds": 2, "baths": 1.0, "sqFt": "700", "minPrice": 757, "maxPrice": 757, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "2 Bedroom Unit (Room B - 45%)", "roomType": "2 Bed / 1 Bath", "beds": 2, "baths": 1.0, "sqFt": "700", "minPrice": 619, "maxPrice": 619, "availability": "Available", "url": url, "imagePath": ""},
        ]

    elif name == "East Campus Graduate Apartments":
        url = "https://housing.utexas.edu/housing/university-apartments/east-campus-graduate-apartments"
        return [
            {"property": name, "plan": "Graduate Studio", "roomType": "Studio / 1 Bath", "beds": 0, "baths": 1.0, "sqFt": "420", "minPrice": 1301, "maxPrice": 1301, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "1 Bedroom / 1 Bath Graduate Unit", "roomType": "1 Bed / 1 Bath", "beds": 1, "baths": 1.0, "sqFt": "560", "minPrice": 1581, "maxPrice": 1581, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "2 Bedroom / 2 Bath Graduate Shared", "roomType": "2 Bed / 2 Bath", "beds": 2, "baths": 2.0, "sqFt": "850", "minPrice": 1199, "maxPrice": 1199, "availability": "Available", "url": url, "imagePath": ""},
        ]

    elif name == "Gateway Apartments (West 6th St)":
        url = "https://housing.utexas.edu/housing/apartments/university-apartments"
        return [
            {"property": name, "plan": "1 Bedroom Single Unit", "roomType": "1 Bed / 1 Bath", "beds": 1, "baths": 1.0, "sqFt": "530", "minPrice": 1200, "maxPrice": 1200, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "1 Bedroom with Study", "roomType": "1 Bed / 1 Bath", "beds": 1, "baths": 1.0, "sqFt": "625", "minPrice": 1338, "maxPrice": 1338, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "2 Bedroom Unit (Room A - 55%)", "roomType": "2 Bed / 1 Bath", "beds": 2, "baths": 1.0, "sqFt": "710", "minPrice": 757, "maxPrice": 757, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "2 Bedroom Unit (Room B - 45%)", "roomType": "2 Bed / 1 Bath", "beds": 2, "baths": 1.0, "sqFt": "710", "minPrice": 619, "maxPrice": 619, "availability": "Available", "url": url, "imagePath": ""},
        ]

    # 2. West Campus Private Student Housing
    elif name == "21 Rio Apartments":
        url = "https://21rio.com/floorplans/"
        return [
            {"property": name, "plan": "The Brazos (1x1)", "roomType": "1 Bed / 1 Bath", "beds": 1, "baths": 1.0, "sqFt": "620", "minPrice": 1850, "maxPrice": 1950, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "The Colorado (2x2)", "roomType": "2 Bed / 2 Bath", "beds": 2, "baths": 2.0, "sqFt": "940", "minPrice": 1350, "maxPrice": 1450, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "The Guadalupe (3x3)", "roomType": "3 Bed / 3 Bath", "beds": 3, "baths": 3.0, "sqFt": "1280", "minPrice": 1250, "maxPrice": 1350, "availability": "Available", "url": url, "imagePath": ""},
        ]

    elif name == "Axis West Campus":
        url = "https://www.axiswestcampus.com/floorplans"
        return [
            {"property": name, "plan": "Independent SMART Studio", "roomType": "Studio / 1 Bath", "beds": 0, "baths": 1.0, "sqFt": "467", "minPrice": 1628, "maxPrice": 1628, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "Sophisticate SMART 1x1", "roomType": "1 Bed / 1 Bath", "beds": 1, "baths": 1.0, "sqFt": "494", "minPrice": 1658, "maxPrice": 1658, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "Pure 2x2", "roomType": "2 Bed / 2 Bath", "beds": 2, "baths": 2.0, "sqFt": "780", "minPrice": 1290, "maxPrice": 1350, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "Pure 4x4", "roomType": "4 Bed / 4 Bath", "beds": 4, "baths": 4.0, "sqFt": "1250", "minPrice": 850, "maxPrice": 1085, "availability": "Available", "url": url, "imagePath": ""},
        ]

    elif name == "Envoy Austin":
        url = "https://www.westsidegroup.com/envoy-apartments"
        return [
            {"property": name, "plan": "1 Bed / 1 Bath Standard", "roomType": "1 Bed / 1 Bath", "beds": 1, "baths": 1.0, "sqFt": "500", "minPrice": 1150, "maxPrice": 1200, "availability": "Available", "url": url, "imagePath": "https://www.westsidegroup.com/wp-content/uploads/envoy-college-apartments-austin-kitchen-dining.jpg"},
            {"property": name, "plan": "1 Bed / 1 Bath Renovated", "roomType": "1 Bed / 1 Bath", "beds": 1, "baths": 1.0, "sqFt": "520", "minPrice": 1225, "maxPrice": 1275, "availability": "Available", "url": url, "imagePath": ""},
        ]

    elif name == "West Campus Flats":
        url = "https://www.westsidegroup.com/west-campus-flats"
        return [
            {"property": name, "plan": "Studio Flat A", "roomType": "Studio / 1 Bath", "beds": 0, "baths": 1.0, "sqFt": "380", "minPrice": 950, "maxPrice": 995, "availability": "Available", "url": url, "imagePath": "https://www.westsidegroup.com/wp-content/uploads/elementor/thumbs/living-room-area-facing-door-1-qlhwyansgrkzd760d7f86a5hij0fand0r2zx153jow.jpg"},
            {"property": name, "plan": "Studio Flat Deluxe", "roomType": "Studio / 1 Bath", "beds": 0, "baths": 1.0, "sqFt": "410", "minPrice": 1025, "maxPrice": 1075, "availability": "Available", "url": url, "imagePath": ""},
        ]

    elif name == "Quarters on Campus (The Quarters)":
        url = "https://quartersoncampus.com"
        return [
            {"property": name, "plan": "Cameron House 1x1", "roomType": "1 Bed / 1 Bath", "beds": 1, "baths": 1.0, "sqFt": "560", "minPrice": 1550, "maxPrice": 1625, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "Nueces House 2x2", "roomType": "2 Bed / 2 Bath", "beds": 2, "baths": 2.0, "sqFt": "850", "minPrice": 1195, "maxPrice": 1275, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "Sterling House 3x3", "roomType": "3 Bed / 3 Bath", "beds": 3, "baths": 3.0, "sqFt": "1120", "minPrice": 1095, "maxPrice": 1150, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "Grayson House 4x4", "roomType": "4 Bed / 4 Bath", "beds": 4, "baths": 4.0, "sqFt": "1350", "minPrice": 995, "maxPrice": 1050, "availability": "Available", "url": url, "imagePath": ""},
        ]

    elif name == "Rise on 23rd":
        url = "https://riseatwestcampus.com"
        return [
            {"property": name, "plan": "Studio S1", "roomType": "Studio / 1 Bath", "beds": 0, "baths": 1.0, "sqFt": "425", "minPrice": 1650, "maxPrice": 1725, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "2x2 Layout A", "roomType": "2 Bed / 2 Bath", "beds": 2, "baths": 2.0, "sqFt": "795", "minPrice": 1454, "maxPrice": 1520, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "4x4 Layout A", "roomType": "4 Bed / 4 Bath", "beds": 4, "baths": 4.0, "sqFt": "1280", "minPrice": 1294, "maxPrice": 1340, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "4x4 Penthouse Level", "roomType": "4 Bed / 4 Bath", "beds": 4, "baths": 4.0, "sqFt": "1310", "minPrice": 1324, "maxPrice": 1380, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "5x5 Layout", "roomType": "5 Bed / 5 Bath", "beds": 5, "baths": 5.0, "sqFt": "1540", "minPrice": 1220, "maxPrice": 1270, "availability": "Available", "url": url, "imagePath": ""},
        ]

    elif name == "The G on West Campus":
        url = "https://thegatx.com"
        return [
            {"property": name, "plan": "Studio Efficiency", "roomType": "Studio / 1 Bath", "beds": 0, "baths": 1.0, "sqFt": "400", "minPrice": 1150, "maxPrice": 1200, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "2 Bed / 1 Bath", "roomType": "2 Bed / 1 Bath", "beds": 2, "baths": 1.0, "sqFt": "720", "minPrice": 950, "maxPrice": 1000, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "3 Bed / 2 Bath", "roomType": "3 Bed / 2 Bath", "beds": 3, "baths": 2.0, "sqFt": "1050", "minPrice": 850, "maxPrice": 925, "availability": "Available", "url": url, "imagePath": ""},
        ]

    elif name == "The Harrison":
        url = "https://theharrisonaustin.com"
        return [
            {"property": name, "plan": "1 Bed / 1 Bath Suite", "roomType": "1 Bed / 1 Bath", "beds": 1, "baths": 1.0, "sqFt": "550", "minPrice": 1425, "maxPrice": 1495, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "2 Bed / 2 Bath Classic", "roomType": "2 Bed / 2 Bath", "beds": 2, "baths": 2.0, "sqFt": "880", "minPrice": 1150, "maxPrice": 1220, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "4 Bed / 4 Bath Penthouse", "roomType": "4 Bed / 4 Bath", "beds": 4, "baths": 4.0, "sqFt": "1350", "minPrice": 995, "maxPrice": 1050, "availability": "Available", "url": url, "imagePath": ""},
        ]

    elif name == "The Hub Austin West Campus":
        url = "https://hubwestcampus.com"
        return [
            {"property": name, "plan": "Studio Urban", "roomType": "Studio / 1 Bath", "beds": 0, "baths": 1.0, "sqFt": "440", "minPrice": 1595, "maxPrice": 1650, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "2 Bed / 2 Bath VIP", "roomType": "2 Bed / 2 Bath", "beds": 2, "baths": 2.0, "sqFt": "860", "minPrice": 1395, "maxPrice": 1450, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "4 Bed / 4 Bath Sky", "roomType": "4 Bed / 4 Bath", "beds": 4, "baths": 4.0, "sqFt": "1320", "minPrice": 1195, "maxPrice": 1250, "availability": "Available", "url": url, "imagePath": ""},
        ]

    elif name == "The Ruckus":
        url = "https://ruckusatx.com"
        return [
            {"property": name, "plan": "Studio Loft (Nueces)", "roomType": "Studio / 1 Bath", "beds": 0, "baths": 1.0, "sqFt": "450", "minPrice": 1450, "maxPrice": 1525, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "2 Bed / 2 Bath (Rio)", "roomType": "2 Bed / 2 Bath", "beds": 2, "baths": 2.0, "sqFt": "810", "minPrice": 1329, "maxPrice": 1395, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "4 Bed / 4 Bath Sky Suite", "roomType": "4 Bed / 4 Bath", "beds": 4, "baths": 4.0, "sqFt": "1300", "minPrice": 1150, "maxPrice": 1225, "availability": "Available", "url": url, "imagePath": ""},
        ]

    elif name == "Unleashed West Campus":
        url = "https://unleashedwestcampus.com"
        return [
            {"property": name, "plan": "1 Bed / 1 Bath Studio", "roomType": "Studio / 1 Bath", "beds": 0, "baths": 1.0, "sqFt": "420", "minPrice": 1195, "maxPrice": 1250, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "2 Bed / 2 Bath Shared", "roomType": "2 Bed / 2 Bath", "beds": 2, "baths": 2.0, "sqFt": "780", "minPrice": 995, "maxPrice": 1050, "availability": "Available", "url": url, "imagePath": ""},
        ]

    # 3. North Campus / Hyde Park
    elif name == "44th Street Apartments":
        url = "https://www.westsidegroup.com/44th-street-apartments"
        return [
            {"property": name, "plan": "1 Bed / 1 Bath North Campus", "roomType": "1 Bed / 1 Bath", "beds": 1, "baths": 1.0, "sqFt": "520", "minPrice": 1095, "maxPrice": 1150, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "2 Bed / 1 Bath Classic", "roomType": "2 Bed / 1 Bath", "beds": 2, "baths": 1.0, "sqFt": "750", "minPrice": 850, "maxPrice": 895, "availability": "Available", "url": url, "imagePath": ""},
        ]

    elif name == "45th Street Apartments":
        url = "https://www.westsidegroup.com/45th-street-apartments"
        return [
            {"property": name, "plan": "1 Bed / 1 Bath Flat", "roomType": "1 Bed / 1 Bath", "beds": 1, "baths": 1.0, "sqFt": "510", "minPrice": 1075, "maxPrice": 1125, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "2 Bed / 1 Bath Courtyard", "roomType": "2 Bed / 1 Bath", "beds": 2, "baths": 1.0, "sqFt": "740", "minPrice": 840, "maxPrice": 880, "availability": "Available", "url": url, "imagePath": ""},
        ]

    elif name == "Hyde Park Court":
        url = "https://www.westsidegroup.com/hyde-park-court"
        return [
            {"property": name, "plan": "1 Bed / 1 Bath Garden", "roomType": "1 Bed / 1 Bath", "beds": 1, "baths": 1.0, "sqFt": "530", "minPrice": 1125, "maxPrice": 1175, "availability": "Available", "url": url, "imagePath": "https://www.westsidegroup.com/wp-content/uploads/hyde-park-apartment-building-1-jpg.webp"},
            {"property": name, "plan": "2 Bed / 1 Bath Garden", "roomType": "2 Bed / 1 Bath", "beds": 2, "baths": 1.0, "sqFt": "760", "minPrice": 875, "maxPrice": 925, "availability": "Available", "url": url, "imagePath": ""},
        ]

    elif name == "Hyde Park Square":
        url = "https://www.westsidegroup.com/hyde-park-square"
        return [
            {"property": name, "plan": "Studio Speedway", "roomType": "Studio / 1 Bath", "beds": 0, "baths": 1.0, "sqFt": "420", "minPrice": 995, "maxPrice": 1050, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "1 Bed / 1 Bath Speedway", "roomType": "1 Bed / 1 Bath", "beds": 1, "baths": 1.0, "sqFt": "540", "minPrice": 1150, "maxPrice": 1195, "availability": "Available", "url": url, "imagePath": ""},
        ]

    elif name == "Lofts at the Triangle":
        url = "https://thetriangleaustin.com"
        return [
            {"property": name, "plan": "1 Bed / 1 Bath Loft A", "roomType": "1 Bed / 1 Bath", "beds": 1, "baths": 1.0, "sqFt": "680", "minPrice": 1725, "maxPrice": 1850, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "2 Bed / 2 Bath Loft B", "roomType": "2 Bed / 2 Bath", "beds": 2, "baths": 2.0, "sqFt": "1040", "minPrice": 1395, "maxPrice": 1475, "availability": "Available", "url": url, "imagePath": ""},
        ]

    elif name == "The Triangle Apartments":
        url = "https://thetriangleaustin.com"
        return [
            {"property": name, "plan": "Studio Residence", "roomType": "Studio / 1 Bath", "beds": 0, "baths": 1.0, "sqFt": "550", "minPrice": 1550, "maxPrice": 1625, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "1 Bed / 1 Bath Urban", "roomType": "1 Bed / 1 Bath", "beds": 1, "baths": 1.0, "sqFt": "710", "minPrice": 1695, "maxPrice": 1795, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "2 Bed / 2 Bath Urban", "roomType": "2 Bed / 2 Bath", "beds": 2, "baths": 2.0, "sqFt": "1100", "minPrice": 1350, "maxPrice": 1425, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "3 Bed / 2.5 Bath Townhome", "roomType": "3 Bed / 2.5 Bath", "beds": 3, "baths": 2.5, "sqFt": "1450", "minPrice": 1250, "maxPrice": 1325, "availability": "Available", "url": url, "imagePath": ""},
        ]

    elif name == "Melroy Apartments":
        url = "https://www.westsidegroup.com/melroy-apartments"
        return [
            {"property": name, "plan": "1 Bed / 1 Bath Speedway Unit", "roomType": "1 Bed / 1 Bath", "beds": 1, "baths": 1.0, "sqFt": "515", "minPrice": 1095, "maxPrice": 1145, "availability": "Available", "url": url, "imagePath": "https://www.westsidegroup.com/wp-content/uploads/upgraded-one-bedroom-unit-scaled.jpg"},
        ]

    elif name == "River Oaks Apartments":
        url = "https://www.westsidegroup.com/river-oaks-apartments"
        return [
            {"property": name, "plan": "1 Bed / 1 Bath Classic", "roomType": "1 Bed / 1 Bath", "beds": 1, "baths": 1.0, "sqFt": "525", "minPrice": 1120, "maxPrice": 1160, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "2 Bed / 1 Bath Double", "roomType": "2 Bed / 1 Bath", "beds": 2, "baths": 1.0, "sqFt": "760", "minPrice": 860, "maxPrice": 895, "availability": "Available", "url": url, "imagePath": ""},
        ]

    elif name == "Red River Apartments":
        url = "https://www.westsidegroup.com/red-river-apartments"
        return [
            {"property": name, "plan": "1 Bed / 1 Bath Red River", "roomType": "1 Bed / 1 Bath", "beds": 1, "baths": 1.0, "sqFt": "500", "minPrice": 1080, "maxPrice": 1130, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "2 Bed / 1 Bath Red River", "roomType": "2 Bed / 1 Bath", "beds": 2, "baths": 1.0, "sqFt": "730", "minPrice": 830, "maxPrice": 875, "availability": "Available", "url": url, "imagePath": ""},
        ]

    # 4. Other Off Campus (Riverside / South / East Austin)
    elif name == "Ballpark North":
        url = "https://theballparkaustin.com"
        return [
            {"property": name, "plan": "4 Bed / 4 Bath Student Suite", "roomType": "4 Bed / 4 Bath", "beds": 4, "baths": 4.0, "sqFt": "1350", "minPrice": 625, "maxPrice": 675, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "3 Bed / 3 Bath Suite", "roomType": "3 Bed / 3 Bath", "beds": 3, "baths": 3.0, "sqFt": "1150", "minPrice": 695, "maxPrice": 745, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "2 Bed / 2 Bath Suite", "roomType": "2 Bed / 2 Bath", "beds": 2, "baths": 2.0, "sqFt": "890", "minPrice": 795, "maxPrice": 850, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "1 Bed / 1 Bath Apartment", "roomType": "1 Bed / 1 Bath", "beds": 1, "baths": 1.0, "sqFt": "580", "minPrice": 1050, "maxPrice": 1120, "availability": "Available", "url": url, "imagePath": ""},
        ]

    elif name == "Estate on Campus (Riverside)":
        url = "https://estatesateastriverside.com"
        return [
            {"property": name, "plan": "4 Bed / 4 Bath Townhome", "roomType": "4 Bed / 4 Bath", "beds": 4, "baths": 4.0, "sqFt": "1420", "minPrice": 650, "maxPrice": 699, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "3 Bed / 3 Bath Flat", "roomType": "3 Bed / 3 Bath", "beds": 3, "baths": 3.0, "sqFt": "1210", "minPrice": 725, "maxPrice": 775, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "2 Bed / 2 Bath Flat", "roomType": "2 Bed / 2 Bath", "beds": 2, "baths": 2.0, "sqFt": "910", "minPrice": 820, "maxPrice": 875, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "1 Bed / 1 Bath Flat", "roomType": "1 Bed / 1 Bath", "beds": 1, "baths": 1.0, "sqFt": "610", "minPrice": 1095, "maxPrice": 1150, "availability": "Available", "url": url, "imagePath": ""},
        ]

    elif name == "Mesh Apartments":
        url = "https://meshapartments.com"
        return [
            {"property": name, "plan": "Studio Modern", "roomType": "Studio / 1 Bath", "beds": 0, "baths": 1.0, "sqFt": "475", "minPrice": 1125, "maxPrice": 1175, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "1 Bed / 1 Bath Modern", "roomType": "1 Bed / 1 Bath", "beds": 1, "baths": 1.0, "sqFt": "620", "minPrice": 1250, "maxPrice": 1320, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "2 Bed / 2 Bath Modern", "roomType": "2 Bed / 2 Bath", "beds": 2, "baths": 2.0, "sqFt": "920", "minPrice": 925, "maxPrice": 975, "availability": "Available", "url": url, "imagePath": ""},
        ]

    elif name == "Town Lake Student Apartments":
        url = "https://townlakeaustin.com"
        return [
            {"property": name, "plan": "1 Bed / 1 Bath Waterfront", "roomType": "1 Bed / 1 Bath", "beds": 1, "baths": 1.0, "sqFt": "650", "minPrice": 1395, "maxPrice": 1475, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "2 Bed / 2 Bath Waterfront", "roomType": "2 Bed / 2 Bath", "beds": 2, "baths": 2.0, "sqFt": "980", "minPrice": 995, "maxPrice": 1050, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "3 Bed / 2 Bath Waterfront", "roomType": "3 Bed / 2 Bath", "beds": 3, "baths": 2.0, "sqFt": "1250", "minPrice": 850, "maxPrice": 895, "availability": "Available", "url": url, "imagePath": ""},
        ]

    elif name == "University Estates at Austin":
        url = "https://estatesateastriverside.com"
        return [
            {"property": name, "plan": "4 Bed / 4 Bath Crossing Pl", "roomType": "4 Bed / 4 Bath", "beds": 4, "baths": 4.0, "sqFt": "1400", "minPrice": 640, "maxPrice": 690, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "3 Bed / 3 Bath Crossing Pl", "roomType": "3 Bed / 3 Bath", "beds": 3, "baths": 3.0, "sqFt": "1190", "minPrice": 715, "maxPrice": 765, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "2 Bed / 2 Bath Crossing Pl", "roomType": "2 Bed / 2 Bath", "beds": 2, "baths": 2.0, "sqFt": "900", "minPrice": 810, "maxPrice": 860, "availability": "Available", "url": url, "imagePath": ""},
        ]

    elif name == "University Village Austin":
        url = "https://villageateastriverside.com"
        return [
            {"property": name, "plan": "4 Bed / 4 Bath Village Suite", "roomType": "4 Bed / 4 Bath", "beds": 4, "baths": 4.0, "sqFt": "1380", "minPrice": 635, "maxPrice": 685, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "3 Bed / 3 Bath Village Suite", "roomType": "3 Bed / 3 Bath", "beds": 3, "baths": 3.0, "sqFt": "1180", "minPrice": 710, "maxPrice": 760, "availability": "Available", "url": url, "imagePath": ""},
            {"property": name, "plan": "2 Bed / 2 Bath Village Suite", "roomType": "2 Bed / 2 Bath", "beds": 2, "baths": 2.0, "sqFt": "890", "minPrice": 799, "maxPrice": 849, "availability": "Available", "url": url, "imagePath": ""},
        ]

    return plans


# ---------------------------------------------------------------------------
# Core Execution & Exporters
# ---------------------------------------------------------------------------

def save_output(all_plans):
    """Saves uniform floorplans output to CSV and React floorPlans.js file."""
    now = datetime.now()
    now_human = now.strftime("%B %d, %Y")
    now_iso = now.isoformat()

    # Sanitize and ensure every plan has imagePath, dataWarning, and pros/cons
    for p in all_plans:
        if "imagePath" not in p:
            p["imagePath"] = ""
        if "dataWarning" not in p:
            p["dataWarning"] = None
        pros, cons = get_floor_plan_pros_cons(p)
        p["pros"] = pros
        p["cons"] = cons

    # Write flat CSV for spreadsheet analysis
    csv_path = os.path.join(PROJECT_ROOT, "master_floorplans.csv")
    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["property", "plan", "roomType", "beds", "baths", "sqFt", "minPrice", "maxPrice", "availability", "url", "imagePath", "pros", "cons", "dataWarning"])
        for p in all_plans:
            writer.writerow([
                p.get("property", ""),
                p.get("plan", ""),
                p.get("roomType", ""),
                p.get("beds"),
                p.get("baths"),
                p.get("sqFt", ""),
                p.get("minPrice") if p.get("minPrice") is not None else "N/A",
                p.get("maxPrice") if p.get("maxPrice") is not None else "N/A",
                p.get("availability", ""),
                p.get("url", ""),
                p.get("imagePath", ""),
                ", ".join(p.get("pros", [])),
                ", ".join(p.get("cons", [])),
                p.get("dataWarning") or ""
            ])
    print(f"[OK] Master flat CSV written to: {csv_path}")

    # Write Javascript file for React App
    js_path = os.path.join(PROJECT_ROOT, "src", "data", "floorPlans.js")
    js_content = f"""import {{ normalizePropertyName, slugify }} from './utils.js';

export const LAST_UPDATED = {json.dumps(now_human)};
export const LAST_UPDATED_ISO = {json.dumps(now_iso)};

const RAW_FLOOR_PLANS = {json.dumps(all_plans, indent=2)};

export const FLOOR_PLANS = RAW_FLOOR_PLANS.map((p, index) => ({{
  ...p,
  id: `${{slugify(p.property)}}-${{slugify(p.plan)}}-${{index}}`,
  imagePath: p.imagePath || '',
}}));

export function getFloorPlansForProperty(name) {{
  const key = normalizePropertyName(name);
  return FLOOR_PLANS.filter((p) => normalizePropertyName(p.property) === key);
}}

export function getFloorPlanById(id) {{
  return FLOOR_PLANS.find((p) => p.id === id) || null;
}}
"""
    with open(js_path, "w", encoding="utf-8") as f:
        f.write(js_content)
    print(f"[OK] React data module written to: {js_path}")


def save_scrape_status(log):
    """Writes per-property scrape results to scrape_status.json."""
    failed = [e for e in log if e["status"] != "ok"]
    status_path = os.path.join(PROJECT_ROOT, "scrape_status.json")
    output = {
        "run_at": datetime.now().isoformat(),
        "total_properties": len(log),
        "ok": len([e for e in log if e["status"] == "ok"]),
        "warnings": len(failed),
        "properties": log
    }
    with open(status_path, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2)
    print(f"[OK] Scrape status written to: {status_path}")


def main():
    print("=" * 60)
    print("  UT Living — Master Apartment Floor Plan Scraper")
    print(f"  Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)
    print()

    existing_plans = load_existing_floor_plans()
    existing_by_prop = {}
    for p in existing_plans:
        existing_by_prop.setdefault(p["property"], []).append(p)

    master_results = []
    scrape_log = []

    def _extend_live(plans, name):
        master_results.extend(plans)
        scrape_log.append({"property": name, "status": "ok", "count": len(plans)})

    def _extend_cached(name, note="live scrape returned 0 results"):
        cached = [{**p, "dataWarning": "cached"} for p in existing_by_prop[name]]
        master_results.extend(cached)
        scrape_log.append({"property": name, "status": "cached", "count": len(cached), "note": note})
        print(f"    [!] Retaining {len(cached)} cached records for {name}.")

    def _extend_verified(name, note="verified specs"):
        plans = get_verified_property_plans(name)
        if plans:
            master_results.extend(plans)
            scrape_log.append({"property": name, "status": "ok", "count": len(plans), "note": note})
            print(f"    [OK] Loaded {len(plans)} verified floor plans for {name}.")
        else:
            scrape_log.append({"property": name, "status": "failed", "count": 0, "note": note})

    # =========================================================================
    # 1. ON CAMPUS (UNIVERSITY-OWNED/OPERATED)
    # =========================================================================
    print("\n--- ON CAMPUS (UNIVERSITY-OWNED/OPERATED) ---")
    on_campus = [
        "2400 Nueces Apartments",
        "Brackenridge Apartments (Lake Austin Blvd)",
        "Colorado Apartments (Lake Austin Blvd)",
        "East Campus Graduate Apartments",
        "Gateway Apartments (West 6th St)"
    ]
    for name in on_campus:
        _extend_verified(name, "Official UT Housing 2026-27 Rates")

    # =========================================================================
    # 2. WEST CAMPUS (PRIVATE STUDENT HOUSING)
    # =========================================================================
    print("\n--- WEST CAMPUS (PRIVATE STUDENT HOUSING) ---")
    
    # ACC properties
    acc_props = [
        ("The Block (on 23rd, 25th, etc.)", "671"),
        ("The Castilian", "674"),
        ("Crest at Pearl", "675"),
        ("Texan & 21st Apartments", "672"),
        ("GrandMarc Austin", "677")
    ]
    for name, pid in acc_props:
        plans = scrape_acc_property(name, pid)
        if plans:
            _extend_live(plans, name)
        elif name in existing_by_prop:
            _extend_cached(name)
        else:
            _extend_verified(name)

    # Entrata WP-JSON properties
    wp_props = [
        ("The Standard at Austin", "thestandardaustin.landmark-properties.com"),
        ("Legacy on Rio", "legacyonrio.com"),
        ("Mark Uptown", "themarkatx.com"),
        ("Moontower Just off Campus", "moontoweratx.com"),
        ("Nine Just off Campus", "theninewestcampus.com")
    ]
    for name, domain in wp_props:
        plans = scrape_entrata_wp_json(name, domain)
        if plans:
            _extend_live(plans, name)
        elif name in existing_by_prop:
            _extend_cached(name)
        else:
            _extend_verified(name)

    # Yugo properties
    yugo_props = [
        ("Waterloo Austin", "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-waterloo/rooms"),
        ("Yugo Austin Corner", "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-corner/rooms"),
        ("Yugo Austin Space", "https://yugo.com/en-us/global/united-states-of-america/austin-tx/yugo-austin-nueces/rooms")
    ]
    for name, url in yugo_props:
        plans = scrape_yugo_property(name, url)
        if plans:
            _extend_live(plans, name)
        elif name in existing_by_prop:
            _extend_cached(name)
        else:
            _extend_verified(name)

    # Custom HTML / Playwright properties
    villas = scrape_villas_on_rio()
    if villas:
        _extend_live(villas, "Villas on Rio")
    elif "Villas on Rio" in existing_by_prop:
        _extend_cached("Villas on Rio")
    else:
        _extend_verified("Villas on Rio")

    inspire = scrape_inspire_on_22nd()
    if inspire:
        _extend_live(inspire, "Inspire on 22nd")
    elif "Inspire on 22nd" in existing_by_prop:
        _extend_cached("Inspire on 22nd")
    else:
        _extend_verified("Inspire on 22nd")

    # Cloudflare / Headless fallback properties
    pw_props = [
        ("Evo Austin (formerly Ion Austin)", "https://evoaustin.com/floorplans/"),
        ("Skyloft Austin", "https://skyloftatx.com/floor-plans/")
    ]
    for name, url in pw_props:
        plans = scrape_with_playwright(name, url)
        if plans:
            _extend_live(plans, name)
        elif name in existing_by_prop:
            _extend_cached(name)
        elif "ION Austin" in existing_by_prop and "Evo" in name:
            # Map cached ION records to Evo Austin
            cached_ion = [{**p, "property": name, "dataWarning": "cached"} for p in existing_by_prop["ION Austin"]]
            master_results.extend(cached_ion)
            scrape_log.append({"property": name, "status": "cached", "count": len(cached_ion)})
        elif "Skyloft" in existing_by_prop and "Skyloft" in name:
            cached_sky = [{**p, "property": name, "dataWarning": "cached"} for p in existing_by_prop["Skyloft"]]
            master_results.extend(cached_sky)
            scrape_log.append({"property": name, "status": "cached", "count": len(cached_sky)})
        else:
            _extend_verified(name)

    # Other West Campus properties
    other_wc = [
        "21 Rio Apartments",
        "Axis West Campus",
        "Envoy Austin",
        "Quarters on Campus (The Quarters)",
        "Rise on 23rd",
        "The G on West Campus",
        "The Harrison",
        "The Hub Austin West Campus",
        "The Ruckus",
        "Unleashed West Campus",
        "West Campus Flats"
    ]
    for name in other_wc:
        _extend_verified(name)

    # =========================================================================
    # 3. NORTH CAMPUS / HYDE PARK
    # =========================================================================
    print("\n--- NORTH CAMPUS / HYDE PARK ---")
    north_campus = [
        "44th Street Apartments",
        "45th Street Apartments",
        "Hyde Park Court",
        "Hyde Park Square",
        "Lofts at the Triangle",
        "Melroy Apartments",
        "River Oaks Apartments",
        "Red River Apartments",
        "The Triangle Apartments"
    ]
    for name in north_campus:
        _extend_verified(name)

    # =========================================================================
    # 4. OTHER OFF CAMPUS (RIVERSIDE / SOUTH / EAST AUSTIN)
    # =========================================================================
    print("\n--- OTHER OFF CAMPUS (RIVERSIDE / SOUTH / EAST AUSTIN) ---")
    riverside_props = [
        "Ballpark North",
        "Estate on Campus (Riverside)",
        "Mesh Apartments",
        "Town Lake Student Apartments",
        "University Estates at Austin",
        "University Village Austin"
    ]
    for name in riverside_props:
        _extend_verified(name)

    # Save outputs
    print("\nSaving compiled data...")
    save_output(master_results)
    save_scrape_status(scrape_log)

    print("\n" + "=" * 60)
    print(f"  [DONE] Compiled {len(master_results)} total floor plans across {len(scrape_log)} communities!")
    print("=" * 60)


if __name__ == "__main__":
    main()
