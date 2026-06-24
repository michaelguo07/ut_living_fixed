import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getFloorPlanById } from '../data/floorPlans'
import { useFavorites } from '../context/FavoritesContext'

export default function FloorPlanDetailPage() {
  const { floorPlanId } = useParams()
  const plan = getFloorPlanById(floorPlanId)
  const { isFavorite, toggleFavorite } = useFavorites()
  const [imgError, setImgError] = useState(false)

  if (!plan) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold text-stone-900">Floor plan not found</h1>
        <p className="mt-2 text-stone-600">
          That floor plan doesn&apos;t exist in the current data.
        </p>
        <div className="mt-8 flex gap-4">
          <Link to="/search" className="text-sm font-medium text-[#BF5700] hover:underline">
            ← Back to apartments
          </Link>
        </div>
      </div>
    )
  }

  const favorite = isFavorite(plan.id)
  const imageSrc = plan.imagePath || `/floorplans/${encodeURIComponent(plan.id)}.jpg`

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-stone-500">{plan.property}</p>
          <h1 className="mt-1 text-3xl font-bold text-stone-900">{plan.plan}</h1>
          <p className="mt-1 text-sm text-stone-600">{plan.roomType}</p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => toggleFavorite(plan.id)}
            className="inline-flex items-center gap-1 rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-medium text-stone-700 shadow-sm hover:border-[#BF5700] hover:text-[#BF5700]"
          >
            <span>{favorite ? '★' : '☆'}</span>
            <span>{favorite ? 'Saved' : 'Save'}</span>
          </button>
          <Link to="/compare" className="text-xs font-medium text-[#BF5700] hover:underline">
            Compare
          </Link>
        </div>
      </div>

      <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-stone-900">Floor plan image</h2>
            {!plan.imagePath && (
              <p className="text-xs text-stone-500">
                Fallback: <code className="rounded bg-stone-200 px-1">public/floorplans/{plan.id}.jpg</code>
              </p>
            )}
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-stone-300 bg-white p-6 min-h-[300px]">
            {!imgError ? (
              <img
                src={imageSrc}
                alt={`${plan.plan} floor plan`}
                className="max-h-[400px] w-full max-w-full object-contain rounded-md transition-opacity duration-300 ease-in-out"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="text-center py-8">
                <svg
                  className="mx-auto h-16 w-16 text-stone-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <p className="mt-4 text-sm font-medium text-stone-700">Preview not available</p>
                <p className="mt-1 text-xs text-stone-500 max-w-xs mx-auto">
                  A floor plan image preview is not provided by the property for this plan. You can view details on the website.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Details</p>
            <dl className="mt-2 space-y-1 text-sm text-stone-700">
              <div className="flex justify-between gap-4">
                <dt>Beds</dt>
                <dd>{plan.beds || '—'}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Baths</dt>
                <dd>{plan.baths || '—'}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Sq Ft</dt>
                <dd>{plan.sqFt || '—'}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Min price</dt>
                <dd>
                  {typeof plan.minPrice === 'number' && Number.isFinite(plan.minPrice)
                    ? `$${plan.minPrice.toLocaleString()}/mo`
                    : '—'}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Max price</dt>
                <dd>
                  {typeof plan.maxPrice === 'number' && Number.isFinite(plan.maxPrice)
                    ? `$${plan.maxPrice.toLocaleString()}/mo`
                    : '—'}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Availability</dt>
                <dd>{plan.availability || '—'}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
              Property website
            </p>
            {plan.url ? (
              <a
                href={plan.url}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-block break-all text-xs font-medium text-[#BF5700] hover:underline"
              >
                {plan.url}
              </a>
            ) : (
              <p className="mt-1 text-sm text-stone-600">(you’ll add this later)</p>
            )}
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Pros</p>
          {plan.pros?.length ? (
            <ul className="mt-2 list-inside list-disc text-sm text-stone-700">
              {plan.pros.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-stone-500">No specific pros listed</p>
          )}
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-600">Cons</p>
          {plan.cons?.length ? (
            <ul className="mt-2 list-inside list-disc text-sm text-stone-700">
              {plan.cons.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-stone-500">No specific cons listed</p>
          )}
        </div>
      </section>
    </div>
  )
}

