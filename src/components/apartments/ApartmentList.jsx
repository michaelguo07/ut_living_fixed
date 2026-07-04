import ApartmentCard from './ApartmentCard'

/**
 * @param {Object} props
 * @param {import('../../hooks/useAIAgent').Apartment[]} props.apartments
 * @param {string|null} props.hoveredId
 * @param {function} props.onHover
 */
export default function ApartmentList({ apartments, hoveredId, onHover }) {
  if (!apartments?.length) return null

  return (
    <div className="flex flex-col gap-3">
      {apartments.map((apt) => (
        <div key={apt.id} id={`card-${apt.id}`}>
          <ApartmentCard
            apartment={apt}
            onHover={onHover}
            highlighted={hoveredId === apt.id}
          />
        </div>
      ))}
    </div>
  )
}

