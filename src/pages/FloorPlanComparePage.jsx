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
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-stone-200 pb-6 mb-8">
        <div>
          <span className="text-xs font-bold text-burnt-orange uppercase tracking-wider">Plan Evaluator</span>
          <h1 className="text-3xl font-extrabold tracking-tight text-stone-900 mt-1">
            Compare Favorite Floor Plans
          </h1>
          <p className="mt-2 text-sm text-stone-600 font-medium">
            Analyze pricing, size specs, layout pros/cons, and derived metrics side-by-side.
          </p>
        </div>
        <Link to="/search" className="inline-flex items-center gap-1.5 text-sm font-semibold text-burnt-orange hover:text-burnt-orange-hover hover:underline transition">
          ← Back to search
        </Link>
      </div>

      {favoritePlans.length === 0 ? (
        /* Google Flights styled Empty State with custom SVG illustration */
        <div className="mt-12 rounded-3xl border border-dashed border-stone-300 bg-white py-16 px-6 text-center max-w-xl mx-auto shadow-sm">
          {/* Blueprint-style layout custom vector SVG */}
          <div className="mx-auto h-36 w-48 text-stone-300 relative flex items-center justify-center">
            <svg className="h-full w-full opacity-70" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Grid backdrop */}
              <rect width="200" height="150" rx="12" fill="#F9F8F6" />
              <path d="M 0 30 L 200 30 M 0 60 L 200 60 M 0 90 L 200 90 M 0 120 L 200 120" stroke="#ECEAE4" strokeWidth="1" />
              <path d="M 40 0 L 40 150 M 80 0 L 80 150 M 120 0 L 120 150 M 160 0 L 160 150" stroke="#ECEAE4" strokeWidth="1" />
              
              {/* Floor Plan mockup lines */}
              <rect x="25" y="25" width="150" height="100" rx="8" stroke="#BF5700" strokeWidth="2.5" strokeDasharray="3 3" opacity="0.4" />
              <rect x="35" y="35" width="60" height="50" rx="4" stroke="#A59F95" strokeWidth="2" />
              <rect x="105" y="35" width="60" height="80" rx="4" stroke="#A59F95" strokeWidth="2" />
              <rect x="35" y="95" width="60" height="20" rx="4" stroke="#A59F95" strokeWidth="2" />
              
              {/* Heart Badge overlay */}
              <circle cx="100" cy="75" r="24" fill="#BF5700" className="shadow-lg" />
              <path d="M100 83.5l-1.45-1.32C93.4 77.58 89 73.6 89 68.8c0-3.9 3.1-7 7-7 2.2 0 4.3 1 5.7 2.6C103.1 62.8 105.2 61.8 107.4 61.8c3.9 0 7 3.1 7 7 0 4.8-4.4 8.78-9.55 13.38L100 83.5z" fill="#FFFFFF" />
            </svg>
          </div>

          <p className="mt-8 font-extrabold text-stone-850 text-xl tracking-tight">No floor plans saved yet</p>
          <p className="mt-3 text-sm text-stone-500 max-w-sm mx-auto leading-relaxed font-medium">
            Browse through apartments, click into individual floor plans, and click the <span className="text-burnt-orange font-bold">★ Save</span> button to build your matrix comparison here.
          </p>
          <div className="mt-8">
            <Link
              to="/search"
              className="inline-flex items-center rounded-full bg-burnt-orange hover:bg-burnt-orange-hover px-6 py-3 text-sm font-bold text-white shadow-md shadow-burnt-orange/15 transition focus:outline-none"
            >
              Browse Apartments
            </Link>
          </div>
        </div>
      ) : (
        /* Pricing Spec Matrix Table */
        <div className="rounded-3xl border border-stone-200 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-stone-50/75 border-b border-stone-200">
                  {/* Label Header */}
                  <th className="p-6 text-xs font-extrabold text-stone-400 uppercase tracking-widest w-[20%] border-r border-stone-100">
                    Floor Plan Details
                  </th>
                  {/* Columns headers */}
                  {favoritePlans.map((plan) => {
                    const apartment = getApartmentForPlan(plan)
                    return (
                      <th key={plan.id} className="p-6 w-[26.6%] border-r border-stone-100 last:border-r-0 relative group">
                        
                        {/* Remove Action Button */}
                        <button
                          type="button"
                          onClick={() => toggleFavorite(plan.id)}
                          className="absolute top-4 right-4 h-7 w-7 rounded-full bg-stone-100 text-stone-500 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer"
                          title="Remove from comparison"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>

                        <div className="flex flex-col gap-2">
                          <span className="inline-block text-3xs font-extrabold text-stone-400 uppercase tracking-widest">
                            {plan.availability?.includes('Sold Out') || plan.availability?.includes('Waitlist') ? '❌ Waitlist / Sold Out' : 'Available'}
                          </span>
                          <Link
                            to={`/floorplans/${encodeURIComponent(plan.id)}`}
                            className="text-md font-extrabold text-stone-900 hover:text-burnt-orange transition-colors line-clamp-1 pr-6"
                          >
                            {plan.plan}
                          </Link>
                          {apartment ? (
                            <Link
                              to={`/apartments/${encodeURIComponent(apartment.id)}`}
                              className="text-xs font-semibold text-stone-500 hover:underline"
                            >
                              {apartment.name}
                            </Link>
                          ) : (
                            <span className="text-xs font-semibold text-stone-500">{plan.property}</span>
                          )}
                        </div>
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs font-semibold text-stone-700">
                
                {/* 1. Blueprint Preview Row */}
                <tr>
                  <td className="p-6 bg-stone-50/30 font-bold text-stone-500 uppercase tracking-wider border-r border-stone-100">
                    Layout Image
                  </td>
                  {favoritePlans.map((plan) => {
                    const apartment = getApartmentForPlan(plan)
                    const imageSrc = plan.imagePath || apartment?.imageUrl
                    return (
                      <td key={plan.id} className="p-6 border-r border-stone-100 last:border-r-0">
                        <div className="h-28 w-full rounded-xl bg-stone-50/50 border border-stone-200/55 p-2 overflow-hidden flex items-center justify-center">
                          {imageSrc ? (
                            <img
                              src={imageSrc}
                              alt={`${plan.plan} floor plan blueprint`}
                              className="h-full w-full object-contain hover:scale-105 transition-transform"
                            />
                          ) : (
                            <span className="text-stone-400 font-medium">No blueprint image</span>
                          )}
                        </div>
                      </td>
                    )
                  })}
                </tr>

                {/* 2. Monthly Rent Row */}
                <tr>
                  <td className="p-6 bg-stone-50/30 font-bold text-stone-500 uppercase tracking-wider border-r border-stone-100">
                    Monthly Rent
                  </td>
                  {favoritePlans.map((plan) => {
                    const hasRange = typeof plan.maxPrice === 'number' && plan.maxPrice !== plan.minPrice
                    return (
                      <td key={plan.id} className="p-6 border-r border-stone-100 last:border-r-0">
                        <span className="text-base font-extrabold text-burnt-orange">
                          {typeof plan.minPrice === 'number' ? `$${plan.minPrice.toLocaleString()}` : '—'}
                          {hasRange ? ` - $${plan.maxPrice.toLocaleString()}` : ''}
                        </span>
                        <span className="text-stone-400 font-bold text-3xs uppercase tracking-wide block mt-0.5">per installment</span>
                      </td>
                    )
                  })}
                </tr>

                {/* 3. Bed / Bath specs */}
                <tr>
                  <td className="p-6 bg-stone-50/30 font-bold text-stone-500 uppercase tracking-wider border-r border-stone-100">
                    Beds & Baths
                  </td>
                  {favoritePlans.map((plan) => (
                    <td key={plan.id} className="p-6 border-r border-stone-100 last:border-r-0">
                      <span className="text-sm font-extrabold text-stone-850">
                        {plan.beds === 0 ? 'Studio' : `${plan.beds} Bed`} / {plan.baths} Bath
                      </span>
                      <span className="text-stone-400 block text-3xs font-bold uppercase mt-0.5">{plan.roomType}</span>
                    </td>
                  ))}
                </tr>

                {/* 4. Unit Size */}
                <tr>
                  <td className="p-6 bg-stone-50/30 font-bold text-stone-500 uppercase tracking-wider border-r border-stone-100">
                    Unit Size
                  </td>
                  {favoritePlans.map((plan) => (
                    <td key={plan.id} className="p-6 border-r border-stone-100 last:border-r-0">
                      <span className="text-sm font-extrabold text-stone-850">
                        {plan.sqFt ? `${plan.sqFt} sq ft` : '—'}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* 5. Derived Metric: Rent per Sq Ft */}
                <tr>
                  <td className="p-6 bg-stone-50/30 font-bold text-stone-500 uppercase tracking-wider border-r border-stone-100">
                    Price per Sq Ft
                  </td>
                  {favoritePlans.map((plan) => {
                    const numericSize = plan.sqFt ? parseFloat(plan.sqFt) : null
                    const pricePerSqFt = numericSize && typeof plan.minPrice === 'number' ? plan.minPrice / numericSize : null
                    return (
                      <td key={plan.id} className="p-6 border-r border-stone-100 last:border-r-0">
                        {pricePerSqFt ? (
                          <span className="text-xs font-extrabold text-stone-850">
                            ${pricePerSqFt.toFixed(2)} / sq ft
                          </span>
                        ) : (
                          <span className="text-stone-400 font-medium">N/A</span>
                        )}
                      </td>
                    )
                  })}
                </tr>

                {/* 6. Availability */}
                <tr>
                  <td className="p-6 bg-stone-50/30 font-bold text-stone-500 uppercase tracking-wider border-r border-stone-100">
                    Availability
                  </td>
                  {favoritePlans.map((plan) => {
                    const isSoldOut = plan.availability?.toLowerCase().includes('sold out') || plan.availability?.toLowerCase().includes('waitlist')
                    return (
                      <td key={plan.id} className="p-6 border-r border-stone-100 last:border-r-0">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-3xs font-bold ${
                            isSoldOut
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {plan.availability || 'Available'}
                        </span>
                      </td>
                    )
                  })}
                </tr>

                {/* 7. Floor Plan Pros */}
                <tr>
                  <td className="p-6 bg-stone-50/30 font-bold text-stone-500 uppercase tracking-wider border-r border-stone-100">
                    Layout Pros
                  </td>
                  {favoritePlans.map((plan) => (
                    <td key={plan.id} className="p-6 border-r border-stone-100 last:border-r-0 align-top">
                      {plan.pros && plan.pros.length > 0 ? (
                        <div className="flex flex-col gap-1.5">
                          {plan.pros.map((p, idx) => (
                            <div key={idx} className="flex items-start gap-1 text-stone-600">
                              <span className="text-emerald-500 flex-shrink-0 mt-0.5 font-bold">✓</span>
                              <span>{p}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-stone-400 font-medium italic">No layout pros listed</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* 8. Floor Plan Cons */}
                <tr>
                  <td className="p-6 bg-stone-50/30 font-bold text-stone-500 uppercase tracking-wider border-r border-stone-100">
                    Layout Cons
                  </td>
                  {favoritePlans.map((plan) => (
                    <td key={plan.id} className="p-6 border-r border-stone-100 last:border-r-0 align-top">
                      {plan.cons && plan.cons.length > 0 ? (
                        <div className="flex flex-col gap-1.5">
                          {plan.cons.map((c, idx) => (
                            <div key={idx} className="flex items-start gap-1 text-stone-500">
                              <span className="text-stone-400 flex-shrink-0 mt-0.5">×</span>
                              <span>{c}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-stone-400 font-medium italic">No layout cons listed</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* 9. Property Amenities (Scraped Building Pros/Cons) */}
                <tr>
                  <td className="p-6 bg-stone-50/30 font-bold text-stone-500 uppercase tracking-wider border-r border-stone-100">
                    Building Amenities
                  </td>
                  {favoritePlans.map((plan) => {
                    const apartment = getApartmentForPlan(plan)
                    return (
                      <td key={plan.id} className="p-6 border-r border-stone-100 last:border-r-0 align-top">
                        {apartment ? (
                          <div className="flex flex-col gap-3">
                            {apartment.pros?.length > 0 && (
                              <div>
                                <p className="font-bold text-emerald-800 text-3xs uppercase tracking-wider mb-1">Building Pros</p>
                                <div className="flex flex-col gap-1">
                                  {apartment.pros.slice(0, 3).map((p, i) => (
                                    <div key={i} className="text-stone-600 line-clamp-2 leading-tight">
                                      • {p}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {apartment.cons?.length > 0 && (
                              <div>
                                <p className="font-bold text-stone-400 text-3xs uppercase tracking-wider mb-1">Building Cons</p>
                                <div className="flex flex-col gap-1">
                                  {apartment.cons.slice(0, 3).map((c, i) => (
                                    <div key={i} className="text-stone-500 line-clamp-2 leading-tight">
                                      • {c}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-stone-400 font-medium">No building details available</span>
                        )}
                      </td>
                    )
                  })}
                </tr>

                {/* 10. Actions Footer row */}
                <tr>
                  <td className="p-6 bg-stone-50/30 font-bold text-stone-500 uppercase tracking-wider border-r border-stone-100">
                    Actions
                  </td>
                  {favoritePlans.map((plan) => {
                    const apartment = getApartmentForPlan(plan)
                    const externalUrl = plan.url || apartment?.url
                    return (
                      <td key={plan.id} className="p-6 border-r border-stone-100 last:border-r-0">
                        <div className="flex flex-col gap-2">
                          {externalUrl ? (
                            <a
                              href={externalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full text-center rounded-xl bg-burnt-orange-light hover:bg-burnt-orange/10 py-2.5 text-2xs font-extrabold text-burnt-orange transition-colors"
                            >
                              Official Website
                            </a>
                          ) : (
                            <span className="text-stone-450 italic text-2xs text-center border border-stone-100 p-2 rounded-xl">No URL available</span>
                          )}
                          
                          <button
                            type="button"
                            onClick={() => toggleFavorite(plan.id)}
                            className="w-full text-center rounded-xl bg-rose-50 hover:bg-rose-100 py-2.5 text-2xs font-extrabold text-rose-700 transition-colors"
                          >
                            Remove Saved
                          </button>
                        </div>
                      </td>
                    )
                  })}
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}



