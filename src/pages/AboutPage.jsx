const TEAM = [
  { name: 'Timothy Shim', instagram: 'shim.timothy' },
  { name: 'Michael Guo', instagram: 'guobropro' },
  { name: 'Akshar Perugu', instagram: 'akshar_perugu' },
  { name: 'Sambit Kanjilal', instagram: 'sambitkanjilal' },
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
              className="flex items-center justify-between gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#BF5700] text-sm font-semibold text-white">
                  {member.name.charAt(0)}
                </span>
                <span className="font-medium text-stone-800">{member.name}</span>
              </div>
              {member.instagram && (
                <a
                  href={`https://instagram.com/${member.instagram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-stone-500 hover:text-[#BF5700] transition-colors"
                >
                  <svg
                    className="h-4 w-4 fill-current text-stone-400 hover:text-[#BF5700] transition-colors"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.225.058h.345c2.511 0 2.843-.011 3.851-.058.975-.045 1.504-.207 1.857-.344.466-.182.8-.399 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.225v-.345c0-2.511-.011-2.843-.058-3.851-.045-.975-.207-1.504-.344-1.857a3.83 3.83 0 00-.748-1.15 3.83 3.83 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 1.802a3.333 3.333 0 110 6.666 3.333 3.333 0 010-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden sm:inline">@{member.instagram}</span>
                </a>
              )}
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
