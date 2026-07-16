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
            ¡Desbloquea el Modo Premium!
          </h2>
          <p className="text-f1-silver text-sm leading-relaxed">
            Accede de inmediato a:
          </p>
          <ul className="text-f1-silver text-sm text-left space-y-1.5 max-w-xs mx-auto">
            <li className="flex items-center gap-2">
              <span className="text-f1-red">✓</span>
              Clasificaciones en vivo y estadísticas
            </li>
            <li className="flex items-center gap-2">
              <span className="text-f1-red">✓</span>
              Alertas instantáneas push del estado de pista
            </li>
            <li className="flex items-center gap-2">
              <span className="text-f1-red">✓</span>
              Experiencia totalmente libre de publicidad
            </li>
          </ul>
        </div>

        <button
          onClick={() => setProfile('Premium')}
          className="w-full px-6 py-3 rounded-xl bg-f1-red text-white font-bold text-sm tracking-wider hover:bg-f1-red/90 transition-colors cursor-pointer"
        >
          Adquirir Suscripción — Gratis
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
