import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { getFloorPlanById } from '../data/floorPlans'
import { UT_AUSTIN_APARTMENTS, normalizePropertyName } from '../data/apartments'

export default function FloorPlanComparePage() {
  const { favoriteIds, toggleFavorite } = useFavorites()
  const favoritePlans = favoriteIds
    .map((id) => getFloorPlanById(id))
    .filter(Boolean)

  const getApartmentForPlan = (plan) => {
    const norm = normalizePropertyName(plan.property)
    return UT_AUSTIN_APARTMENTS.find((a) => normalizePropertyName(a.name) === norm) || null
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-stone-200 pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-stone-900">
            Compare Favorite Floor Plans
          </h1>
          <p className="mt-2 text-stone-600">
            Compare layout specs, prices, distances, and pros/cons side by side.
          </p>
        </div>
        <Link to="/search" className="text-sm font-medium text-[#BF5700] hover:underline">
          ← Back to search
        </Link>
      </div>

      {favoritePlans.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-stone-300 bg-stone-50 py-16 text-center">
          <svg
            className="mx-auto h-12 w-12 text-stone-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <p className="mt-4 font-semibold text-stone-800 text-lg">No favorite floor plans saved yet</p>
          <p className="mt-2 text-sm text-stone-500 max-w-md mx-auto">
            Browse through apartments, click into individual floor plans, and click the ★ Save button to compare them here side-by-side.
          </p>
          <div className="mt-6">
            <Link
              to="/search"
              className="inline-flex items-center rounded-lg bg-[#BF5700] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#a04800] focus:outline-none"
            >
              Browse Apartments
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {favoritePlans.map((plan) => {
            const apartment = getApartmentForPlan(plan)
            const isSoldOut = plan.availability?.toLowerCase().includes('sold out') || plan.availability?.toLowerCase().includes('waitlist')

            return (
              <div
                key={plan.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm hover:shadow-md transition duration-300"
              >
                {/* Image Section */}
                <div className="relative h-48 w-full bg-stone-50 border-b border-stone-100 flex items-center justify-center overflow-hidden">
                  {plan.imagePath ? (
                    <img
                      src={plan.imagePath}
                      alt={`${plan.plan} floor plan layout`}
                      className="h-full w-full object-contain p-4"
                      loading="lazy"
                    />
                  ) : apartment?.imageUrl ? (
                    <img
                      src={apartment.imageUrl}
                      alt={`${apartment.name} building exterior`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-stone-100 text-stone-400">
                      No layout image
                    </div>
                  )}

                  {/* Availability Badge */}
                  {plan.availability && (
                    <span
                      className={`absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-xs font-semibold shadow-sm ${
                        isSoldOut
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {plan.availability}
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-6">
                  {/* Property & Distance */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Property
                    </p>
                    <div className="mt-1 flex flex-col gap-1">
                      {apartment ? (
                        <Link
                          to={`/apartments/${encodeURIComponent(apartment.id)}`}
                          className="text-lg font-bold text-stone-900 hover:text-[#BF5700] transition"
                        >
                          {apartment.name}
                        </Link>
                      ) : (
                        <span className="text-lg font-bold text-stone-900">{plan.property}</span>
                      )}

                      {/* Distance to Tower */}
                      {apartment?.distanceFromTower && (
                        <div className="flex items-center gap-1.5 text-sm text-stone-600">
                          <svg
                            className="h-4 w-4 text-[#BF5700] flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span>{apartment.distanceFromTower} from UT Tower</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Plan & Pricing */}
                  <div className="mb-6 rounded-xl bg-stone-50 p-4 border border-stone-100">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">Plan Name</h4>
                        <Link
                          to={`/floorplans/${encodeURIComponent(plan.id)}`}
                          className="text-md font-bold text-[#BF5700] hover:underline block mt-0.5"
                        >
                          {plan.plan}
                        </Link>
                      </div>
                      <div className="text-right">
                        <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">Monthly Rent</h4>
                        <p className="text-md font-bold text-stone-800 mt-0.5">
                          {typeof plan.minPrice === 'number'
                            ? `$${plan.minPrice.toLocaleString()}/mo`
                            : '—'}
                          {typeof plan.maxPrice === 'number' && plan.maxPrice !== plan.minPrice
                            ? ` - $${plan.maxPrice.toLocaleString()}/mo`
                            : ''}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 border-t border-stone-200 pt-2 mt-2 text-center text-xs">
                      <div>
                        <p className="text-stone-500 font-medium">Beds/Baths</p>
                        <p className="font-semibold text-stone-800 mt-0.5">
                          {plan.beds} B / {plan.baths} B
                        </p>
                      </div>
                      <div>
                        <p className="text-stone-500 font-medium">Room Type</p>
                        <p className="font-semibold text-stone-800 mt-0.5 truncate" title={plan.roomType}>
                          {plan.roomType}
                        </p>
                      </div>
                      <div>
                        <p className="text-stone-500 font-medium">Sq Ft</p>
                        <p className="font-semibold text-stone-800 mt-0.5">
                          {plan.sqFt ? `${plan.sqFt} sq ft` : '—'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Floor Plan Pros & Cons */}
                  <div className="mb-6 flex-1 flex flex-col gap-4">
                    {/* Floor Plan Specific Pros & Cons */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">
                        Floor Plan Pros
                      </h4>
                      {plan.pros && plan.pros.length > 0 ? (
                        <ul className="space-y-1 text-sm text-stone-700 list-inside list-disc">
                          {plan.pros.map((pro, index) => (
                            <li key={index} className="pl-1 text-stone-600 leading-tight">
                              {pro}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-stone-400 italic">No specific layout pros listed.</p>
                      )}
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 mb-2">
                        Floor Plan Cons
                      </h4>
                      {plan.cons && plan.cons.length > 0 ? (
                        <ul className="space-y-1 text-sm text-stone-700 list-inside list-disc">
                          {plan.cons.map((con, index) => (
                            <li key={index} className="pl-1 text-stone-600 leading-tight">
                              {con}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-stone-400 italic">No specific layout cons listed.</p>
                      )}
                    </div>

                    {/* Property-Wide Pros & Cons */}
                    {apartment && (
                      <div className="border-t border-stone-100 pt-4 mt-2">
                        <details className="group">
                          <summary className="flex cursor-pointer items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-500 outline-none select-none">
                            <span>Property Amenities & Notes</span>
                            <span className="transition group-open:rotate-180">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </span>
                          </summary>
                          <div className="mt-3 grid gap-3 sm:grid-cols-2 text-xs leading-relaxed text-stone-600 bg-stone-50 p-3 rounded-lg border border-stone-200/50">
                            <div>
                              <p className="font-semibold text-emerald-700 mb-1">Building Pros</p>
                              <ul className="list-disc list-inside space-y-0.5">
                                {apartment.pros?.slice(0, 3).map((p, i) => (
                                  <li key={i}>{p}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="font-semibold text-rose-700 mb-1">Building Cons</p>
                              <ul className="list-disc list-inside space-y-0.5">
                                {apartment.cons?.slice(0, 3).map((c, i) => (
                                  <li key={i}>{c}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </details>
                      </div>
                    )}
                  </div>

                  {/* Card Footer Actions */}
                  <div className="mt-auto border-t border-stone-100 pt-4 flex gap-3">
                    {plan.url ? (
                      <a
                        href={plan.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 inline-flex justify-center items-center rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-700 shadow-sm hover:bg-stone-50 focus:outline-none transition"
                      >
                        Official Website
                      </a>
                    ) : apartment?.url ? (
                      <a
                        href={apartment.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 inline-flex justify-center items-center rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-700 shadow-sm hover:bg-stone-50 focus:outline-none transition"
                      >
                        Property Website
                      </a>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => toggleFavorite(plan.id)}
                      className="inline-flex items-center justify-center rounded-lg border border-rose-200 bg-rose-50/50 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 hover:text-rose-800 transition"
                    >
                      <svg className="h-4 w-4 mr-1 fill-current" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}


