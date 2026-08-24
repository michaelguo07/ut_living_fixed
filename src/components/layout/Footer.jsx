import { Link } from 'react-router-dom'
import { LAST_UPDATED } from '../../data/apartments'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Link to="/" className="font-semibold text-stone-800">
            UT Living
          </Link>
          <div className="flex gap-6">
            <Link to="/" className="text-sm text-stone-600 hover:text-[#BF5700]">
              Home
            </Link>
            <Link to="/search" className="text-sm text-stone-600 hover:text-[#BF5700]">
              Find Apartments
            </Link>
            <Link to="/compare" className="text-sm text-stone-600 hover:text-[#BF5700]">
              Compare Floor Plans
            </Link>
            <Link to="/about" className="text-sm text-stone-600 hover:text-[#BF5700]">
              About
            </Link>
          </div>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500">
          <p>Helping Longhorns find apartments near UT Austin. Built by students.</p>
          {LAST_UPDATED && (
            <p className="font-medium text-stone-400">
              Prices & availability last updated: <span className="text-stone-600 font-semibold">{LAST_UPDATED}</span>
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}
