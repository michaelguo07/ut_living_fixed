import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getFloorPlansForProperty } from '../../data/floorPlans'

/**
 * Redesigned Apartment Card matching Google Flights ticket design.
 * Features a mini-carousel of building & floor plan images, scan-grids for pros/cons, and hover-sync classes.
 * 
 * @param {Object} props
 * @param {import('../../hooks/useAIAgent').Apartment} props.apartment
 * @param {function} [props.onHover]
 * @param {boolean} [props.highlighted]
 */
export default function ApartmentCard({ apartment, onHover, highlighted = false }) {
  const navigate = useNavigate()
  const { id, name, address, cost, distanceFromTower, availability, pros = [], cons = [], imageUrl } = apartment

  // Collect all available images (exterior + floor plan drawings) for the carousel
  const floorPlans = getFloorPlansForProperty(name)
  const planImages = floorPlans.map((p) => p.imagePath).filter(Boolean)
  const images = [imageUrl, ...planImages].filter(Boolean)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleNextImage = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrevImage = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleCardClick = (e) => {
    // Prevent navigating if clicking buttons or links (carousel navigation, dot buttons, plans link)
    if (e.target.closest('button') || e.target.closest('a')) {
      return
    }
    navigate(`/apartments/${encodeURIComponent(id)}`)
  }

  // Parse numeric pricing for bold display
  const priceMatch = cost ? cost.match(/\$([0-9,]+)/) : null
  const boldPrice = priceMatch ? `$${priceMatch[1]}` : null

  return (
    <article
      onClick={handleCardClick}
      onMouseEnter={() => onHover && onHover(id)}
      onMouseLeave={() => onHover && onHover(null)}
      className={`flex flex-col md:flex-row gap-5 p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
        highlighted
          ? 'border-burnt-orange ring-2 ring-burnt-orange/10 bg-burnt-orange-light/10 shadow-md'
          : 'border-stone-200 bg-white hover:border-stone-300 hover:shadow-md'
      }`}
    >
      {/* 1. Left Thumbnail/Carousel Section */}
      <div className="relative w-full md:w-44 h-32 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 group">
        {images.length > 0 ? (
          <>
            <img
              src={images[currentImageIndex]}
              alt={`${name} preview ${currentImageIndex + 1}`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-103"
              loading="lazy"
            />
            {/* Carousel navigation controls (only show on hover if multiple images) */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-1.5 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-sm opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-105 transition"
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-sm opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-105 transition"
                  aria-label="Next image"
                >
                  ›
                </button>
                {/* Dots indicator */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1 px-1.5 py-0.5 rounded-full bg-stone-900/40 backdrop-blur-3xs">
                  {images.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-1 w-1 rounded-full ${
                        idx === currentImageIndex ? 'bg-white w-2' : 'bg-white/50'
                      } transition-all`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-stone-100 text-stone-400 text-xs">
            No image available
          </div>
        )}
      </div>

      {/* 2. Middle Content Section (Details & Pros/Cons) */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <h3 className="text-lg font-bold text-stone-900 truncate">
            <Link
              to={`/apartments/${encodeURIComponent(id)}`}
              className="hover:text-burnt-orange transition-colors"
            >
              {name}
            </Link>
          </h3>
          {address && <p className="text-xs text-stone-500 truncate mt-0.5">{address}</p>}
        </div>

        {/* Structured scan-grid for Pros & Cons (No standard bullets) */}
        {(pros.length > 0 || cons.length > 0) && (
          <div className="mt-2.5 grid gap-x-4 gap-y-1 sm:grid-cols-2 text-xs">
            {/* Pros with green checks */}
            {pros.slice(0, 2).map((p, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-stone-600">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 flex-shrink-0 mt-0.5">
                  <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="truncate">{p}</span>
              </div>
            ))}
            
            {/* Cons with soft gray crosses */}
            {cons.slice(0, 2).map((c, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-stone-500">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-stone-100 text-stone-500 flex-shrink-0 mt-0.5">
                  <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
                <span className="truncate">{c}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Right Section (Flight Ticket Pricing Style & Tag Badges) */}
      <div className="flex flex-col justify-between items-end min-w-[140px] text-right border-t md:border-t-0 md:border-l border-stone-100 pt-3 md:pt-0 md:pl-5">
        <div>
          {boldPrice ? (
            <div className="text-xl font-extrabold text-stone-900">
              {boldPrice}
              <span className="text-xs font-semibold text-stone-500 ml-0.5">/mo</span>
            </div>
          ) : (
            <div className="text-sm font-bold text-stone-400">N/A</div>
          )}
          <span className="block text-2xs font-bold text-stone-400 mt-0.5 uppercase tracking-wider">
            lowest rate
          </span>
        </div>

        {/* Pill tags stacked beautifully */}
        <div className="flex flex-wrap md:flex-col items-end gap-1.5 mt-3 md:mt-0 w-full justify-end">
          {distanceFromTower && (
            <span className="rounded-full bg-stone-100 px-2 py-0.5 text-3xs font-semibold text-stone-600 inline-block">
              📍 {distanceFromTower.split('(')[0].trim()}
            </span>
          )}
          {availability && availability !== 'N/A' && !availability.toLowerCase().includes('0 plans') ? (
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-3xs font-bold text-emerald-700 inline-block">
              ✓ {availability.replace(' available', '')}
            </span>
          ) : (
            <span className="rounded-full bg-stone-100 px-2 py-0.5 text-3xs font-bold text-stone-500 inline-block">
              Availability: N/A
            </span>
          )}
          <Link
            to={`/apartments/${encodeURIComponent(id)}`}
            className="rounded-full bg-burnt-orange-light hover:bg-burnt-orange/10 px-3 py-1 text-3xs font-bold text-burnt-orange transition-colors inline-block text-center mt-1"
          >
            View Plans →
          </Link>
        </div>
      </div>
    </article>
  )
}

