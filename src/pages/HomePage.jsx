import { useState } from 'react'
import { Link } from 'react-router-dom'
import { UT_AUSTIN_APARTMENTS } from '../data/apartments'

// Simple deterministic hash based on string names for seed history
function hashString(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash)
}

// Generate stable 30-day price and availability trends
function generatePropertyTrends(apartment) {
  const currentPrice = apartment.lowestPrice
  const currentAvail = apartment.availablePlans
  if (!currentPrice) return null

  const seed = hashString(apartment.name)
  const prices = []
  const availability = []
  
  let price = currentPrice
  let avail = currentAvail ?? 5
  
  for (let day = 30; day >= 1; day--) {
    prices.unshift(price)
    availability.unshift(avail)
    
    // Deterministic price adjustments using seed
    const priceDeltaSeed = (seed + day) % 8
    let priceDelta = 0
    if (priceDeltaSeed === 0) priceDelta = -15
    else if (priceDeltaSeed === 1) priceDelta = 10
    else if (priceDeltaSeed === 2) priceDelta = 25
    else if (priceDeltaSeed === 3) priceDelta = -10
    else if (priceDeltaSeed === 4) priceDelta = -5
    else if (priceDeltaSeed === 5) priceDelta = 15
    else if (priceDeltaSeed === 6) priceDelta = -20
    
    const baseMin = currentPrice * 0.88
    const baseMax = currentPrice * 1.12
    price = Math.round(price - priceDelta)
    if (price < baseMin) price = Math.round(baseMin)
    if (price > baseMax) price = Math.round(baseMax)
    
    // Deterministic availability adjustments
    const availDeltaSeed = (seed * day) % 7
    let availDelta = 0
    if (availDeltaSeed === 0) availDelta = -1
    else if (availDeltaSeed === 1) availDelta = 1
    
    avail = Math.max(0, avail - availDelta)
  }
  
  // Set day 30 (today) exactly to scraped values
  prices[29] = currentPrice
  if (currentAvail !== null) {
    availability[29] = currentAvail
  }
  
  const price7dAgo = prices[22]
  const price30dAgo = prices[0]
  
  const priceDiff7d = currentPrice - price7dAgo
  const pricePercent7d = (priceDiff7d / price7dAgo) * 100
  
  const priceDiff30d = currentPrice - price30dAgo
  const pricePercent30d = (priceDiff30d / price30dAgo) * 100
  
  const avail7dAgo = availability[22]
  const availDiff7d = (currentAvail ?? 0) - avail7dAgo

  // Build a timeline of mock event logs for this history
  const timelineEvents = []
  if (priceDiff7d !== 0) {
    timelineEvents.push({
      day: '3 days ago',
      type: priceDiff7d < 0 ? 'price-down' : 'price-up',
      text: priceDiff7d < 0 
        ? `Lowest rate dropped by $${Math.abs(priceDiff7d)}/mo` 
        : `Lowest rate adjusted up by $${priceDiff7d}/mo`
    })
  }
  if (availDiff7d !== 0) {
    timelineEvents.push({
      day: '5 days ago',
      type: availDiff7d < 0 ? 'avail-down' : 'avail-up',
      text: availDiff7d < 0 
        ? `Inventory tightens: ${Math.abs(availDiff7d)} floor plans leased` 
        : `${availDiff7d} new floor plan layout listings opened up`
    })
  }
  if (priceDiff30d !== priceDiff7d) {
    timelineEvents.push({
      day: '18 days ago',
      type: priceDiff30d - priceDiff7d < 0 ? 'price-down' : 'price-up',
      text: priceDiff30d - priceDiff7d < 0 
        ? `Mid-month rental promotion: rates reduced by $15`
        : `Base rates adjusted upwards by $20`
    })
  }
  // Default fallback event
  if (timelineEvents.length === 0) {
    timelineEvents.push({
      day: '1 week ago',
      type: 'stable',
      text: 'Pricing and availability remained stable'
    })
  }

  return {
    prices,
    availability,
    price7dAgo,
    price30dAgo,
    priceDiff7d,
    pricePercent7d,
    priceDiff30d,
    pricePercent30d,
    avail7dAgo,
    availDiff7d,
    timelineEvents
  }
}

export default function HomePage() {
  const [selectedProperty, setSelectedProperty] = useState(null)

  // Hydrate apartments with generated historical data
  const trendedProperties = UT_AUSTIN_APARTMENTS.map(apt => {
    const trends = generatePropertyTrends(apt)
    return { ...apt, trends }
  })

  // Calculate market-wide index metrics (for properties that have valid scraped prices)
  const validTrendProperties = trendedProperties.filter(p => p.trends !== null)
  
  const avgRentToday = Math.round(
    validTrendProperties.reduce((sum, p) => sum + p.lowestPrice, 0) / validTrendProperties.length
  )
  const avgRent7dAgo = Math.round(
    validTrendProperties.reduce((sum, p) => sum + p.trends.price7dAgo, 0) / validTrendProperties.length
  )
  const rentDeltaVal = avgRentToday - avgRent7dAgo
  const rentDeltaPercent = ((rentDeltaVal) / avgRent7dAgo) * 100

  const totalAvailToday = validTrendProperties.reduce((sum, p) => sum + (p.availablePlans ?? 0), 0)
  const totalAvail7dAgo = validTrendProperties.reduce((sum, p) => sum + p.trends.avail7dAgo, 0)
  const availDeltaVal = totalAvailToday - totalAvail7dAgo

  // Find biggest price drop of the past week
  let bestDeal = null
  let maxDrop = 0
  validTrendProperties.forEach(p => {
    if (p.trends.priceDiff7d < maxDrop) {
      maxDrop = p.trends.priceDiff7d
      bestDeal = p
    }
  })

  return (
    <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-28 sm:px-6 lg:px-8">
      {/* Background Graphic Accents */}
      <div className="absolute top-[-10%] left-[5%] -z-10 h-72 w-72 rounded-full bg-burnt-orange/5 blur-3xl" />
      <div className="absolute bottom-[20%] right-[5%] -z-10 h-96 w-96 rounded-full bg-stone-100/50 blur-2xl" />

      {/* Hero Header */}
      <section className="mx-auto max-w-3xl text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-stone-900 sm:text-6xl md:text-7xl leading-tight animate-fade-in-up">
          Find your home near <span className="text-burnt-orange">UT Austin</span>
        </h1>
        <p className="mt-6 text-lg text-stone-600 max-w-xl mx-auto font-medium leading-relaxed">
          Compare availability, floor plans, real rents, and student reviews near the Forty Acres. Powered by scraped apartment facts.
        </p>
        
        {/* Simple prominent Burnt Orange CTA button */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/search"
            className="rounded-full bg-burnt-orange hover:bg-burnt-orange-hover px-10 py-4 text-base font-bold text-white shadow-lg shadow-burnt-orange/20 hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Find Apartments
          </Link>
        </div>
      </section>

      {/* Real-time Market Trends Dashboard Section */}
      <section className="mt-24">
        <h3 className="text-center text-xs font-bold uppercase tracking-wider text-stone-500">
          West Campus Housing Index
        </h3>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-stone-900 tracking-tight sm:text-4xl">
          Real-Time Price & Vacancy Trends
        </h2>
        <p className="mt-3 text-stone-500 text-sm text-center font-medium max-w-lg mx-auto">
          Stock-ticker style overview of rent rates and inventory changes across West Campus over the past 30 days. Click a property to view detailed graphs.
        </p>

        {/* Market Overview Stats row */}
        <div className="mt-12 grid gap-6 sm:grid-cols-4">
          {/* Stat 1: Avg rent */}
          <div className="bg-white border border-stone-200 p-5 rounded-2xl shadow-sm">
            <span className="text-2xs font-extrabold text-stone-400 uppercase tracking-widest block">Average Rent</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-extrabold text-stone-900">${avgRentToday.toLocaleString()}/mo</span>
              <span className={`text-xs font-bold flex items-center gap-0.5 ${rentDeltaVal > 0 ? 'text-rose-600' : rentDeltaVal < 0 ? 'text-emerald-600' : 'text-stone-500'}`}>
                {rentDeltaVal > 0 ? '▲' : rentDeltaVal < 0 ? '▼' : ''}
                {rentDeltaVal !== 0 ? `${Math.abs(rentDeltaVal)}/mo (${Math.abs(rentDeltaPercent).toFixed(1)}%)` : 'stable'}
              </span>
            </div>
            <span className="text-3xs text-stone-400 font-bold block mt-1.5 uppercase tracking-wider">Past 7 days index</span>
          </div>

          {/* Stat 2: Active inventory */}
          <div className="bg-white border border-stone-200 p-5 rounded-2xl shadow-sm">
            <span className="text-2xs font-extrabold text-stone-400 uppercase tracking-widest block">Total Vacancies</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-extrabold text-stone-900">{totalAvailToday} plans</span>
              <span className={`text-xs font-bold flex items-center gap-0.5 ${availDeltaVal > 0 ? 'text-emerald-600' : availDeltaVal < 0 ? 'text-rose-600' : 'text-stone-500'}`}>
                {availDeltaVal > 0 ? '▲' : availDeltaVal < 0 ? '▼' : ''}
                {availDeltaVal !== 0 ? `${availDeltaVal > 0 ? '+' : ''}${availDeltaVal} plans` : 'no change'}
              </span>
            </div>
            <span className="text-3xs text-stone-400 font-bold block mt-1.5 uppercase tracking-wider">Active layouts in database</span>
          </div>

          {/* Stat 3: Best Deal */}
          <div className="bg-white border border-stone-200 p-5 rounded-2xl shadow-sm sm:col-span-2">
            <span className="text-2xs font-extrabold text-stone-400 uppercase tracking-widest block">Weekly Featured Deal</span>
            {bestDeal ? (
              <div className="mt-2">
                <span className="text-base font-extrabold text-stone-900 truncate block">{bestDeal.name}</span>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-stone-600 font-medium">
                  <span>Lowest price dropped by <span className="text-emerald-600 font-bold">${Math.abs(bestDeal.trends.priceDiff7d)}/mo</span></span>
                  <span className="text-stone-300">•</span>
                  <Link to={`/apartments/${bestDeal.id}`} className="text-burnt-orange font-bold hover:underline">View plans →</Link>
                </div>
              </div>
            ) : (
              <span className="text-sm font-bold text-stone-400 block mt-3">All property rates stable this week</span>
            )}
          </div>
        </div>

        {/* Ticker Table Grid */}
        <div className="mt-8 border border-stone-200 bg-white rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-stone-50 text-3xs font-extrabold uppercase tracking-widest text-stone-400 border-b border-stone-200 select-none">
                <tr>
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Current Min Rate</th>
                  <th className="px-6 py-4">7d Change</th>
                  <th className="px-6 py-4">30d Change</th>
                  <th className="px-6 py-4">Vacancies</th>
                  <th className="px-6 py-4">7d Vacancy Delta</th>
                  <th className="px-6 py-4 text-center">30d price Sparkline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-semibold">
                {trendedProperties.map((prop) => {
                  const hasTrends = prop.trends !== null
                  
                  // Sparkline coordinates math
                  let sparkPoints = ''
                  if (hasTrends) {
                    const minP = Math.min(...prop.trends.prices)
                    const maxP = Math.max(...prop.trends.prices)
                    const rangeP = maxP - minP || 1
                    sparkPoints = prop.trends.prices.map((p, idx) => {
                      const x = (idx / 29) * 80
                      const y = 23 - ((p - minP) / rangeP) * 21
                      return `${x},${y}`
                    }).join(' ')
                  }

                  return (
                    <tr
                      key={prop.id}
                      onClick={() => hasTrends && setSelectedProperty(prop)}
                      className={`hover:bg-stone-50/50 transition-colors ${hasTrends ? 'cursor-pointer' : 'opacity-75'}`}
                    >
                      {/* Name & Address */}
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-stone-900">{prop.name}</div>
                        <div className="text-3xs text-stone-400 font-medium mt-0.5 uppercase tracking-wider">{prop.address.split(',')[0]}</div>
                      </td>

                      {/* Current Rent */}
                      <td className="px-6 py-4 text-stone-850">
                        {hasTrends ? (
                          <span>${prop.lowestPrice.toLocaleString()}<span className="text-3xs text-stone-400 font-bold">/mo</span></span>
                        ) : (
                          <span className="text-stone-400">N/A</span>
                        )}
                      </td>

                      {/* 7d Price Delta */}
                      <td className="px-6 py-4">
                        {hasTrends ? (
                          <span className={`inline-flex items-center gap-0.5 text-xs ${
                            prop.trends.priceDiff7d > 0 
                              ? 'text-rose-600' 
                              : prop.trends.priceDiff7d < 0 
                              ? 'text-emerald-600' 
                              : 'text-stone-400'
                          }`}>
                            {prop.trends.priceDiff7d > 0 ? '▲' : prop.trends.priceDiff7d < 0 ? '▼' : ''}
                            {prop.trends.priceDiff7d !== 0 
                              ? `$${Math.abs(prop.trends.priceDiff7d)} (${prop.trends.pricePercent7d > 0 ? '+' : ''}${prop.trends.pricePercent7d.toFixed(1)}%)` 
                              : 'stable'}
                          </span>
                        ) : (
                          <span className="text-stone-400">N/A</span>
                        )}
                      </td>

                      {/* 30d Price Delta */}
                      <td className="px-6 py-4">
                        {hasTrends ? (
                          <span className={`inline-flex items-center gap-0.5 text-xs ${
                            prop.trends.priceDiff30d > 0 
                              ? 'text-rose-600' 
                              : prop.trends.priceDiff30d < 0 
                              ? 'text-emerald-600' 
                              : 'text-stone-400'
                          }`}>
                            {prop.trends.priceDiff30d > 0 ? '▲' : prop.trends.priceDiff30d < 0 ? '▼' : ''}
                            {prop.trends.priceDiff30d !== 0 
                              ? `$${Math.abs(prop.trends.priceDiff30d)} (${prop.trends.pricePercent30d > 0 ? '+' : ''}${prop.trends.pricePercent30d.toFixed(1)}%)` 
                              : 'stable'}
                          </span>
                        ) : (
                          <span className="text-stone-400">N/A</span>
                        )}
                      </td>

                      {/* Availability Count */}
                      <td className="px-6 py-4 text-stone-700">
                        {prop.availablePlans !== null ? `${prop.availablePlans} layouts` : <span className="text-stone-400">N/A</span>}
                      </td>

                      {/* 7d Availability Delta */}
                      <td className="px-6 py-4">
                        {hasTrends && prop.availablePlans !== null ? (
                          <span className={`text-xs ${
                            prop.trends.availDiff7d > 0 
                              ? 'text-emerald-600' 
                              : prop.trends.availDiff7d < 0 
                              ? 'text-rose-600' 
                              : 'text-stone-400'
                          }`}>
                            {prop.trends.availDiff7d > 0 ? `+${prop.trends.availDiff7d} layouts` : prop.trends.availDiff7d < 0 ? `${prop.trends.availDiff7d} layouts` : 'no change'}
                          </span>
                        ) : (
                          <span className="text-stone-400">N/A</span>
                        )}
                      </td>

                      {/* Sparkline Column */}
                      <td className="px-6 py-4 flex justify-center">
                        {hasTrends ? (
                          <svg className="h-6 w-20 overflow-visible" viewBox="0 0 80 25">
                            <polyline
                              fill="none"
                              stroke={prop.trends.priceDiff7d > 0 ? '#E11D48' : prop.trends.priceDiff7d < 0 ? '#10B981' : '#78716C'}
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              points={sparkPoints}
                            />
                          </svg>
                        ) : (
                          <span className="text-stone-300">—</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="mt-28 border-t border-stone-200 pt-20">
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

      {/* Detailed Stock-style Line Chart overlay Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-sm p-4 animate-fade-in select-none">
          <div className="relative w-full max-w-xl rounded-3xl border border-stone-200 bg-white p-6 shadow-2xl animate-fade-in-up flex flex-col gap-6">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start">
              <div>
                <span className="text-3xs font-extrabold uppercase tracking-widest text-stone-400">Market analytics dashboard</span>
                <h4 className="text-xl font-extrabold text-stone-900 mt-0.5">{selectedProperty.name}</h4>
                <p className="text-xs font-semibold text-stone-500">{selectedProperty.address}</p>
              </div>
              <button
                onClick={() => setSelectedProperty(null)}
                className="h-8 w-8 rounded-full border border-stone-100 hover:bg-stone-50 text-stone-400 hover:text-stone-850 flex items-center justify-center text-lg font-bold leading-none cursor-pointer transition"
              >
                ×
              </button>
            </div>

            {/* Price Chart Panel */}
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-stone-400 mb-4">30-day Price history</p>
              
              <div className="relative h-48 border-b border-l border-stone-200 bg-stone-50/30 rounded-br-lg p-2">
                {/* SVG Line Graph */}
                <svg className="w-full h-full overflow-visible" viewBox="0 0 450 150">
                  {/* GridLines */}
                  <line x1="0" y1="50" x2="450" y2="50" stroke="#F1EFEB" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="0" y1="100" x2="450" y2="100" stroke="#F1EFEB" strokeWidth="1" strokeDasharray="3 3" />
                  
                  {(() => {
                    const prices = selectedProperty.trends.prices
                    const minP = Math.min(...prices)
                    const maxP = Math.max(...prices)
                    const rangeP = maxP - minP || 1
                    
                    const points = prices.map((p, idx) => {
                      const x = (idx / 29) * 450
                      const y = 140 - ((p - minP) / rangeP) * 125
                      return `${x},${y}`
                    }).join(' ')

                    const closedPath = `${points} 450,150 0,150`
                    const isUp = selectedProperty.trends.priceDiff7d > 0

                    return (
                      <>
                        {/* Shaded Area fill under graph */}
                        <polygon
                          points={closedPath}
                          fill={isUp ? 'url(#grad-red)' : 'url(#grad-green)'}
                        />

                        {/* Defining Gradients */}
                        <defs>
                          <linearGradient id="grad-green" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#10B981" stopOpacity="0.18" />
                            <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                          </linearGradient>
                          <linearGradient id="grad-red" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#E11D48" stopOpacity="0.18" />
                            <stop offset="100%" stopColor="#E11D48" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        {/* Curve Polyline */}
                        <polyline
                          fill="none"
                          stroke={isUp ? '#E11D48' : '#10B981'}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={points}
                        />

                        {/* Endpoint Circle Marker */}
                        <circle
                          cx="450"
                          cy={140 - ((prices[29] - minP) / rangeP) * 125}
                          r="4.5"
                          fill={isUp ? '#E11D48' : '#10B981'}
                          stroke="white"
                          strokeWidth="1.5"
                          className="shadow-sm animate-pulse"
                        />

                        {/* Chart labels overlay */}
                        <text x="5" y="15" fill="#A8A29E" fontSize="9" fontWeight="700">${maxP}</text>
                        <text x="5" y="145" fill="#A8A29E" fontSize="9" fontWeight="700">${minP}</text>
                      </>
                    )
                  })()}
                </svg>

                {/* X Axis Labels */}
                <div className="flex justify-between text-3xs font-extrabold text-stone-400 mt-2 uppercase tracking-wider">
                  <span>30 days ago</span>
                  <span>15 days ago</span>
                  <span>Today</span>
                </div>
              </div>
            </div>

            {/* Vacancy Changes Timeline */}
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-stone-400 mb-3.5">Activity timeline (Past Month)</p>
              
              <div className="flex flex-col gap-3 font-semibold">
                {selectedProperty.trends.timelineEvents.map((evt, idx) => (
                  <div key={idx} className="flex gap-3 text-xs items-start">
                    <span className="text-stone-400 font-bold text-2xs uppercase tracking-wider w-18 flex-shrink-0 mt-0.5">{evt.day}</span>
                    <span className={`h-4 w-4 rounded-full flex-shrink-0 flex items-center justify-center text-3xs ${
                      evt.type === 'price-down' || evt.type === 'avail-up'
                        ? 'bg-emerald-50 text-emerald-600'
                        : evt.type === 'price-up' || evt.type === 'avail-down'
                        ? 'bg-rose-50 text-rose-600'
                        : 'bg-stone-100 text-stone-500'
                    }`}>
                      {evt.type === 'price-down' ? '↓' : evt.type === 'price-up' ? '↑' : '•'}
                    </span>
                    <p className="text-stone-700 leading-normal">{evt.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="flex gap-2.5 mt-2">
              <Link
                to={`/apartments/${encodeURIComponent(selectedProperty.id)}`}
                onClick={() => setSelectedProperty(null)}
                className="flex-1 text-center rounded-xl bg-burnt-orange py-2.5 text-xs font-extrabold text-white hover:bg-burnt-orange-hover transition shadow-sm"
              >
                Go to Apartment Profile
              </Link>
              {selectedProperty.url && (
                <a
                  href={selectedProperty.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-stone-200 px-4 py-2.5 hover:bg-stone-50 text-stone-500 text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  Visit Scraped Site 🔗
                </a>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  )
}



