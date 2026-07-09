import { Link } from 'react-router-dom'
import CategoryCard from '../components/CategoryCard.jsx'
import UserLoginPanel from '../components/UserLoginPanel.jsx'
import races from '../data/races.js'

function getRaceCount(category) {
  return races.filter((r) => r.category === category).length
}

const EXTRA_CATEGORIES = [
  { category: 'IndyCar', label: 'IndyCar Series', gradient: 'from-indigo-500 to-indigo-700' },
  { category: 'NASCAR', label: 'NASCAR Cup Series', gradient: 'from-amber-500 to-amber-700' },
  { category: 'WEC', label: 'World Endurance Championship', gradient: 'from-purple-500 to-purple-700' },
  { category: 'MotoGP', label: 'MotoGP World Championship', gradient: 'from-orange-500 to-orange-700' },
]

export default function ExtrasPage() {
  return (
    <div className="min-h-screen bg-f1-black">
      <header className="border-b border-f1-gray/50 bg-f1-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-f1-red flex items-center justify-center text-white text-sm font-extrabold">
                PL
              </span>
              <div>
                <h1 className="text-white font-bold text-xl tracking-tight">
                  PitLane
                </h1>
                <p className="text-f1-silver text-xs font-medium -mt-0.5">
                  Otras Series
                </p>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <UserLoginPanel />
            <Link
              to="/"
              className="text-f1-silver hover:text-white transition-colors text-sm font-medium"
            >
              &larr; Categorías
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 space-y-10">
        <section className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Otras{' '}
            <span className="text-f1-red">Series</span>
          </h2>
          <p className="text-f1-silver text-base max-w-md mx-auto">
            Calendarios completos de categorías adicionales
          </p>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {EXTRA_CATEGORIES.map(({ category, label, gradient }) => (
            <CategoryCard
              key={category}
              category={category}
              label={label}
              gradient={gradient}
              raceCount={getRaceCount(category)}
            />
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-f1-silver hover:text-white transition-colors text-sm font-medium"
          >
            <span>&larr;</span>
            <span>Volver a categorías principales</span>
          </Link>
        </div>
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
