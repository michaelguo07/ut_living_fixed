import { Link, useParams } from 'react-router-dom'
import { getFloorPlanById } from '../data/floorPlans'
import { useFavorites } from '../context/FavoritesContext'

export default function FloorPlanDetailPage() {
  const { floorPlanId } = useParams()
  const plan = getFloorPlanById(floorPlanId)
  const { isFavorite, toggleFavorite } = useFavorites()

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
            <p className="text-xs text-stone-500">
              Place your image at <code className="rounded bg-stone-200 px-1">public/floorplans/{plan.id}.jpg</code>
            </p>
          </div>
          <div className="flex items-center justify-center rounded-lg border border-dashed border-stone-300 bg-white px-4 py-10">
            <img
              src={imageSrc}
              alt={`${plan.plan} floor plan`}
              className="max-h-96 w-full max-w-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
            <p className="text-sm text-stone-500">
              Floor plan preview will appear here once you add the image file.
            </p>
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
    </div>
  )
}

