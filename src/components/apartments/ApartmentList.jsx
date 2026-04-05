import ApartmentCard from './ApartmentCard'

/**
 * @param {Object} props
 * @param {import('../../hooks/useAIAgent').Apartment[]} props.apartments
 */
export default function ApartmentList({ apartments }) {
  if (!apartments?.length) return null

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
      {apartments.map((apt) => (
        <li key={apt.id}>
          <ApartmentCard apartment={apt} />
        </li>
      ))}
    </ul>
  )
}
