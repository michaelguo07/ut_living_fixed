import { Link, useParams } from 'react-router-dom'
import { getApartmentById } from '../data/apartments'
import { getFloorPlansForProperty } from '../data/floorPlans'
import { useFavorites } from '../context/FavoritesContext'

function Field({ label, value, placeholder = '—' }) {
  const display = value && String(value).trim() ? value : placeholder
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
        {label}
      </p>
      <p className="mt-1 text-stone-800">{display}</p>
    </div>
  )
}

export default function ApartmentDetailPage() {
  const { apartmentId } = useParams()
  const apartment = getApartmentById(apartmentId)
  const floorPlans = apartment ? getFloorPlansForProperty(apartment.name) : []
  const { isFavorite, toggleFavorite } = useFavorites()

  if (!apartment) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold text-stone-900">Apartment not found</h1>
        <p className="mt-2 text-stone-600">
          That apartment doesn’t exist in the current list.
        </p>
        <div className="mt-8">
          <Link to="/search" className="text-sm font-medium text-[#BF5700] hover:underline">
            ← Back to apartments
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-stone-500">UT Austin • West Campus</p>
          <h1 className="mt-1 text-3xl font-bold text-stone-900">{apartment.name}</h1>
        </div>
        <Link to="/search" className="text-sm font-medium text-[#BF5700] hover:underline">
          ← Back to apartments
        </Link>
      </div>

      <p className="mt-4 text-stone-600">
        This is a placeholder detail page. You can fill in the fields below later (or hydrate them from your AI agent).
      </p>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <Field label="Availability" value={apartment.availability} placeholder="(you’ll add this later)" />
        <Field label="Cost" value={apartment.cost} placeholder="(from your spreadsheet/agent)" />
        <Field label="Distance from the Tower" value={apartment.distanceFromTower} placeholder="(you’ll add this later)" />
        <Field label="Address" value={apartment.address} placeholder="(you’ll add this later)" />
      </section>

      <section className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label="Total floor plans" value={apartment.totalPlans ?? ''} placeholder="(from your spreadsheet/agent)" />
        <Field label="Available plans" value={apartment.availablePlans ?? ''} placeholder="(from your spreadsheet/agent)" />
      </section>

      <section className="mt-4">
        <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Property website</p>
          {apartment.url ? (
            <a
              href={apartment.url}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block break-all text-sm font-medium text-[#BF5700] hover:underline"
            >
              {apartment.url}
            </a>
          ) : (
            <p className="mt-1 text-sm text-stone-600">(you’ll add this later)</p>
          )}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-stone-900">Available floor plans</h2>
        {floorPlans.length === 0 ? (
          <p className="mt-2 text-sm text-stone-600">
            (Floor plan details will appear here once they are available for this property.)
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-stone-50 text-xs font-semibold uppercase tracking-wide text-stone-500">
                <tr>
                  <th className="px-4 py-3">Plan</th>
                  <th className="px-4 py-3">Room type</th>
                  <th className="px-4 py-3">Beds</th>
                  <th className="px-4 py-3">Baths</th>
                  <th className="px-4 py-3">Sq Ft</th>
                  <th className="px-4 py-3">Min price</th>
                  <th className="px-4 py-3">Max price</th>
                  <th className="px-4 py-3">Availability</th>
                  <th className="px-4 py-3 text-right">Favorite</th>
                </tr>
              </thead>
              <tbody>
                {floorPlans.map((plan) => {
                  const favorite = isFavorite(plan.id)
                  return (
                    <tr key={plan.id} className="border-t border-stone-100">
                      <td className="px-4 py-3 text-stone-800">
                        <Link
                          to={`/floorplans/${encodeURIComponent(plan.id)}`}
                          className="text-[#BF5700] hover:underline"
                        >
                          {plan.plan}
                        </Link>
                      </td>
                    <td className="px-4 py-3 text-stone-700">{plan.roomType}</td>
                    <td className="px-4 py-3 text-stone-700">{plan.beds}</td>
                    <td className="px-4 py-3 text-stone-700">{plan.baths}</td>
                    <td className="px-4 py-3 text-stone-700">{plan.sqFt}</td>
                    <td className="px-4 py-3 text-stone-700">
                      {typeof plan.minPrice === 'number' && Number.isFinite(plan.minPrice)
                        ? `$${plan.minPrice.toLocaleString()}/mo`
                        : '—'}
                    </td>
                    <td className="px-4 py-3 text-stone-700">
                      {typeof plan.maxPrice === 'number' && Number.isFinite(plan.maxPrice)
                        ? `$${plan.maxPrice.toLocaleString()}/mo`
                        : '—'}
                    </td>
                      <td className="px-4 py-3 text-stone-700">{plan.availability || '—'}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => toggleFavorite(plan.id)}
                          className="inline-flex items-center gap-1 rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-medium text-stone-700 shadow-sm hover:border-[#BF5700] hover:text-[#BF5700]"
                        >
                          <span>{favorite ? '★' : '☆'}</span>
                          <span className="hidden sm:inline">
                            {favorite ? 'Saved' : 'Save'}
                          </span>
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Pros</p>
          {apartment.pros?.length ? (
            <ul className="mt-2 list-inside list-disc text-sm text-stone-700">
              {apartment.pros.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-stone-600">(you’ll add this later)</p>
          )}
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-600">Cons</p>
          {apartment.cons?.length ? (
            <ul className="mt-2 list-inside list-disc text-sm text-stone-700">
              {apartment.cons.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-stone-600">(you’ll add this later)</p>
          )}
        </div>
      </section>
    </div>
  )
}

