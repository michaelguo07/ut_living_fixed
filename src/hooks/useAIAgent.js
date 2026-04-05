import { useState, useCallback } from 'react'
import { UT_AUSTIN_APARTMENTS } from '../data/apartments'

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
 */

/**
 * Stub for AI agent integration. Replace the implementation with your agent API.
 * Currently fixed to UT Austin only.
 * @param {Object} params
 * @param {string} [params.campusName] - ignored for now; always UT Austin
 * @param {Object} [params.filters] - optional: maxDistance, maxCost, etc.
 * @returns {Promise<Apartment[]>}
 */
export async function fetchApartmentsFromAgent({ campusName, filters = {} }) {
  // TODO: Replace with your AI agent call for UT Austin apartments, e.g.:
  // const response = await fetch('/api/search', { method: 'POST', body: JSON.stringify({ filters }) })
  // return response.json()

  // Placeholder: simulate delay and return empty or mock data
  await new Promise((r) => setTimeout(r, 800))
  return UT_AUSTIN_APARTMENTS
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
