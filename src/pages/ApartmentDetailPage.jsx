import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getApartmentById } from '../data/apartments'
import { getFloorPlansForProperty } from '../data/floorPlans'
import { useFavorites } from '../context/FavoritesContext'

function Field({ label, value, placeholder = 'N/A' }) {
  const display = value && String(value).trim() && String(value).trim() !== 'N/A' ? value : placeholder
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

  // Sorting state for floor plans list
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

  const requestSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const sortedFloorPlans = [...floorPlans].sort((a, b) => {
    if (!sortConfig.key) return 0

    let valA = a[sortConfig.key]
    let valB = b[sortConfig.key]

    // Handle undefined/null/empty values by putting them at the end
    if (valA === undefined || valA === null || valA === '') return 1
    if (valB === undefined || valB === null || valB === '') return -1

    // If it's availability, normalize text
    if (sortConfig.key === 'availability') {
      valA = String(valA).toLowerCase()
      valB = String(valB).toLowerCase()
    }

    if (valA < valB) {
      return sortConfig.direction === 'asc' ? -1 : 1
    }
    if (valA > valB) {
      return sortConfig.direction === 'asc' ? 1 : -1
    }
    return 0
  })

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return ' ⇅'
    return sortConfig.direction === 'asc' ? ' ▲' : ' ▼'
  }

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

      {apartment.imageUrl && (
        <div className="mt-6 h-64 sm:h-96 w-full overflow-hidden rounded-xl border border-stone-200 bg-stone-100 shadow-sm">
          <img
            src={apartment.imageUrl}
            alt={`${apartment.name} building exterior`}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-102"
          />
        </div>
      )}

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <Field label="Availability" value={apartment.availability} />
        <Field label="Cost" value={apartment.cost} />
        <Field label="Distance from the Tower" value={apartment.distanceFromTower} />
        <Field label="Address" value={apartment.address} />
      </section>

      <section className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label="Total floor plans" value={apartment.totalPlans ?? ''} />
        <Field label="Available plans" value={apartment.availablePlans ?? ''} />
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

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
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

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-stone-900">Available floor plans</h2>
        {floorPlans.length === 0 ? (
          <p className="mt-2 text-sm text-stone-600">
            (Floor plan details will appear here once they are available for this property.)
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-stone-50 text-xs font-bold uppercase tracking-wider text-stone-500 select-none">
                <tr>
                  <th 
                    onClick={() => requestSort('plan')}
                    className="px-4 py-3 cursor-pointer hover:bg-stone-100 hover:text-stone-900 transition-colors"
                  >
                    Plan{getSortIcon('plan')}
                  </th>
                  <th 
                    onClick={() => requestSort('roomType')}
                    className="px-4 py-3 cursor-pointer hover:bg-stone-100 hover:text-stone-900 transition-colors"
                  >
                    Room type{getSortIcon('roomType')}
                  </th>
                  <th 
                    onClick={() => requestSort('beds')}
                    className="px-4 py-3 cursor-pointer hover:bg-stone-100 hover:text-stone-900 transition-colors"
                  >
                    Beds{getSortIcon('beds')}
                  </th>
                  <th 
                    onClick={() => requestSort('baths')}
                    className="px-4 py-3 cursor-pointer hover:bg-stone-100 hover:text-stone-900 transition-colors"
                  >
                    Baths{getSortIcon('baths')}
                  </th>
                  <th 
                    onClick={() => requestSort('sqFt')}
                    className="px-4 py-3 cursor-pointer hover:bg-stone-100 hover:text-stone-900 transition-colors"
                  >
                    Sq Ft{getSortIcon('sqFt')}
                  </th>
                  <th 
                    onClick={() => requestSort('minPrice')}
                    className="px-4 py-3 cursor-pointer hover:bg-stone-100 hover:text-stone-900 transition-colors"
                  >
                    Min price{getSortIcon('minPrice')}
                  </th>
                  <th 
                    onClick={() => requestSort('maxPrice')}
                    className="px-4 py-3 cursor-pointer hover:bg-stone-100 hover:text-stone-900 transition-colors"
                  >
                    Max price{getSortIcon('maxPrice')}
                  </th>
                  <th 
                    onClick={() => requestSort('availability')}
                    className="px-4 py-3 cursor-pointer hover:bg-stone-100 hover:text-stone-900 transition-colors"
                  >
                    Availability{getSortIcon('availability')}
                  </th>
                  <th className="px-4 py-3 text-right">Favorite</th>
                </tr>
              </thead>
              <tbody>
                {sortedFloorPlans.map((plan) => {
                  const favorite = isFavorite(plan.id)
                  return (
                    <tr key={plan.id} className="border-t border-stone-100 hover:bg-stone-50/40 transition-colors">
                      <td className="px-4 py-3 text-stone-850 font-semibold">
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
                      <td className="px-4 py-3 text-stone-700">{plan.sqFt ? plan.sqFt.toLocaleString() : '—'}</td>
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
                      <td className="px-4 py-3 text-stone-700">
                        <span className={`px-2 py-0.5 rounded-full text-2xs font-bold ${
                          (plan.availability || '').toLowerCase().includes('sold out')
                            ? 'bg-stone-100 text-stone-500'
                            : (plan.availability || '').toLowerCase().includes('waitlist')
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-emerald-50 text-emerald-700'
                        }`}>
                          {plan.availability || '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => toggleFavorite(plan.id)}
                          className="inline-flex items-center gap-1 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-bold text-stone-700 shadow-sm hover:border-[#BF5700] hover:text-[#BF5700] cursor-pointer hover:bg-stone-50 transition"
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
    </div>
  )
}

