import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-28 sm:px-6 lg:px-8">
      {/* Background Graphic Accents */}
      <div className="absolute top-[-10%] left-[5%] -z-10 h-72 w-72 rounded-full bg-burnt-orange/5 blur-3xl" />
      <div className="absolute bottom-[20%] right-[5%] -z-10 h-96 w-96 rounded-full bg-stone-100/50 blur-2xl" />

      {/* Hero Header */}
      <section className="mx-auto max-w-3xl text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-stone-900 sm:text-6xl md:text-7xl leading-tight">
          Find your home near <span className="text-burnt-orange">UT Austin</span>
        </h1>
        <p className="mt-6 text-lg text-stone-600 max-w-xl mx-auto font-medium leading-relaxed">
          Compare availability, floor plans, real rents, and student reviews near the Forty Acres. Powered by scraped apartment facts.
        </p>
        
        {/* Simple prominent Burnt Orange CTA button */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/search"
            className="rounded-full bg-burnt-orange hover:bg-burnt-orange-hover px-10 py-4 text-base font-bold text-white shadow-lg shadow-burnt-orange/20 hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Find Apartments
          </Link>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="mt-28">
        <h3 className="text-center text-xs font-bold uppercase tracking-wider text-stone-500">
          Tailored Student Housing Discovery
        </h3>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-stone-900 tracking-tight sm:text-4xl">
          Everything you need to decide
        </h2>
        
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          
          {/* Card 1: Distance */}
          <div className="group rounded-3xl border border-stone-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-burnt-orange/20 hover:-translate-y-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-burnt-orange transition-colors group-hover:bg-burnt-orange group-hover:text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h4 className="mt-6 text-xl font-bold text-stone-900">Campus Distance</h4>
            <p className="mt-3 text-stone-600 text-sm leading-relaxed font-medium">
              We list walking distance to the UT Tower. Never guess how long your morning walk across Guadalupe will take.
            </p>
          </div>

          {/* Card 2: Cost & Availability */}
          <div className="group rounded-3xl border border-stone-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-burnt-orange/20 hover:-translate-y-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-burnt-orange transition-colors group-hover:bg-burnt-orange group-hover:text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6m-6 4h6m-6 4h6m1 4H4a2 2 0 01-2-2V6a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h4 className="mt-6 text-xl font-bold text-stone-900">Scraped Prices</h4>
            <p className="mt-3 text-stone-600 text-sm leading-relaxed font-medium">
              Daily scraped rents directly from property management sites. Real pricing tables showing exact availability parameters.
            </p>
          </div>

          {/* Card 3: Pros & Cons */}
          <div className="group rounded-3xl border border-stone-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-burnt-orange/20 hover:-translate-y-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-burnt-orange transition-colors group-hover:bg-burnt-orange group-hover:text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="mt-6 text-xl font-bold text-stone-900">Pros & Cons Matrix</h4>
            <p className="mt-3 text-stone-600 text-sm leading-relaxed font-medium">
              Understand the pitfalls of West Campus living. Scan highlights and gotchas like high parking rates and utility billing.
            </p>
          </div>

        </div>
      </section>

      {/* About Link */}
      <div className="mt-20 text-center">
        <Link
          to="/about"
          className="inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange hover:text-burnt-orange-hover hover:underline transition"
        >
          Learn more about UT Living
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>

    </div>
  )
}


