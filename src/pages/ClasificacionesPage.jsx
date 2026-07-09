import { useParams, Link } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute.jsx'
import UserLoginPanel from '../components/UserLoginPanel.jsx'
import ClasificacionesTable from '../components/ClasificacionesTable.jsx'

export default function ClasificacionesPage() {
  const { category } = useParams()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-f1-black">
        <header className="border-b border-f1-gray/50 bg-f1-black/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-f1-red flex items-center justify-center text-white text-sm font-extrabold">
                  PL
                </span>
                <h1 className="text-white font-bold text-xl tracking-tight">
                  Clasificaciones
                </h1>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <UserLoginPanel />
              <Link
                to={`/calendar/${category}`}
                className="text-f1-silver hover:text-white transition-colors text-sm font-medium"
              >
                &larr; Calendario
              </Link>
              <Link
                to="/"
                className="text-f1-silver hover:text-white transition-colors text-sm font-medium"
              >
                &larr; Categorías
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
          <section className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Clasificación{' '}
              <span className="text-f1-red">{category}</span>
            </h2>
            <p className="text-f1-silver text-sm">
              Posiciones actuales de la temporada 2026
            </p>
          </section>

          <ClasificacionesTable category={category} />
        </main>

        <footer className="border-t border-f1-gray/50 mt-12">
          <div className="max-w-7xl mx-auto px-4 py-6 text-center text-f1-silver text-xs font-medium">
            <p>
              PitLane &mdash; Fase Alpha &copy; {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </div>
    </ProtectedRoute>
  )
}
