import useNotifications from '../hooks/useNotifications.js'

const ALERT_OPTIONS = [
  {
    key: 'raceStart',
    label: 'Inicio de Sesiones',
    desc: 'Alerta cuando comience una sesión de pista',
  },
  {
    key: 'redFlags',
    label: 'Banderas Rojas',
    desc: 'Notificación inmediata ante bandera roja',
  },
  {
    key: 'safetyCar',
    label: 'Coche de Seguridad',
    desc: 'Alerta de Safety Car y VSC',
  },
]

export default function NotificationSettings() {
  const { prefs, permission, togglePref } = useNotifications()

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-white text-sm font-bold uppercase tracking-wider">
          Configuración de Alertas en Vivo
        </h3>
        <p className="text-f1-silver text-xs">
          Selecciona los eventos que deseas recibir como notificaciones push
        </p>
      </div>

      {permission !== 'granted' && (
        <div className="bg-f1-carbon border border-f1-gray/50 rounded-xl p-4 text-center space-y-2">
          <p className="text-f1-silver text-xs">
            Activa las notificaciones en tu navegador para recibir alertas de pista
          </p>
          <p className="text-f1-silver/50 text-[10px]">
            Permiso actual: {permission === 'denied' ? 'Bloqueado por el navegador' : 'Pendiente'}
          </p>
        </div>
      )}

      <div className="space-y-2">
        {ALERT_OPTIONS.map(({ key, label, desc }) => (
          <label
            key={key}
            className="flex items-center justify-between gap-4 p-3 rounded-xl bg-f1-carbon border border-f1-gray/30 hover:border-f1-gray/50 transition-colors cursor-pointer"
          >
            <div className="flex-1 min-w-0">
              <span className="block text-sm font-semibold text-white">{label}</span>
              <span className="block text-[11px] text-f1-silver">{desc}</span>
            </div>
            <button
              role="switch"
              aria-checked={prefs[key]}
              onClick={() => togglePref(key)}
              className={`
                relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent
                transition-colors duration-200 ease-in-out cursor-pointer
                ${prefs[key] ? 'bg-f1-red' : 'bg-f1-gray'}
              `}
            >
              <span
                className={`
                  pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg
                  transform transition duration-200 ease-in-out
                  ${prefs[key] ? 'translate-x-5' : 'translate-x-0'}
                `}
              />
            </button>
          </label>
        ))}
      </div>
    </div>
  )
}
