import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <section className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
          Apartments near UT Austin
        </h1>
        <p className="mt-4 text-lg text-stone-600">
          Find off-campus housing near the Forty Acres. We’ll show availability, cost, distance from campus, and pros and cons—powered by our AI assistant.
        </p>
        <div className="mt-10 flex justify-center">
          <Link
            to="/search"
            className="rounded-xl bg-[#BF5700] px-8 py-3 text-base font-semibold text-white transition hover:bg-[#9E4600]"
          >
            Find Apartments
          </Link>
        </div>
      </section>
      <section className="mt-20 grid gap-8 sm:grid-cols-3">
        <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-6">
          <span className="text-2xl">📍</span>
          <h2 className="mt-2 font-semibold text-stone-900">Distance</h2>
          <p className="mt-1 text-sm text-stone-600">
            See how far each apartment is from UT campus.
          </p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-6">
          <span className="text-2xl">💰</span>
          <h2 className="mt-2 font-semibold text-stone-900">Cost & availability</h2>
          <p className="mt-1 text-sm text-stone-600">
            Rent and move-in dates in one place.
          </p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-6">
          <span className="text-2xl">✓</span>
          <h2 className="mt-2 font-semibold text-stone-900">Pros & cons</h2>
          <p className="mt-1 text-sm text-stone-600">
            Quick summaries to compare options.
          </p>
        </div>
      </section>
      <div className="mt-16 text-center">
        <Link
          to="/about"
          className="text-sm font-medium text-[#BF5700] hover:underline"
        >
          About us →
        </Link>
      </div>
    </div>
  )
}
