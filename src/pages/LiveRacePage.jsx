import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute.jsx'
import UserLoginPanel from '../components/UserLoginPanel.jsx'
import LiveRaceBanner from '../components/LiveRaceBanner.jsx'
import LivePositionsTable from '../components/LivePositionsTable.jsx'
import NotificationSettings from '../components/NotificationSettings.jsx'
import { useLiveRaceContext } from '../context/LiveRaceContext.jsx'

const ALL_CATEGORIES = [
  { key: 'F1', label: 'F1' },
  { key: 'F2', label: 'F2' },
  { key: 'F3', label: 'F3' },
  { key: 'IndyCar', label: 'IndyCar' },
  { key: 'NASCAR', label: 'NASCAR' },
  { key: 'WEC', label: 'WEC' },
  { key: 'MotoGP', label: 'MotoGP' },
]

export default function LiveRacePage() {
  const { isLive, startLive, stopLive, activeCategory } = useLiveRaceContext()
  const [selectedCategory, setSelectedCategory] = useState(activeCategory || 'F1')

  const handleStart = () => {
    startLive(selectedCategory)
  }

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
                  Minuto a Minuto
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
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Carrera en{' '}
              <span className="text-f1-red">Vivo</span>
            </h2>
            <p className="text-f1-silver text-sm">
              Selecciona una categoría y simula la carrera en tiempo real
            </p>
          </section>

          <nav className="flex flex-wrap justify-center gap-1.5 p-1.5 rounded-xl bg-f1-carbon border border-f1-gray/50">
            {ALL_CATEGORIES.map(({ key, label }) => {
              const isActive = selectedCategory === key
              return (
                <button
                  key={key}
                  onClick={() => {
                    if (!isLive) setSelectedCategory(key)
                  }}
                  disabled={isLive}
                  className={`
                    px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap
                    ${isLive ? 'cursor-default' : 'cursor-pointer'}
                    ${isActive
                      ? 'text-white bg-f1-red shadow-lg shadow-f1-red/30'
                      : isLive
                        ? 'text-f1-silver/40'
                        : 'text-f1-silver hover:text-white hover:bg-white/5'}
                  `}
                >
                  {label}
                </button>
              )
            })}
          </nav>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-white text-lg font-bold">
                {ALL_CATEGORIES.find((c) => c.key === selectedCategory)?.label || selectedCategory}
                {isLive && (
                  <span className="ml-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-600/20 text-green-400 text-xs font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    EN VIVO
                  </span>
                )}
              </h3>
            </div>

            <div>
              {!isLive ? (
                <button
                  onClick={handleStart}
                  className="px-5 py-2.5 rounded-xl bg-green-600 text-white text-sm font-bold hover:bg-green-700 transition-colors cursor-pointer"
                >
                  Simular Carrera
                </button>
              ) : (
                <button
                  onClick={stopLive}
                  className="px-5 py-2.5 rounded-xl bg-f1-red text-white text-sm font-bold hover:bg-f1-red/90 transition-colors cursor-pointer"
                >
                  Detener
                </button>
              )}
            </div>
          </div>

          <LiveRaceBanner />

          {isLive ? (
            <section className="space-y-4">
              <h3 className="text-white text-lg font-bold">
                Posiciones en Vivo
              </h3>
              <LivePositionsTable />
            </section>
          ) : (
            <div className="text-center py-20 bg-f1-carbon/30 rounded-2xl border border-f1-gray/20">
              <p className="text-f1-silver text-lg font-medium">
                No hay carrera en curso
              </p>
              <p className="text-f1-silver/50 text-sm mt-2">
                Selecciona una categoría y presiona "Simular Carrera"
              </p>
            </div>
          )}

          <section className="bg-f1-carbon/30 rounded-2xl border border-f1-gray/20 p-6">
            <NotificationSettings />
          </section>
        </main>

        <footer className="border-t border-f1-gray/50 mt-12 pb-16">
          <div className="max-w-7xl mx-auto px-4 py-6 text-center text-f1-silver text-xs font-medium">
            <p>
              PitLane &mdash; Minuto a Minuto &copy; {new Date().getFullYear()}
            </p>
          </div>
        </footer>

        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-f1-black/95 backdrop-blur-md border-t border-f1-gray/50">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-around">
            <Link
              to={`/calendar/${selectedCategory}`}
              className="flex flex-col items-center gap-1 text-f1-silver hover:text-f1-red transition-colors min-w-[60px]"
            >
              <span className="text-lg">📅</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider">Calendario</span>
            </Link>
            <Link
              to={`/clasificaciones/${selectedCategory}`}
              className="flex flex-col items-center gap-1 text-f1-silver hover:text-f1-red transition-colors min-w-[60px]"
            >
              <span className="text-lg">🏆</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider">Posiciones</span>
            </Link>
            <Link
              to="/en-vivo"
              className="flex flex-col items-center gap-1 text-f1-red min-w-[60px]"
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
