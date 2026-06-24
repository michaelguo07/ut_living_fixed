import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ApartmentList from '../components/apartments/ApartmentList'
import LoadingPlaceholder from '../components/ui/LoadingPlaceholder'
import CampusSearch from '../components/search/CampusSearch'
import { useAIAgent } from '../hooks/useAIAgent'

export default function SearchResultsPage() {
  const { apartments, loading, error, search } = useAIAgent()
  const [searchParams] = useSearchParams()
  
  const campusQuery = searchParams.get('campus') || 'UT Austin'

  useEffect(() => {
    search(campusQuery)
  }, [search, campusQuery])

  const showEmpty = !loading && !error && apartments.length === 0

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-stone-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            Apartments near {campusQuery}
          </h1>
          <p className="mt-1 text-sm text-stone-600">
            Off-campus student housing options.
          </p>
        </div>
        <div className="w-full sm:max-w-xs">
          <CampusSearch defaultValue={campusQuery} compact={true} />
        </div>
      </div>

      <div className="mt-10">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {error}
          </div>
        )}
        {loading && <LoadingPlaceholder />}
        {showEmpty && (
          <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50 py-12 text-center">
            <p className="font-medium text-stone-700">No apartments found for &quot;{campusQuery}&quot;.</p>
            <p className="mt-1 text-sm text-stone-500">
              Only UT Austin apartments are supported in our current local database. Try searching for &quot;UT Austin&quot;.
            </p>
          </div>
        )}
        {!loading && !error && apartments.length > 0 && (
          <>
            <p className="mb-4 text-sm text-stone-600">
              {apartments.length} result{apartments.length !== 1 ? 's' : ''} near {campusQuery}
            </p>
            <ApartmentList apartments={apartments} />
          </>
        )}
      </div>
    </div>
  )
}
