import { useAuth } from '../context/AuthContext.jsx'

export default function Paywall({ onBack }) {
  const { setProfile } = useAuth()

  return (
    <section className="flex items-center justify-center min-h-[60vh] px-4">
      <article className="max-w-md w-full bg-f1-carbon rounded-2xl border border-f1-gray/50 p-8 text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-f1-red/20 flex items-center justify-center">
          <span className="text-3xl">🔒</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-white">
            Contenido Premium
          </h2>
          <p className="text-f1-silver text-sm leading-relaxed">
            Las tablas de clasificaciones detalladas están disponibles
            exclusivamente para suscriptores Premium.
          </p>
        </div>

        <button
          onClick={() => setProfile('Premium')}
          className="w-full px-6 py-3 rounded-xl bg-f1-red text-white font-bold text-sm tracking-wider hover:bg-f1-red/90 transition-colors cursor-pointer"
        >
          Actualizar a Premium — Gratis
        </button>

        <button
          onClick={onBack}
          className="w-full px-6 py-3 rounded-xl border border-f1-gray text-f1-silver font-medium text-sm hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
        >
          Volver al Calendario
        </button>

        <p className="text-f1-silver/50 text-xs">
          Modo simulación — sin cargo real
        </p>
      </article>
    </section>
  )
}
