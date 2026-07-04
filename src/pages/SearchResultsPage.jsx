import { useEffect, useState, useRef } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import L from 'leaflet'
import ApartmentList from '../components/apartments/ApartmentList'
import LoadingPlaceholder from '../components/ui/LoadingPlaceholder'
import { useAIAgent } from '../hooks/useAIAgent'
import { UT_AUSTIN_APARTMENTS } from '../data/apartments'

// Latitude and Longitude coordinates for Austin/West Campus properties
const APARTMENT_COORDINATES = {
  'the-nine-at-west-campus': { lat: 30.2905, lng: -97.7475 },
  'the-standard-at-austin': { lat: 30.2870, lng: -97.7445 },
  'legacy-on-rio': { lat: 30.2915, lng: -97.7450 },
  'the-mark-austin': { lat: 30.2872, lng: -97.7456 },
  'the-block-various-locations': { lat: 30.2930, lng: -97.7450 },
  'callaway-house': { lat: 30.2862, lng: -97.7430 },
  'the-castilian': { lat: 30.2875, lng: -97.7432 },
  '26-west': { lat: 30.2882, lng: -97.7448 },
  'crest-at-pearl': { lat: 30.2952, lng: -97.7440 },
  'texan-and-vintage': { lat: 30.2965, lng: -97.7420 },
  'villas-on-rio': { lat: 30.2900, lng: -97.7450 },
  'ion-austin': { lat: 30.2955, lng: -97.7420 },
  'skyloft': { lat: 30.2875, lng: -97.7442 },
  'moontower': { lat: 30.2858, lng: -97.7432 },
  'yugo-austin-waterloo': { lat: 30.2885, lng: -97.7425 },
  'yugo-austin-rio': { lat: 30.2915, lng: -97.7450 },
  'inspire-on-22nd': { lat: 30.2858, lng: -97.7432 },
}

export default function SearchResultsPage() {
  const { apartments, loading, error, search } = useAIAgent()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const campusQuery = 'UT Austin' // Default to UT Austin since we are focused on it
  
  // Read active filters from URL
  const activeBeds = searchParams.get('beds') || 'any'
  const activeBaths = searchParams.get('baths') || 'any'
  const activeMaxPrice = searchParams.get('maxPrice') || 'any'
  const activeMoveIn = searchParams.get('moveIn') || 'any'
  const activeMaxDistance = searchParams.get('maxDistance') || 'any'

  const hasActiveFilters = activeBeds !== 'any' || activeBaths !== 'any' || activeMaxPrice !== 'any' || activeMoveIn !== 'any' || activeMaxDistance !== 'any'
  const displayApartments = apartments.length === 0 && !loading && !error ? UT_AUSTIN_APARTMENTS : apartments
  const showFallbackWarning = !loading && !error && apartments.length === 0 && hasActiveFilters

  // Local UI states
  const [hoveredAptId, setHoveredAptId] = useState(null)
  const [selectedPin, setSelectedPin] = useState(null)
  const [activeDropdown, setActiveDropdown] = useState(null) // 'price' | 'rooms' | 'distance' | 'moveIn'
  const [showMobileMap, setShowMobileMap] = useState(false)

  // Local filter states for beds/baths popover
  const [localBeds, setLocalBeds] = useState(activeBeds)
  const [localBaths, setLocalBaths] = useState(activeBaths)

  const dropdownRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef({})

  // Trigger search based on query params
  useEffect(() => {
    const filters = {
      beds: activeBeds,
      baths: activeBaths,
      maxPrice: activeMaxPrice,
      moveIn: activeMoveIn,
      maxDistance: activeMaxDistance,
    }
    search(campusQuery, filters)
  }, [search, activeBeds, activeBaths, activeMaxPrice, activeMoveIn, activeMaxDistance])

  // Reset local state if active values change
  useEffect(() => {
    setLocalBeds(activeBeds)
    setLocalBaths(activeBaths)
  }, [activeBeds, activeBaths])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Initialize Map
  useEffect(() => {
    if (!mapInstanceRef.current && document.getElementById('map')) {
      const initialLat = 30.290
      const initialLng = -97.744
      const initialZoom = 15

      const map = L.map('map', {
        center: [initialLat, initialLng],
        zoom: initialZoom,
        zoomControl: false,
      })

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map)

      L.control.zoom({ position: 'topright' }).addTo(map)

      mapInstanceRef.current = map
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Update Markers when apartments list or hover states change
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    // Clear old markers
    Object.values(markersRef.current).forEach((marker) => {
      marker.remove()
    })
    markersRef.current = {}

    // Add markers
    displayApartments.forEach((apt) => {
      const coords = APARTMENT_COORDINATES[apt.id]
      if (!coords) return

      const isHovered = hoveredAptId === apt.id
      const isSelected = selectedPin?.id === apt.id
      const priceMatch = apt.cost ? apt.cost.match(/\$([0-9,]+)/) : null
      const displayPrice = priceMatch ? `$${priceMatch[1]}` : 'N/A'

      const customIcon = L.divIcon({
        className: 'custom-leaflet-div-icon',
        html: `
          <div class="rounded-full px-2.5 py-1 text-xs font-extrabold shadow-md border transition-all duration-200 ease-out whitespace-nowrap cursor-pointer ${
            isHovered || isSelected
              ? 'bg-burnt-orange border-burnt-orange text-white scale-110 z-30 animate-pin-bounce'
              : 'bg-white border-stone-300 text-stone-850 hover:border-burnt-orange hover:text-burnt-orange hover:scale-105'
          }">
            ${displayPrice}
          </div>
        `,
        iconSize: [45, 24],
        iconAnchor: [22, 12]
      })

      const marker = L.marker([coords.lat, coords.lng], { icon: customIcon })
        .addTo(map)
        .on('click', () => {
          setSelectedPin(apt)
          const cardEl = document.getElementById(`card-${apt.id}`)
          if (cardEl) {
            cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
          }
        })
        .on('mouseover', () => {
          setHoveredAptId(apt.id)
        })
        .on('mouseout', () => {
          setHoveredAptId(null)
        })

      markersRef.current[apt.id] = marker
    })

    // Center view containing all matching pins
    if (displayApartments.length > 0) {
      const validCoords = displayApartments
        .map((apt) => APARTMENT_COORDINATES[apt.id])
        .filter(Boolean)
      
      if (validCoords.length > 0) {
        const bounds = L.latLngBounds(validCoords.map((c) => [c.lat, c.lng]))
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 16 })
      }
    }
  }, [displayApartments, hoveredAptId, selectedPin])

  const updateUrlParam = (key, value) => {
    const nextParams = new URLSearchParams(searchParams)
    if (value === 'any' || !value) {
      nextParams.delete(key)
    } else {
      nextParams.set(key, value)
    }
    navigate(`/search?${nextParams.toString()}`)
    setActiveDropdown(null)
  }

  const applyRoomsFilter = () => {
    const nextParams = new URLSearchParams(searchParams)
    if (localBeds === 'any') nextParams.delete('beds')
    else nextParams.set('beds', localBeds)

    if (localBaths === 'any') nextParams.delete('baths')
    else nextParams.set('baths', localBaths)

    navigate(`/search?${nextParams.toString()}`)
    setActiveDropdown(null)
  }

  const clearAllFilters = () => {
    navigate('/search')
    setActiveDropdown(null)
  }

  const showEmpty = !loading && !error && displayApartments.length === 0

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-stone-50 animate-fade-in">
      
      {/* 1. Header & Filters row */}
      <div className="bg-white border-b border-stone-200 px-4 py-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-500">
              <span className="text-burnt-orange font-bold uppercase tracking-wider">UT Austin off-campus</span>
              <span>•</span>
              <span>Austin, TX</span>
            </div>
            <h1 className="text-2xl font-extrabold text-stone-900 sm:text-3xl mt-0.5 tracking-tight">
              Find Apartments
            </h1>
          </div>
        </div>

        {/* Horizontal filter pills row (Mimics flight filter bar) */}
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2 mt-4 text-xs font-medium text-stone-700 select-none" ref={dropdownRef}>
          
          {/* Price Pill */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'price' ? null : 'price')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full border transition font-semibold ${
                activeMaxPrice !== 'any'
                  ? 'bg-burnt-orange-light border-burnt-orange text-burnt-orange'
                  : 'bg-white border-stone-300 hover:bg-stone-50'
              }`}
            >
              <span>{activeMaxPrice === 'any' ? 'Price' : `Max $${parseInt(activeMaxPrice).toLocaleString()}/mo`}</span>
              <svg className="h-3 w-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === 'price' && (
              <div className="absolute left-0 mt-1.5 z-40 w-56 rounded-2xl border border-stone-200 bg-white p-3 shadow-xl">
                <div className="flex flex-col gap-1">
                  {[
                    { val: 'any', label: 'Any Price' },
                    { val: '1000', label: 'Under $1,000/mo' },
                    { val: '1500', label: 'Under $1,500/mo' },
                    { val: '2000', label: 'Under $2,000/mo' },
                    { val: '2500', label: 'Under $2,500/mo' },
                  ].map((p) => (
                    <button
                      key={p.val}
                      onClick={() => updateUrlParam('maxPrice', p.val)}
                      className={`w-full text-left rounded-lg px-2.5 py-1.5 text-xs font-bold transition ${
                        activeMaxPrice === p.val ? 'bg-burnt-orange-light text-burnt-orange' : 'hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Rooms (Beds/Baths) Pill */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'rooms' ? null : 'rooms')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full border transition font-semibold ${
                activeBeds !== 'any' || activeBaths !== 'any'
                  ? 'bg-burnt-orange-light border-burnt-orange text-burnt-orange'
                  : 'bg-white border-stone-300 hover:bg-stone-50'
              }`}
            >
              <span>
                {activeBeds === 'any' && activeBaths === 'any'
                  ? 'Beds & Baths'
                  : `${activeBeds === 'any' ? 'Any Bed' : activeBeds === '0' ? 'Studio' : `${activeBeds}B`}, ${activeBaths === 'any' ? 'Any Bath' : `${activeBaths}B+`}`}
              </span>
              <svg className="h-3 w-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === 'rooms' && (
              <div className="absolute left-0 mt-1.5 z-40 w-64 rounded-2xl border border-stone-200 bg-white p-4 shadow-xl">
                <div>
                  <p className="font-bold text-stone-500 mb-2">Bedrooms</p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { val: 'any', label: 'Any' },
                      { val: '0', label: 'Studio' },
                      { val: '1', label: '1B' },
                      { val: '2', label: '2B' },
                      { val: '3', label: '3B' },
                      { val: '4+', label: '4B+' },
                    ].map((b) => (
                      <button
                        key={b.val}
                        onClick={() => setLocalBeds(b.val)}
                        className={`rounded-full px-2.5 py-1 text-2xs font-bold transition ${
                          localBeds === b.val ? 'bg-burnt-orange text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="h-[1px] bg-stone-100 my-3" />
                <div>
                  <p className="font-bold text-stone-500 mb-2">Bathrooms (Min)</p>
                  <div className="flex gap-1">
                    {[
                      { val: 'any', label: 'Any' },
                      { val: '1', label: '1+' },
                      { val: '1.5', label: '1.5+' },
                      { val: '2', label: '2+' },
                      { val: '3', label: '3+' },
                    ].map((ba) => (
                      <button
                        key={ba.val}
                        onClick={() => setLocalBaths(ba.val)}
                        className={`flex-1 rounded-full py-1 text-2xs font-bold transition text-center ${
                          localBaths === ba.val ? 'bg-burnt-orange text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        {ba.label}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={applyRoomsFilter}
                  className="w-full mt-4 rounded-xl bg-burnt-orange py-2 text-2xs font-bold text-white hover:bg-burnt-orange-hover transition"
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* Distance Pill */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'distance' ? null : 'distance')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full border transition font-semibold ${
                activeMaxDistance !== 'any'
                  ? 'bg-burnt-orange-light border-burnt-orange text-burnt-orange'
                  : 'bg-white border-stone-300 hover:bg-stone-50'
              }`}
            >
              <span>{activeMaxDistance === 'any' ? 'Distance' : `Within ${activeMaxDistance} miles`}</span>
              <svg className="h-3 w-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === 'distance' && (
              <div className="absolute left-0 mt-1.5 z-40 w-52 rounded-2xl border border-stone-200 bg-white p-3 shadow-xl">
                <div className="flex flex-col gap-1">
                  {[
                    { val: 'any', label: 'Any Distance' },
                    { val: '0.3', label: 'Within 0.3 miles' },
                    { val: '0.5', label: 'Within 0.5 miles' },
                    { val: '0.8', label: 'Within 0.8 miles' },
                  ].map((d) => (
                    <button
                      key={d.val}
                      onClick={() => updateUrlParam('maxDistance', d.val)}
                      className={`w-full text-left rounded-lg px-2.5 py-1.5 text-xs font-bold transition ${
                        activeMaxDistance === d.val ? 'bg-burnt-orange-light text-burnt-orange' : 'hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Move In Pill */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'moveIn' ? null : 'moveIn')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full border transition font-semibold ${
                activeMoveIn !== 'any'
                  ? 'bg-burnt-orange-light border-burnt-orange text-burnt-orange'
                  : 'bg-white border-stone-300 hover:bg-stone-50'
              }`}
            >
              <span>{activeMoveIn === 'any' ? 'Move-in' : activeMoveIn === 'immediate' ? 'Immediate' : 'Aug 2025'}</span>
              <svg className="h-3 w-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === 'moveIn' && (
              <div className="absolute left-0 mt-1.5 z-40 w-52 rounded-2xl border border-stone-200 bg-white p-3 shadow-xl">
                <div className="flex flex-col gap-1">
                  {[
                    { val: 'any', label: 'Any Date' },
                    { val: 'august', label: 'August 2025' },
                    { val: 'immediate', label: 'Immediate Move-in' },
                  ].map((m) => (
                    <button
                      key={m.val}
                      onClick={() => updateUrlParam('moveIn', m.val)}
                      className={`w-full text-left rounded-lg px-2.5 py-1.5 text-xs font-bold transition ${
                        activeMoveIn === m.val ? 'bg-burnt-orange-light text-burnt-orange' : 'hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Clear Filters helper */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-burnt-orange font-bold text-xs hover:underline flex items-center gap-1 ml-2 transition"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* 2. Split Screen content section */}
      <div className="flex-1 flex relative">
        
        {/* Left Side: Apartment list */}
        <div
          className={`w-full lg:w-[58%] px-4 sm:px-6 lg:pl-8 lg:pr-4 py-6 overflow-y-auto h-[calc(100vh-184px)] custom-scrollbar ${
            showMobileMap ? 'hidden lg:block' : 'block'
          }`}
        >
          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">
              {error}
            </div>
          )}
          
          {loading && (
            <div className="py-12">
              <LoadingPlaceholder />
            </div>
          )}

          {showFallbackWarning && (
            <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-xs font-semibold text-amber-900 shadow-sm flex items-start gap-2.5 animate-fade-in">
              <span className="text-sm">⚠️</span>
              <div>
                <p className="font-bold">No apartments match your filters</p>
                <p className="mt-0.5 text-amber-850 font-medium">
                  We couldn&apos;t find any properties matching your exact criteria. Showing all UT Austin apartments instead. Try loosening your filter choices.
                </p>
              </div>
            </div>
          )}

          {showEmpty && (
            <div className="rounded-3xl border border-dashed border-stone-300 bg-white p-12 text-center max-w-md mx-auto mt-8 shadow-sm">
              <span className="text-4xl">🔍</span>
              <p className="font-extrabold text-stone-850 text-lg mt-4">No apartments match your filters</p>
              <p className="mt-2 text-sm text-stone-550 leading-relaxed font-medium">
                Try loosening your price ceiling or selecting &quot;Any Bed/Bath&quot; criteria. Note: we only support UT Austin listings at this time.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-6 rounded-full bg-burnt-orange hover:bg-burnt-orange-hover text-white px-5 py-2.5 text-xs font-bold shadow-sm transition"
              >
                Clear all filters
              </button>
            </div>
          )}

          {!loading && !error && displayApartments.length > 0 && (
            <>
              <p className="mb-4 text-xs font-bold text-stone-500 uppercase tracking-wider">
                {displayApartments.length} result{displayApartments.length !== 1 ? 's' : ''} near {campusQuery}
              </p>
              <ApartmentList
                apartments={displayApartments}
                hoveredId={hoveredAptId}
                onHover={setHoveredAptId}
              />
            </>
          )}
        </div>

        {/* Right Side: Leaflet Map Container */}
        <div
          className={`absolute inset-0 lg:static lg:flex-1 h-[calc(100vh-184px)] relative ${
            showMobileMap ? 'block' : 'hidden lg:block'
          }`}
        >
          <div id="map" className="w-full h-full z-10"></div>

          {/* Map pin preview tooltip overlay card */}
          {selectedPin && (
            <div
              className="absolute bottom-6 left-6 right-6 lg:left-6 lg:right-auto lg:w-64 z-[1000] rounded-2xl border border-stone-200 bg-white p-3 shadow-xl flex flex-col gap-2 pointer-events-auto"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-stone-900 text-xs truncate max-w-[80%]">
                  {selectedPin.name}
                </h4>
                <button
                  onClick={() => setSelectedPin(null)}
                  className="text-stone-400 hover:text-stone-700 font-bold text-sm leading-none cursor-pointer"
                >
                  ×
                </button>
              </div>
              {selectedPin.imageUrl && (
                <img
                  src={selectedPin.imageUrl}
                  alt={selectedPin.name}
                  className="h-20 w-full object-cover rounded-lg bg-stone-100"
                />
              )}
              <div className="flex items-center justify-between text-2xs mt-1">
                <span className="font-bold text-burnt-orange">{selectedPin.cost && selectedPin.cost !== 'N/A' ? selectedPin.cost : 'N/A'}</span>
                <span className="text-stone-500 font-medium">{selectedPin.distanceFromTower?.split('(')[0].trim() || 'N/A'}</span>
              </div>
              <div className="flex gap-1.5 mt-1">
                <Link
                  to={`/apartments/${encodeURIComponent(selectedPin.id)}`}
                  className="flex-1 text-center rounded-lg bg-burnt-orange py-1.5 text-3xs font-bold text-white hover:bg-burnt-orange-hover transition"
                >
                  View Details
                </Link>
                {selectedPin.url && (
                  <a
                    href={selectedPin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-stone-200 px-2.5 py-1.5 hover:bg-stone-50 text-stone-500 flex items-center justify-center text-3xs font-semibold"
                    title="Visit Site"
                  >
                    🔗 Website
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* 3. Floating Mobile Map/List Toggle Button */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
        <button
          onClick={() => {
            setShowMobileMap(!showMobileMap)
            setSelectedPin(null)
          }}
          className="rounded-full bg-stone-900/90 text-white px-5 py-3 text-sm font-bold shadow-lg border border-stone-800 backdrop-blur-sm flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          {showMobileMap ? (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Show List
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Show Map
            </>
          )}
        </button>
      </div>

    </div>
  )
}

