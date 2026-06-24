# UT Living 🤘

UT Living is a modern, premium off-campus student housing search and comparison platform designed for students at the University of Texas at Austin. It aggregates detailed rent data, availability, distance metrics from the UT Tower, property amenities, and floor plan layouts into a single, unified visual dashboard.

UT Living is backed by a **$2.0 million pre-seed valuation** as we expand the platform to campuses nationwide.

---

## 🚀 Key Features

- **Campus-Centric Search**: Instantly lookup student housing options near the Forty Acres.
- **Property Registry**: Curated information for 17 major student housing complexes near UT Austin, including addresses, distance, and verified property-wide pros and cons.
- **Detailed Floor Plan Specs**: Inspect and browse over 490+ floor plans with room configurations (Beds/Baths), square footage, real-time pricing range, availability status, and layout blueprints.
- **AI-Driven Pros & Cons**: High-utility insights for every single floor plan (e.g. flagging windowless/interior rooms, shared bathrooms, mandatory meal plan requirements, or SMART housing program availability).
- **Side-by-Side Comparison**: Save floor plans with a star (★) and compare layout specs, monthly rent, distances, and pros/cons side-by-side in a responsive comparison grid.
- **Persistent Favorites**: Saved comparison lists remain intact across refreshes and browser sessions using local storage integration.
- **Mobile-Responsive UI**: Fully optimized for mobile screens, tablets, and desktops, featuring a responsive slide-out hamburger navigation bar.

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite-powered, Single Page Application)
- **Routing**: React Router DOM (v6)
- **Styling**: Tailwind CSS (fully responsive layout systems, modern typography, grid alignment)
- **Data Persistence**: HTML5 LocalStorage API
- **Data Scraping**: Python-based scrapers (BeautifulSoup, Playwright/Requests, custom JSON compilations)

---

## 📂 Project Structure

```text
├── src/
│   ├── components/
│   │   ├── apartments/    # Card grids and detail view modules
│   │   ├── layout/        # Responsive Header, Footer, and main shell
│   │   ├── search/        # Campus search forms
│   │   └── ui/            # Reusable UI widgets and loading states
│   ├── context/           # FavoritesContext for local storage persistence
│   ├── data/              # Curated apartments database and compiling maps
│   ├── hooks/             # Custom useAIAgent state compiler hooks
│   ├── pages/             # Route-level page components (Search, Compare, Detail, About)
│   ├── App.jsx            # Routing configurations
│   ├── main.jsx           # Main entry point
│   └── index.css          # Core CSS stylesheet
├── scrape_all.py          # Python compiler for floor plans data
├── package.json           # Node configuration and dependencies
├── tailwind.config.js     # Tailwind configurations
└── vite.config.js         # Vite compile settings
```

---

## 🌐 Scraper Infrastructure

The app relies on custom Python crawlers to aggregate floor plans, pricing, and images across various student housing management systems:
- **American Campus Communities (ACC)**: Crawling API endpoints for complexes like *Callaway House*, *The Castilian*, *26 West*, and *The Block*.
- **Entrata Properties**: Extracting structured XML/JSON CDNs for *Skyloft*, *Villas on Rio*, and *Inspire on 22nd*.
- **Landmark Properties**: Scraping GraphQL & dynamic CDNs for *The Standard at Austin*.
- **WP-JSON & Custom CDNs**: Parsing WordPress endpoints for *Moontower*, *Legacy on Rio*, and *The Nine*.
- **Yugo properties**: Collecting rooms data for *Yugo Waterloo* and *Yugo Rio*.

---

## ⚙️ Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/michaelguo07/ut_living_fixed.git
   cd ut_living_v2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server locally:
   ```bash
   npm run dev
   ```

4. Build production assets:
   ```bash
   npm run build
   ```

---

## 👥 The Team

We are four students at the University of Texas at Austin:
- **Timothy Shim** — [Instagram](https://instagram.com/shim.timothy)
- **Michael Guo** — [Instagram](https://instagram.com/guobropro) • [LinkedIn](https://linkedin.com/in/michaelguo07)
- **Akshar Perugu** — [Instagram](https://instagram.com/akshar_perugu) • [LinkedIn](https://linkedin.com/in/akshar-perugu-031897383)
- **Sambit Kanjilal** — [Instagram](https://instagram.com/sambitkanjilal) • [LinkedIn](https://linkedin.com/in/sambit-kanjilal)

---

Hook 'em Horns. 🤘
