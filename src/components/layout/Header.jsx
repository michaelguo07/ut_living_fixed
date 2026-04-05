import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold text-stone-900 transition hover:text-[#BF5700]"
        >
          <span className="text-xl">UT Living</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-stone-600 transition hover:text-[#BF5700]"
          >
            Home
          </Link>
          <Link
            to="/search"
            className="text-sm font-medium text-stone-600 transition hover:text-[#BF5700]"
          >
            Find Apartments
          </Link>
          <Link
            to="/compare"
            className="text-sm font-medium text-stone-600 transition hover:text-[#BF5700]"
          >
            Compare Floor Plans
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-stone-600 transition hover:text-[#BF5700]"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  )
}
