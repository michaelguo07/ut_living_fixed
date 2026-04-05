import { Link } from 'react-router-dom'

/**
 * @param {import('../../hooks/useAIAgent').Apartment} apartment
 */
export default function ApartmentCard({ apartment }) {
  const { name, address, cost, distanceFromTower, availability, pros = [], cons = [] } = apartment

  return (
    <article className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-3">
        <div>
          <h3 className="text-lg font-semibold text-stone-900">
            <Link
              to={`/apartments/${encodeURIComponent(apartment.id)}`}
              className="outline-none hover:text-[#BF5700] focus-visible:rounded focus-visible:ring-2 focus-visible:ring-[#BF5700]/40"
            >
              {name}
            </Link>
          </h3>
          {address && (
            <p className="text-sm text-stone-500">{address}</p>
          )}
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          {cost && (
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 font-medium text-amber-800">
              {cost}
            </span>
          )}
          {distanceFromTower && (
            <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-stone-700">
              {distanceFromTower} from the Tower
            </span>
          )}
          {availability && (
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-800">
              {availability}
            </span>
          )}
        </div>
        {(pros.length > 0 || cons.length > 0) && (
          <div className="grid gap-2 sm:grid-cols-2">
            {pros.length > 0 && (
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-emerald-600">
                  Pros
                </p>
                <ul className="list-inside list-disc text-sm text-stone-600">
                  {pros.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            )}
            {cons.length > 0 && (
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-red-600">
                  Cons
                </p>
                <ul className="list-inside list-disc text-sm text-stone-600">
                  {cons.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
