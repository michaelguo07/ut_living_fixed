import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6 sm:py-32">
      <p className="text-sm font-semibold uppercase tracking-wider text-[#BF5700]">404 Error</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl">
        Page Not Found
      </h1>
      <p className="mt-4 text-lg text-stone-600">
        Sorry, we couldn’t find the page you’re looking for. It might have been moved or deleted.
      </p>
      <div className="mt-10 flex justify-center gap-4">
        <Link
          to="/"
          className="rounded-xl bg-[#BF5700] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#9E4600]"
        >
          Go back home
        </Link>
        <Link
          to="/search"
          className="rounded-xl border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
        >
          Search apartments
        </Link>
      </div>
    </div>
  )
}
