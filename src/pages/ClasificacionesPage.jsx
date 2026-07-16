import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute.jsx'
import UserLoginPanel from '../components/UserLoginPanel.jsx'
import ClasificacionesTable from '../components/ClasificacionesTable.jsx'
import LiveRaceBanner from '../components/LiveRaceBanner.jsx'

const ALL_CATEGORIES = [
  { key: 'F1', label: 'Fórmula 1', color: 'bg-f1-red' },
  { key: 'F2', label: 'Fórmula 2', color: 'bg-f1-red' },
  { key: 'F3', label: 'Fórmula 3', color: 'bg-f1-red' },
  { key: 'IndyCar', label: 'IndyCar', color: 'bg-indigo-500' },
  { key: 'NASCAR', label: 'NASCAR', color: 'bg-amber-500' },
  { key: 'WEC', label: 'WEC', color: 'bg-purple-500' },
  { key: 'MotoGP', label: 'MotoGP', color: 'bg-orange-500' },
]

const CATEGORY_DESCRIPTIONS = {
  F1: 'Campeonato Mundial de Fórmula 1',
  F2: 'FIA Formula 2 Championship',
  F3: 'FIA Formula 3 Championship',
  IndyCar: 'IndyCar Series',
  NASCAR: 'NASCAR Cup Series',
  WEC: 'World Endurance Championship',
  MotoGP: 'MotoGP World Championship',
}

export default function ClasificacionesPage() {
  const { category: urlCategory } = useParams()
  const [activeCategory, setActiveCategory] = useState(urlCategory || 'F1')

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-f1-black pb-20">
        <header className="border-b border-f1-gray/50 bg-f1-black/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-f1-red flex items-center justify-center text-white text-xs font-extrabold">
                  PL
                </span>
                <h1 className="text-white font-bold text-lg tracking-tight">
                  Clasificaciones
                </h1>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <UserLoginPanel />
              <Link
                to="/"
                className="text-f1-silver hover:text-white transition-colors text-sm font-medium hidden sm:inline"
              >
                &larr; Inicio
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
          <section className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Campeonatos{' '}
              <span className="text-f1-red">2026</span>
            </h2>
            <p className="text-f1-silver text-sm">
              Posiciones actuales de todas las categorías de automovilismo
            </p>
          </section>

          <LiveRaceBanner />

          <nav className="flex flex-wrap justify-center gap-1.5 p-1.5 rounded-xl bg-f1-carbon border border-f1-gray/50">
            {ALL_CATEGORIES.map(({ key, label }) => {
              const isActive = activeCategory === key
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`
                    px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap
                    ${isActive
                      ? 'text-white bg-f1-red shadow-lg shadow-f1-red/30'
                      : 'text-f1-silver hover:text-white hover:bg-white/5'}
                  `}
                >
                  {label}
                </button>
              )
            })}
          </nav>

          <section className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-white text-lg font-bold">
                {ALL_CATEGORIES.find((c) => c.key === activeCategory)?.label || activeCategory}
              </h3>
              <span className="text-f1-silver text-xs font-medium">
                {CATEGORY_DESCRIPTIONS[activeCategory] || ''}
              </span>
            </div>
            <ClasificacionesTable category={activeCategory} />
          </section>
        </main>

        <footer className="border-t border-f1-gray/50 mt-12 pb-16">
          <div className="max-w-7xl mx-auto px-4 py-6 text-center text-f1-silver text-xs font-medium">
            <p>
              PitLane &mdash; Fase Alpha &copy; {new Date().getFullYear()}
            </p>
          </div>
        </footer>

        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-f1-black/95 backdrop-blur-md border-t border-f1-gray/50">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-around">
            <Link
              to={`/calendar/${activeCategory}`}
              className="flex flex-col items-center gap-1 text-f1-silver hover:text-f1-red transition-colors min-w-[60px]"
            >
              <span className="text-lg">📅</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider">Calendario</span>
            </Link>
            <Link
              to={`/clasificaciones/${activeCategory}`}
              className="flex flex-col items-center gap-1 text-f1-red min-w-[60px]"
            >
              <span className="text-lg">🏆</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider">Posiciones</span>
            </Link>
            <Link
              to="/en-vivo"
              className="flex flex-col items-center gap-1 text-f1-silver hover:text-f1-red transition-colors min-w-[60px]"
            >
              <span className="text-lg">🔴</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider">En Vivo</span>
            </Link>
            <Link
              to="/extras"
              className="flex flex-col items-center gap-1 text-f1-silver hover:text-f1-red transition-colors min-w-[60px]"
            >
              <span className="text-lg">🏁</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider">Series</span>
            </Link>
          </div>
        </nav>
      </div>
    </ProtectedRoute>
  )
}
