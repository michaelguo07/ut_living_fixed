import { useState, useCallback } from 'react'
import { UT_AUSTIN_APARTMENTS } from '../data/apartments'
import { getFloorPlansForProperty } from '../data/floorPlans'

/**
 * Data shape for apartment results (align with your AI agent later).
 * @typedef {Object} Apartment
 * @property {string} id
 * @property {string} name
 * @property {string} address
 * @property {string} cost - e.g. "$1,200/mo"
 * @property {string} distanceFromCampus - e.g. "0.5 mi"
 * @property {string} availability - e.g. "Available Aug 2025"
 * @property {string} url
 * @property {number|null} totalPlans
 * @property {number|null} availablePlans
 * @property {number|null} lowestPrice
 * @property {string[]} pros
 * @property {string[]} cons
 * @property {string} imageUrl
 */

/**
 * Functional client-side filtering logic mimicking Google Flights data refinement.
 * @param {Object} params
 * @param {string} [params.campusName]
 * @param {Object} [params.filters]
 * @returns {Promise<Apartment[]>}
 */
export async function fetchApartmentsFromAgent({ campusName, filters = {} }) {
  // Simulate network request delay
  await new Promise((r) => setTimeout(r, 500))

  const query = (campusName || '').toLowerCase()
  // Only UT Austin apartments are supported in our current local database
  if (query && !query.includes('ut') && !query.includes('austin') && !query.includes('texas') && !query.includes('campus')) {
    return []
  }

  let results = [...UT_AUSTIN_APARTMENTS]

  // 1. Filter by Max Price
  if (filters.maxPrice) {
    const maxVal = parseFloat(filters.maxPrice)
    if (!isNaN(maxVal)) {
      results = results.filter((apt) => {
        // Check lowestPrice property
        if (apt.lowestPrice && apt.lowestPrice <= maxVal) return true
        
        // Otherwise inspect all individual floor plans
        const plans = getFloorPlansForProperty(apt.name)
        if (plans.length === 0) return false
        return plans.some((p) => p.minPrice && p.minPrice <= maxVal)
      })
    }
  }

  // 2. Filter by Beds (can be single string/number or array of strings)
  if (filters.beds && (Array.isArray(filters.beds) ? filters.beds.length > 0 : true)) {
    const rawBeds = Array.isArray(filters.beds) ? filters.beds : [filters.beds]
    const bedFilters = rawBeds.map(String)

    results = results.filter((apt) => {
      const plans = getFloorPlansForProperty(apt.name)
      if (plans.length === 0) return false
      return plans.some((p) => {
        const pBeds = String(p.beds)
        if (bedFilters.includes(pBeds)) return true
        if (bedFilters.includes('0') && p.beds === 0) return true
        if (bedFilters.includes('studio') && p.beds === 0) return true
        if (bedFilters.includes('4+') && p.beds >= 4) return true
        return false
      })
    })
  }

  // 3. Filter by Baths
  if (filters.baths) {
    const minBaths = parseFloat(filters.baths)
    if (!isNaN(minBaths)) {
      results = results.filter((apt) => {
        const plans = getFloorPlansForProperty(apt.name)
        if (plans.length === 0) return false
        return plans.some((p) => p.baths >= minBaths)
      })
    }
  }

  // 4. Filter by Max Distance
  if (filters.maxDistance) {
    const maxDist = parseFloat(filters.maxDistance)
    if (!isNaN(maxDist)) {
      results = results.filter((apt) => {
        const distStr = apt.distanceFromTower || ''
        const match = distStr.match(/([0-9.]+)\s*mile/)
        if (match) {
          const dist = parseFloat(match[1])
          return dist <= maxDist
        }
        return true // don't filter out if distance cannot be parsed
      })
    }
  }

  // 5. Filter by Move-in availability
  if (filters.moveIn && filters.moveIn !== 'any') {
    const term = String(filters.moveIn).toLowerCase()
    results = results.filter((apt) => {
      const availStr = (apt.availability || '').toLowerCase()
      if (availStr.includes(term) && !availStr.includes('0 plans')) return true

      const plans = getFloorPlansForProperty(apt.name)
      if (plans.length === 0) return false
      return plans.some((p) => {
        const pAvail = (p.availability || '').toLowerCase()
        const isAvailable = !pAvail.includes('sold out') && !pAvail.includes('waitlist')
        return isAvailable && (pAvail.includes(term) || term === 'immediate' || term === 'august' || term === 'aug')
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
