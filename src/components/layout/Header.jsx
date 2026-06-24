import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/search', label: 'Find Apartments' },
    { to: '/compare', label: 'Compare Floor Plans' },
    { to: '/about', label: 'About' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2 font-semibold text-stone-900 transition hover:text-[#BF5700]"
        >
          <span className="text-xl font-bold tracking-tight">UT Living</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors ${
                isActive(link.to)
                  ? 'text-[#BF5700]'
                  : 'text-stone-600 hover:text-[#BF5700]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-stone-500 hover:bg-stone-100 hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#BF5700]/40 md:hidden"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-b border-stone-200 bg-white" id="mobile-menu">
          <nav className="space-y-1 px-4 pb-4 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`block rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                  isActive(link.to)
                    ? 'bg-amber-50 text-[#BF5700]'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

