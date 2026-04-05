import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CampusSearch({ defaultValue = '', onSearch, compact = false }) {
  const [campus, setCampus] = useState(defaultValue)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = campus.trim()
    if (onSearch) {
      onSearch(trimmed)
    } else {
      navigate(`/search?campus=${encodeURIComponent(trimmed)}`)
    }
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={campus}
          onChange={(e) => setCampus(e.target.value)}
          placeholder="e.g. UT Austin"
          className="flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-[#BF5700] focus:ring-1 focus:ring-[#BF5700]"
        />
        <button
          type="submit"
          className="rounded-lg bg-[#BF5700] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#9E4600]"
        >
          Search
        </button>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={campus}
          onChange={(e) => setCampus(e.target.value)}
          placeholder="Enter your college or campus name (e.g. UT Austin)"
          className="flex-1 rounded-xl border border-stone-300 px-4 py-3 text-base outline-none focus:border-[#BF5700] focus:ring-2 focus:ring-[#BF5700]/20"
        />
        <button
          type="submit"
          className="rounded-xl bg-[#BF5700] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#9E4600]"
        >
          Find Apartments
        </button>
      </div>
    </form>
  )
}
