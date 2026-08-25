import { useEffect, useState, useRef } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import L from 'leaflet'
import ApartmentList from '../components/apartments/ApartmentList'
import LoadingPlaceholder from '../components/ui/LoadingPlaceholder'
import { useAIAgent } from '../hooks/useAIAgent'
import { LAST_UPDATED, NEIGHBORHOODS } from '../data/apartments'

// Latitude and Longitude coordinates for Austin student housing properties
const APARTMENT_COORDINATES = {
  // ON CAMPUS
  '2400-nueces-apartments': { lat: 30.2882, lng: -97.7448 },
  'brackenridge-apartments-lake-austin-blvd': { lat: 30.2835, lng: -97.7780 },
  'colorado-apartments-lake-austin-blvd': { lat: 30.2825, lng: -97.7725 },
  'east-campus-graduate-apartments': { lat: 30.2830, lng: -97.7265 },
  'gateway-apartments-west-6th-st': { lat: 30.2745, lng: -97.7690 },

  // WEST CAMPUS
  '21-rio-apartments': { lat: 30.2845, lng: -97.7445 },
  'axis-west-campus': { lat: 30.2905, lng: -97.7490 },
  'crest-at-pearl': { lat: 30.2952, lng: -97.7440 },
  'envoy-austin': { lat: 30.2852, lng: -97.7483 },
  'evo-austin-formerly-ion-austin': { lat: 30.2955, lng: -97.7420 },
  'grandmarc-austin': { lat: 30.2905, lng: -97.7428 },
  'inspire-on-22nd': { lat: 30.2858, lng: -97.7432 },
  'legacy-on-rio': { lat: 30.2915, lng: -97.7450 },
  'mark-uptown': { lat: 30.2872, lng: -97.7456 },
  'moontower-just-off-campus': { lat: 30.2858, lng: -97.7432 },
  'nine-just-off-campus': { lat: 30.2905, lng: -97.7475 },
  'quarters-on-campus-the-quarters': { lat: 30.2870, lng: -97.7445 },
  'rise-on-23rd': { lat: 30.2865, lng: -97.7440 },
  'skyloft-austin': { lat: 30.2875, lng: -97.7442 },
  'texan-and-21st-apartments': { lat: 30.2965, lng: -97.7420 },
  'the-block-on-23rd-25th-etc': { lat: 30.2930, lng: -97.7450 },
  'the-castilian': { lat: 30.2875, lng: -97.7432 },
  'the-g-on-west-campus': { lat: 30.2798, lng: -97.7425 },
  'the-harrison': { lat: 30.2845, lng: -97.7445 },
  'the-hub-austin-west-campus': { lat: 30.2912, lng: -97.7450 },
  'the-ruckus': { lat: 30.2885, lng: -97.7445 },
  'the-standard-at-austin': { lat: 30.2870, lng: -97.7445 },
  'unleashed-west-campus': { lat: 30.2890, lng: -97.7465 },
  'villas-on-rio': { lat: 30.2900, lng: -97.7450 },
  'waterloo-austin': { lat: 30.2885, lng: -97.7425 },
  'west-campus-flats': { lat: 30.2850, lng: -97.7485 },
  'yugo-austin-corner': { lat: 30.2905, lng: -97.7485 },
  'yugo-austin-space': { lat: 30.2900, lng: -97.7445 },

  // NORTH CAMPUS / HYDE PARK
  '44th-street-apartments': { lat: 30.3060, lng: -97.7335 },
  '45th-street-apartments': { lat: 30.3075, lng: -97.7335 },
  'hyde-park-court': { lat: 30.3015, lng: -97.7345 },
  'hyde-park-square': { lat: 30.3030, lng: -97.7300 },
  'lofts-at-the-triangle': { lat: 30.3145, lng: -97.7330 },
  'melroy-apartments': { lat: 30.2975, lng: -97.7305 },
  'river-oaks-apartments': { lat: 30.2950, lng: -97.7310 },
  'red-river-apartments': { lat: 30.2965, lng: -97.7255 },
  'the-triangle-apartments': { lat: 30.3140, lng: -97.7335 },

  // RIVERSIDE / OFF CAMPUS
  'ballpark-north': { lat: 30.2355, lng: -97.7215 },
  'estate-on-campus-riverside': { lat: 30.2320, lng: -97.7180 },
  'mesh-apartments': { lat: 30.2380, lng: -97.7240 },
  'town-lake-student-apartments': { lat: 30.2455, lng: -97.7285 },
  'university-estates-at-austin': { lat: 30.2320, lng: -97.7180 },
  'university-village-austin': { lat: 30.2315, lng: -97.7185 },
}

export default function SearchResultsPage() {
  const { apartments, loading, error, search } = useAIAgent()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  // Read active search query and filters from URL
  const rawQuery = searchParams.get('q') || searchParams.get('campus') || ''
  const [searchTerm, setSearchTerm] = useState(rawQuery)

  const activeNeighborhood = searchParams.get('neighborhood') || 'All Neighborhoods'
  const activeBeds = searchParams.get('beds') || 'any'
  const activeBaths = searchParams.get('baths') || 'any'
  const activeMaxPrice = searchParams.get('maxPrice') || 'any'
  const activeMoveIn = searchParams.get('moveIn') || 'any'
  const activeMaxDistance = searchParams.get('maxDistance') || 'any'

  const hasActiveFilters = Boolean(rawQuery) || activeNeighborhood !== 'All Neighborhoods' || activeBeds !== 'any' || activeBaths !== 'any' || activeMaxPrice !== 'any' || activeMoveIn !== 'any' || activeMaxDistance !== 'any'
  const displayApartments = apartments

  // Local UI states
  const [hoveredAptId, setHoveredAptId] = useState(null)
  const [selectedPin, setSelectedPin] = useState(null)
  const [activeDropdown, setActiveDropdown] = useState(null) // 'neighborhood' | 'price' | 'rooms' | 'distance' | 'moveIn'
  const [showMobileMap, setShowMobileMap] = useState(false)

  // Local filter states for beds/baths popover
  const [localBeds, setLocalBeds] = useState(activeBeds)
  const [localBaths, setLocalBaths] = useState(activeBaths)

  const dropdownRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef({})

  // Sync searchTerm when URL changes
  useEffect(() => {
    setSearchTerm(rawQuery)
  }, [rawQuery])

  // Trigger search based on query and filter params
  useEffect(() => {
    const filters = {
      neighborhood: activeNeighborhood,
      beds: activeBeds,
      baths: activeBaths,
      maxPrice: activeMaxPrice,
      moveIn: activeMoveIn,
      maxDistance: activeMaxDistance,
    }
    search(rawQuery, filters)
  }, [search, rawQuery, activeNeighborhood, activeBeds, activeBaths, activeMaxPrice, activeMoveIn, activeMaxDistance])

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
      const initialLat = 30.288
      const initialLng = -97.742
      const initialZoom = 14

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
    if (value === 'any' || value === 'All Neighborhoods' || !value) {
      nextParams.delete(key)
    } else {
      nextParams.set(key, value)
    }
    navigate(`/search?${nextParams.toString()}`)
    setActiveDropdown(null)
  }

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault()
    updateUrlParam('q', searchTerm.trim())
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
    setSearchTerm('')
    navigate('/search')
    setActiveDropdown(null)
  }

  const showEmpty = !loading && !error && displayApartments.length === 0

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-stone-50 animate-fade-in">
      
      {/* 1. Header & Filters row */}
      <div className="bg-white border-b border-stone-200 px-4 py-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-500">
              <span className="text-burnt-orange font-bold uppercase tracking-wider">UT Austin Housing Portal</span>
              <span>•</span>
              <span>Austin, TX</span>
            </div>
            <h1 className="text-2xl font-extrabold text-stone-900 sm:text-3xl mt-0.5 tracking-tight">
              Find Apartments
            </h1>
          </div>

          {/* Search Bar Input */}
          <form onSubmit={handleSearchSubmit} className="w-full sm:max-w-md relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search apartments, neighborhoods, or layouts (e.g. 2400 Nueces, Hyde Park, Studio)..."
              className="w-full pl-9 pr-20 py-2.5 text-xs font-medium rounded-full border border-stone-300 bg-stone-50 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-burnt-orange focus:bg-white transition"
            />
            <svg className="absolute left-3 top-3 h-4 w-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <div className="absolute right-1.5 top-1.5 flex items-center gap-1">
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('')
                    updateUrlParam('q', '')
                  }}
                  className="text-stone-400 hover:text-stone-600 p-1 text-xs font-bold transition"
                  title="Clear search text"
                >
                  ✕
                </button>
              )}
              <button
                type="submit"
                className="rounded-full bg-burnt-orange hover:bg-burnt-orange-hover px-3 py-1 text-2xs font-bold text-white transition"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Horizontal filter pills row */}
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2 mt-4 text-xs font-medium text-stone-700 select-none" ref={dropdownRef}>
          
          {/* Neighborhood Pill */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'neighborhood' ? null : 'neighborhood')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full border transition font-semibold ${
                activeNeighborhood !== 'All Neighborhoods'
                  ? 'bg-burnt-orange-light border-burnt-orange text-burnt-orange'
                  : 'bg-white border-stone-300 hover:bg-stone-50'
              }`}
            >
              <span>{activeNeighborhood === 'All Neighborhoods' ? 'Neighborhood' : activeNeighborhood}</span>
              <svg className="h-3 w-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === 'neighborhood' && (
              <div className="absolute left-0 mt-1.5 z-40 w-60 rounded-2xl border border-stone-200 bg-white p-3 shadow-xl">
                <div className="flex flex-col gap-1">
                  {NEIGHBORHOODS.map((n) => (
                    <button
                      key={n}
                      onClick={() => updateUrlParam('neighborhood', n)}
                      className={`w-full text-left rounded-lg px-2.5 py-1.5 text-xs font-bold transition ${
                        activeNeighborhood === n ? 'bg-burnt-orange-light text-burnt-orange' : 'hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

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
                    { val: '800', label: 'Under $800/mo' },
                    { val: '1000', label: 'Under $1,000/mo' },
                    { val: '1200', label: 'Under $1,200/mo' },
                    { val: '1400', label: 'Under $1,400/mo' },
                    { val: '1600', label: 'Under $1,600/mo' },
                    { val: '1800', label: 'Under $1,800/mo' },
                    { val: '2000', label: 'Under $2,000/mo' },
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
                    { val: '0.5', label: 'Within 0.5 miles (~10 min walk)' },
                    { val: '1.0', label: 'Within 1.0 miles' },
                    { val: '2.0', label: 'Within 2.0 miles' },
                    { val: '5.0', label: 'Within 5.0 miles (includes Riverside)' },
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
              <span>{activeMoveIn === 'any' ? 'Move-in' : activeMoveIn === 'available' ? 'Available Only' : 'Fall 2026'}</span>
              <svg className="h-3 w-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === 'moveIn' && (
              <div className="absolute left-0 mt-1.5 z-40 w-56 rounded-2xl border border-stone-200 bg-white p-3 shadow-xl">
                <div className="flex flex-col gap-1">
                  {[
                    { val: 'any', label: 'Any Date' },
                    { val: 'available', label: 'Available Only (exclude waitlist)' },
                    { val: 'august', label: 'Fall 2026 Term' },
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

          {showEmpty && (
            <div className="rounded-3xl border border-dashed border-stone-300 bg-white p-12 text-center max-w-md mx-auto mt-8 shadow-sm">
              <span className="text-4xl">🔍</span>
              <p className="font-extrabold text-stone-850 text-lg mt-4">No apartments match your filters</p>
              <p className="mt-2 text-sm text-stone-550 leading-relaxed font-medium">
                Try loosening your price ceiling or selecting &quot;All Neighborhoods&quot;.
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
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  {displayApartments.length} result{displayApartments.length !== 1 ? 's' : ''} {activeNeighborhood !== 'All Neighborhoods' ? `in ${activeNeighborhood}` : rawQuery ? `for "${rawQuery}"` : 'near UT Austin'}
                </p>
                {LAST_UPDATED && (
                  <span className="text-3xs font-medium text-stone-400">
                    Updated: <span className="font-semibold text-stone-600">{LAST_UPDATED}</span>
                  </span>
                )}
              </div>
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
                <div>
                  <span className="text-3xs font-bold text-stone-400 uppercase tracking-wider block">{selectedPin.neighborhood}</span>
                  <h4 className="font-bold text-stone-900 text-xs truncate max-w-[180px]">
                    {selectedPin.name}
                  </h4>
                </div>
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
