import { useEffect } from 'react'
import ApartmentList from '../components/apartments/ApartmentList'
import LoadingPlaceholder from '../components/ui/LoadingPlaceholder'
import { useAIAgent } from '../hooks/useAIAgent'

const CAMPUS_NAME = 'UT Austin'

export default function SearchResultsPage() {
  const { apartments, loading, error, search } = useAIAgent()

  useEffect(() => {
    search(CAMPUS_NAME)
  }, [search])

  const showEmpty = !loading && !error && apartments.length === 0

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">
        Apartments near UT Austin
      </h1>
      <p className="mt-1 text-stone-600">
        Off-campus housing near the Forty Acres.
      </p>

      <div className="mt-10">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {error}
          </div>
        )}
        {loading && <LoadingPlaceholder />}
        {showEmpty && (
          <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50 py-12 text-center">
            <p className="font-medium text-stone-700">No apartments found yet.</p>
            <p className="mt-1 text-sm text-stone-500">
              Connect your AI agent in <code className="rounded bg-stone-200 px-1">src/hooks/useAIAgent.js</code> to see real results here.
            </p>
          </div>
        )}
        {!loading && !error && apartments.length > 0 && (
          <>
            <p className="mb-4 text-sm text-stone-600">
              {apartments.length} result{apartments.length !== 1 ? 's' : ''} near UT Austin
            </p>
            <ApartmentList apartments={apartments} />
          </>
        )}
      </div>
    </div>
  )
}
