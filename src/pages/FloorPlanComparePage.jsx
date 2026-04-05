import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { getFloorPlanById } from '../data/floorPlans'

export default function FloorPlanComparePage() {
  const { favoriteIds } = useFavorites()
  const favoritePlans = favoriteIds
    .map((id) => getFloorPlanById(id))
    .filter(Boolean)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            Compare floor plans
          </h1>
          <p className="mt-1 text-stone-600">
            Favorite floor plans from different apartments and compare them side by side.
          </p>
        </div>
        <Link to="/search" className="text-sm font-medium text-[#BF5700] hover:underline">
          ← Back to apartments
        </Link>
      </div>

      {favoritePlans.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-stone-300 bg-stone-50 py-10 text-center">
          <p className="font-medium text-stone-700">No favorite floor plans yet.</p>
          <p className="mt-1 text-sm text-stone-500">
            Open an apartment, click into a floor plan, and hit the ★ Save button to add it here.
          </p>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-stone-50 text-xs font-semibold uppercase tracking-wide text-stone-500">
              <tr>
                <th className="px-4 py-3">Property</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Room type</th>
                <th className="px-4 py-3">Beds</th>
                <th className="px-4 py-3">Baths</th>
                <th className="px-4 py-3">Sq Ft</th>
                <th className="px-4 py-3">Min price</th>
                <th className="px-4 py-3">Max price</th>
                <th className="px-4 py-3">Availability</th>
                <th className="px-4 py-3">Link</th>
              </tr>
            </thead>
            <tbody>
              {favoritePlans.map((plan) => (
                <tr key={plan.id} className="border-t border-stone-100">
                  <td className="px-4 py-3 text-stone-800">{plan.property}</td>
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
                  <td className="px-4 py-3 text-xs">
                    {plan.url ? (
                      <a
                        href={plan.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#BF5700] hover:underline"
                      >
                        Website
                      </a>
                    ) : (
                      <span className="text-stone-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

