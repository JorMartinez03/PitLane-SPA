import { Link, useNavigate } from 'react-router-dom'
import useCalendar from '../hooks/useCalendar.js'
import CategoryNav from './CategoryNav.jsx'
import Hero from './Hero.jsx'
import CalendarGrid from './CalendarGrid.jsx'

const MAIN_CATEGORIES = ['F1', 'F2', 'F3']
const EXTRA_CATEGORIES = ['IndyCar', 'NASCAR', 'WEC', 'MotoGP']

function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 bg-f1-carbon rounded-xl w-64 mx-auto" />
      <div className="h-40 bg-f1-carbon rounded-2xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-36 bg-f1-carbon rounded-xl" />
        ))}
      </div>
    </div>
  )
}

export default function F1Dashboard({ category }) {
  const navigate = useNavigate()
  const {
    races,
    loading,
    activeCategory,
    setActiveCategory,
    nextRace,
  } = useCalendar(category)

  const handleCategorySelect = (cat) => {
    setActiveCategory(cat)
    navigate(`/calendar/${cat}`)
  }

  const isMainCategory = MAIN_CATEGORIES.includes(activeCategory)

  return (
    <div className="min-h-screen bg-f1-black">
      <header className="border-b border-f1-gray/50 bg-f1-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-f1-red flex items-center justify-center text-white text-xs font-extrabold">
                PL
              </span>
              <h1 className="text-white font-bold text-lg tracking-tight">
                PitLane
                <span className="text-f1-silver font-normal text-sm ml-2 hidden sm:inline">
                  Calendario de Carreras
                </span>
              </h1>
            </Link>
          </div>
          <Link
            to="/"
            className="text-f1-silver hover:text-white transition-colors text-sm font-medium"
          >
            &larr; Categorías
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-10">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {isMainCategory ? (
              <CategoryNav
                activeCategory={activeCategory}
                onSelect={handleCategorySelect}
              />
            ) : (
              <CategoryNav
                categories={EXTRA_CATEGORIES}
                activeCategory={activeCategory}
                onSelect={handleCategorySelect}
              />
            )}

            <Hero race={nextRace} />

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-white text-xl font-bold">
                  Calendario {activeCategory}
                </h2>
                <span className="text-f1-silver text-sm font-medium">
                  {races.length} carrera{races.length !== 1 ? 's' : ''}
                </span>
              </div>
              <CalendarGrid races={races} nextRace={nextRace} />
            </section>
          </>
        )}
      </main>

      <footer className="border-t border-f1-gray/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-f1-silver text-xs font-medium">
          <p>
            PitLane &mdash; Fase Alpha &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  )
}
