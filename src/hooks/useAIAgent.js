import { useState, useCallback } from 'react'
import { UT_AUSTIN_APARTMENTS } from '../data/apartments.js'
import { getFloorPlansForProperty } from '../data/floorPlans.js'

/**
 * Data shape for apartment results.
 * @typedef {Object} Apartment
 * @property {string} id
 * @property {string} name
 * @property {string} address
 * @property {string} cost - e.g. "$1,200/mo"
 * @property {string} distanceFromTower - e.g. "0.5 miles (10 min walk)"
 * @property {string} availability - e.g. "12 plans available"
 * @property {string} url
 * @property {number|null} totalPlans
 * @property {number|null} availablePlans
 * @property {number|null} lowestPrice
 * @property {string[]} pros
 * @property {string[]} cons
 * @property {string} imageUrl
 */

/**
 * Comprehensive client-side filtering logic for search queries and property/unit filters.
 * @param {Object} params
 * @param {string} [params.campusName]
 * @param {Object} [params.filters]
 * @returns {Promise<Apartment[]>}
 */
export async function fetchApartmentsFromAgent({ campusName = '', filters = {} }) {
  // Simulate minimal UI delay
  await new Promise((r) => setTimeout(r, 120))

  let results = [...UT_AUSTIN_APARTMENTS]
  const rawQuery = (campusName || '').trim().toLowerCase()

  // 1. Text Search Query Filter (Matches apartment name, address, pros, cons, and plan titles)
  if (rawQuery && !['ut', 'ut austin', 'austin', 'texas', 'campus', 'all'].includes(rawQuery)) {
    results = results.filter((apt) => {
      const matchName = apt.name.toLowerCase().includes(rawQuery)
      const matchAddress = apt.address.toLowerCase().includes(rawQuery)
      const matchPros = (apt.pros || []).some((p) => p.toLowerCase().includes(rawQuery))
      const matchCons = (apt.cons || []).some((c) => c.toLowerCase().includes(rawQuery))
      
      const plans = getFloorPlansForProperty(apt.name)
      const matchPlan = plans.some((p) => 
        (p.plan || '').toLowerCase().includes(rawQuery) || 
        (p.roomType || '').toLowerCase().includes(rawQuery)
      )

      return matchName || matchAddress || matchPros || matchCons || matchPlan
    })
  }

  // 2. Max Distance Filter (property level)
  if (filters.maxDistance && filters.maxDistance !== 'any') {
    const maxDist = parseFloat(filters.maxDistance)
    if (!isNaN(maxDist)) {
      results = results.filter((apt) => {
        const distStr = apt.distanceFromTower || ''
        const match = distStr.match(/([0-9.]+)\s*mile/)
        if (match) {
          const dist = parseFloat(match[1])
          return dist <= maxDist
        }
        return true
      })
    }
  }

  // 3. Unit-Level Joint Filtering (Beds, Baths, MaxPrice, MoveIn)
  const isPriceActive = filters.maxPrice && filters.maxPrice !== 'any' && !isNaN(parseFloat(filters.maxPrice))
  const isBedsActive = filters.beds && filters.beds !== 'any' && (Array.isArray(filters.beds) ? filters.beds.length > 0 : true)
  const isBathsActive = filters.baths && filters.baths !== 'any' && !isNaN(parseFloat(filters.baths))
  const isMoveInActive = filters.moveIn && filters.moveIn !== 'any'

  if (isPriceActive || isBedsActive || isBathsActive || isMoveInActive) {
    const maxPriceVal = isPriceActive ? parseFloat(filters.maxPrice) : null
    const minBathsVal = isBathsActive ? parseFloat(filters.baths) : null
    
    // Normalize bed filter into array of string tokens
    let bedFilters = null
    if (isBedsActive) {
      const rawBeds = Array.isArray(filters.beds) ? filters.beds : [filters.beds]
      bedFilters = rawBeds.map(String).filter((b) => b !== 'any')
      if (bedFilters.length === 0) bedFilters = null
    }

    const moveInTerm = isMoveInActive ? String(filters.moveIn).toLowerCase() : null

    results = results.filter((apt) => {
      const plans = getFloorPlansForProperty(apt.name)
      if (plans.length === 0) return false

      // Check if at least ONE floor plan in this apartment satisfies ALL active unit criteria simultaneously
      return plans.some((p) => {
        // Price check
        if (maxPriceVal !== null) {
          if (!p.minPrice || p.minPrice > maxPriceVal) return false
        }

        // Beds check
        if (bedFilters !== null) {
          const matchesBed = bedFilters.some((b) => {
            if (b === '0' || b.toLowerCase() === 'studio') return p.beds === 0
            if (b === '1') return p.beds === 1
            if (b === '2') return p.beds === 2
            if (b === '3') return p.beds === 3
            if (b === '4+' || b === '4') return p.beds !== null && p.beds >= 4
            return String(p.beds) === b
          })
          if (!matchesBed) return false
        }

        // Baths check
        if (minBathsVal !== null) {
          if (p.baths === null || p.baths === undefined || p.baths < minBathsVal) return false
        }

        // Move-in / Availability check
        if (moveInTerm) {
          const pAvail = (p.availability || '').toLowerCase()
          const isAvailable = !pAvail.includes('sold out') && !pAvail.includes('waitlist')
          if (moveInTerm === 'available' || moveInTerm === 'immediate' || moveInTerm === 'august') {
            if (!isAvailable) return false
          }
        }

        return true
      })
    })
  }

  return results
}

/**
 * Hook to run the AI agent search and hold loading/error state.
 */
export function useAIAgent() {
  const [apartments, setApartments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const search = useCallback(async (campusName, filters = {}) => {
    setLoading(true)
    setError(null)
    try {
      const results = await fetchApartmentsFromAgent({ campusName, filters })
      setApartments(results)
      return results
    } catch (err) {
      setError(err.message || 'Search failed')
      setApartments([])
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  return { apartments, loading, error, search }
}
