import { Link } from 'react-router-dom'
import CategoryCard from '../components/CategoryCard.jsx'
import UserLoginPanel from '../components/UserLoginPanel.jsx'
import MetaAdsBanner from '../components/MetaAdsBanner.jsx'
import CountdownTimer from '../components/CountdownTimer.jsx'
import races from '../data/races.js'

function getRaceCount(category) {
  return races.filter((r) => r.category === category).length
}

const MAIN_CATEGORIES = [
  { category: 'F1', label: 'Fórmula 1' },
  { category: 'F2', label: 'Fórmula 2' },
  { category: 'F3', label: 'Fórmula 3' },
]

function getNextRace() {
  const now = new Date()
  const upcoming = races
    .filter((r) => new Date(r.date) > now && (r.category === 'F1' || r.category === 'F2' || r.category === 'F3'))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
  return upcoming[0] || null
}

export default function HomePage() {
  const nextRace = getNextRace()

  return (
    <div className="min-h-screen bg-f1-black pb-20">
      <header className="border-b border-f1-gray/50 bg-f1-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-lg bg-f1-red flex items-center justify-center text-white text-sm font-extrabold">
              PL
            </span>
            <div>
              <h1 className="text-white font-bold text-xl tracking-tight">
                PitLane
              </h1>
              <p className="text-f1-silver text-xs font-medium -mt-0.5">
                Calendario de Carreras
              </p>
            </div>
          </div>
          <UserLoginPanel />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {nextRace && (
          <section className="relative overflow-hidden rounded-2xl border-t-4 border-f1-red bg-gradient-to-br from-f1-carbon via-f1-carbon to-f1-black p-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-f1-red/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative space-y-3">
              <p className="text-f1-red text-xs font-semibold tracking-[0.2em] uppercase">
                Próxima Carrera
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                {nextRace.name}
              </h2>
              <p className="text-f1-silver text-sm font-medium">
                {nextRace.circuit} — {nextRace.category}
              </p>
              <div className="pt-2">
                <CountdownTimer targetDate={nextRace.date} />
              </div>
            </div>
          </section>
        )}

        <section className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Elige tu{' '}
            <span className="text-f1-red">categoría</span>
          </h2>
          <p className="text-f1-silver text-base max-w-md mx-auto">
            Calendarios reales de la temporada 2026 con clasificaciones actualizadas
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-f1-red" />
            <h3 className="text-f1-silver text-xs font-semibold uppercase tracking-widest">
              Categorías Principales
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MAIN_CATEGORIES.map(({ category, label }) => (
              <CategoryCard
                key={category}
                category={category}
                label={label}
                raceCount={getRaceCount(category)}
              />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-f1-silver" />
            <h3 className="text-f1-silver text-xs font-semibold uppercase tracking-widest">
              Otras Series
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link
              to="/extras"
              className={`
                group relative overflow-hidden rounded-2xl
                bg-gradient-to-br from-f1-carbon to-f1-gray
                p-8 transition-all duration-300 ease-out
                hover:-translate-y-1 hover:shadow-xl hover:shadow-white/5
                cursor-pointer border border-f1-gray/30
              `}
            >
              <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/5 rounded-full blur-xl transition-transform duration-300 group-hover:scale-150" />
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/5 rounded-full blur-xl" />

              <div className="relative">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="px-2 py-0.5 rounded bg-white/10 text-white/70 text-[10px] font-bold uppercase tracking-wider">
                    IndyCar
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/10 text-white/70 text-[10px] font-bold uppercase tracking-wider">
                    NASCAR
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/10 text-white/70 text-[10px] font-bold uppercase tracking-wider">
                    WEC
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/10 text-white/70 text-[10px] font-bold uppercase tracking-wider">
                    MotoGP
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Más Categorías
                </h3>
                <p className="text-white/50 text-sm font-medium mt-1">
                  IndyCar, NASCAR, WEC, MotoGP y más
                </p>
              </div>

              <div className="relative mt-6 flex items-center gap-1 text-white/40 text-sm font-medium group-hover:text-white/70 transition-colors">
                <span>Explorar series</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
              </div>
            </Link>
          </div>
        </section>

        <MetaAdsBanner />
      </main>

      <footer className="border-t border-f1-gray/50 mt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-f1-silver text-xs font-medium">
          <p>
            PitLane &mdash; Temporada 2026 &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-f1-black/95 backdrop-blur-md border-t border-f1-gray/50">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-around">
          <Link
            to="/"
            className="flex flex-col items-center gap-1 text-f1-red min-w-[60px]"
          >
            <span className="text-lg">📅</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider">Calendario</span>
          </Link>
          <Link
            to="/clasificaciones/F1"
            className="flex flex-col items-center gap-1 text-f1-silver hover:text-f1-red transition-colors min-w-[60px]"
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
  )
}
