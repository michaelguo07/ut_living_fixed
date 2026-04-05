const TEAM = [
  { name: 'Timothy Shim' },
  { name: 'Michael Guo' },
  { name: 'Akshar Perugu' },
  { name: 'Sambit Kanjilal' },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
      <h1 className="text-4xl font-bold tracking-tight text-stone-900">
        About Us
      </h1>
      <p className="mt-6 text-lg text-stone-600">
        We’re four students at the University of Texas at Austin. We built UT Living to help
        students find off-campus apartments near their campus—with availability, cost, distance,
        and pros and cons in one place.
      </p>
      <p className="mt-4 text-lg text-stone-600">
        UT Living is backed by a $2 million pre-seed valuation as we work to expand the platform
        to campuses across the country.
      </p>
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-stone-900">The team</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {TEAM.map((member) => (
            <li
              key={member.name}
              className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 shadow-sm"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#BF5700] text-sm font-semibold text-white">
                {member.name.charAt(0)}
              </span>
              <span className="font-medium text-stone-800">{member.name}</span>
            </li>
          ))}
        </ul>
      </section>
      <p className="mt-10 text-sm text-stone-500">
        Hook ’em Horns. 🤘
      </p>
    </div>
  )
}
