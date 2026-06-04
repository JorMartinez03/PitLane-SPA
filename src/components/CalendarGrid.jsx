import RaceCard from './RaceCard.jsx'

export default function CalendarGrid({ races, nextRace }) {
  if (!races.length) {
    return (
      <div className="text-center py-20">
        <p className="text-f1-silver text-lg font-medium">
          No hay carreras disponibles para esta categoría.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {races.map((race) => (
        <RaceCard key={race.id} race={race} />
      ))}
    </div>
  )
}
