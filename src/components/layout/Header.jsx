import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useFavorites } from '../../context/FavoritesContext'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { favoriteIds } = useFavorites()

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/search', label: 'Find Apartments' },
    { to: '/compare', label: 'Compare Floor Plans' },
    { to: '/about', label: 'About' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 transition hover:opacity-90"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-burnt-orange text-white font-bold text-lg shadow-sm">
              UT
            </div>
            <span className="text-xl font-bold tracking-tight text-stone-900">
              Living
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.to)
              const isCompare = link.to === '/compare'
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-burnt-orange-light text-burnt-orange'
                      : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                  }`}
                >
                  {link.label}
                  {isCompare && favoriteIds.length > 0 && (
                    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-burnt-orange px-1.5 text-xs font-semibold text-white">
                      {favoriteIds.length}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Right Action Icons (Googley avatar style) */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/compare"
            className="relative p-2 text-stone-500 hover:text-burnt-orange transition-colors"
            title="Saved Apartments"
          >
            <svg
              className="h-6 w-6"
              fill={favoriteIds.length > 0 ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
            {favoriteIds.length > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-burnt-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-burnt-orange"></span>
              </span>
            )}
          </Link>
          <div className="h-8 w-8 rounded-full bg-stone-200 border border-stone-300 flex items-center justify-center font-bold text-xs text-stone-700 cursor-pointer hover:bg-stone-300 transition-colors" title="Longhorn Profile">
            LH
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-stone-500 hover:bg-stone-100 hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-burnt-orange/40 md:hidden"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-b border-stone-200 bg-white" id="mobile-menu">
          <nav className="space-y-1 px-4 pb-4 pt-2">
            {navLinks.map((link) => {
              const active = isActive(link.to)
              const isCompare = link.to === '/compare'
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-base font-semibold transition-colors ${
                    active
                      ? 'bg-burnt-orange-light text-burnt-orange'
                      : 'text-stone-600 hover:bg-stone-50 hover:text-stone-950'
                  }`}
                >
                  <span>{link.label}</span>
                  {isCompare && favoriteIds.length > 0 && (
                    <span className="rounded-full bg-burnt-orange px-2.5 py-0.5 text-xs font-bold text-white">
                      {favoriteIds.length}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}


