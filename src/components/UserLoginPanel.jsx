import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

const PROFILES = [
  { key: 'Gratuito', label: 'Gratuito', desc: 'Acceso básico al calendario', color: 'text-f1-silver' },
  { key: 'Premium', label: 'Premium', desc: 'Clasificaciones y notificaciones', color: 'text-f1-red' },
]

export default function UserLoginPanel() {
  const { profile: currentProfile, setProfile, admin } = useAuth()
  const [open, setOpen] = useState(false)

  const handleSelect = (key) => {
    setProfile(key)
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-f1-carbon border border-f1-gray/50 hover:border-f1-red/50 transition-colors cursor-pointer"
      >
        <span className={`w-2 h-2 rounded-full ${
          currentProfile === 'Premium' ? 'bg-f1-red' : 'bg-f1-gray'
        }`} />
        <span className={`text-[11px] font-bold uppercase tracking-wider ${
          currentProfile === 'Premium' ? 'text-f1-red' : 'text-f1-silver'
        }`}>
          {currentProfile}
        </span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-64 z-50 rounded-xl bg-f1-carbon border border-f1-gray/50 shadow-2xl shadow-black/50 overflow-hidden">
            <div className="px-4 py-3 border-b border-f1-gray/30">
              <p className="text-f1-silver text-[10px] font-semibold uppercase tracking-widest">
                Seleccionar perfil
              </p>
            </div>

            <div className="p-2 space-y-1">
              {PROFILES.map(({ key, label, desc, color }) => {
                const isActive = currentProfile === key
                return (
                  <button
                    key={key}
                    onClick={() => handleSelect(key)}
                    disabled={isActive}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                      isActive
                        ? 'bg-white/10 cursor-default'
                        : 'hover:bg-white/5 cursor-pointer'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                      key === 'Premium' ? 'bg-f1-red' : 'bg-f1-gray'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <span className={`block text-sm font-bold ${isActive ? color : 'text-white/80'}`}>
                        {label}
                        {isActive && ' ✓'}
                      </span>
                      <span className="block text-[10px] text-f1-silver/60 font-medium truncate">
                        {desc}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>

            {admin.authed && (
              <div className="px-2 pb-2">
                <a
                  href="/admin"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-f1-red/10 border border-f1-red/30 text-f1-red text-xs font-bold uppercase tracking-wider hover:bg-f1-red/20 transition-colors"
                >
                  <span>⚙️</span>
                  Panel Admin
                </a>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
