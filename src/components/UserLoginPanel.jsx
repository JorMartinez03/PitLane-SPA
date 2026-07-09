import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

const PROFILES = [
  { key: 'Gratuito', label: 'Gratuito', desc: 'Acceso básico al calendario', color: 'text-f1-silver' },
  { key: 'Premium', label: 'Premium', desc: 'Clasificaciones y notificaciones', color: 'text-f1-red' },
  { key: 'Administrador', label: 'Admin', desc: 'Panel de control y edición', color: 'text-yellow-400' },
]

export default function UserLoginPanel() {
  const { profile: currentProfile, setProfile, login } = useAuth()
  const [open, setOpen] = useState(false)
  const [adminKey, setAdminKey] = useState('')
  const [adminError, setAdminError] = useState('')
  const [adminSelected, setAdminSelected] = useState(false)

  const handleSelect = (key) => {
    setAdminError('')
    setAdminKey('')
    if (key === 'Administrador') {
      setAdminSelected(true)
      return
    }
    setAdminSelected(false)
    setProfile(key)
    setOpen(false)
  }

  const handleAdminLogin = (e) => {
    e.preventDefault()
    setAdminError('')
    const msg = login(adminKey)
    if (msg) {
      setAdminError(msg)
    } else {
      setOpen(false)
      setAdminKey('')
      setAdminSelected(false)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-f1-carbon border border-f1-gray/50 hover:border-f1-red/50 transition-colors cursor-pointer"
      >
        <span className={`w-2 h-2 rounded-full ${
          currentProfile === 'Premium' ? 'bg-f1-red' : currentProfile === 'Administrador' ? 'bg-yellow-400' : 'bg-f1-gray'
        }`} />
        <span className={`text-[11px] font-bold uppercase tracking-wider ${
          currentProfile === 'Premium' ? 'text-f1-red' : currentProfile === 'Administrador' ? 'text-yellow-400' : 'text-f1-silver'
        }`}>
          {currentProfile === 'Administrador' ? 'Admin' : currentProfile}
        </span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => { setOpen(false); setAdminSelected(false) }} />
          <div className="absolute right-0 top-full mt-2 w-64 z-50 rounded-xl bg-f1-carbon border border-f1-gray/50 shadow-2xl shadow-black/50 overflow-hidden">
            <div className="px-4 py-3 border-b border-f1-gray/30">
              <p className="text-f1-silver text-[10px] font-semibold uppercase tracking-widest">
                Seleccionar perfil
              </p>
            </div>

            <div className="p-2 space-y-1">
              {PROFILES.map(({ key, label, desc, color }) => {
                const isActive = currentProfile === key
                const isAdminOption = key === 'Administrador'
                return (
                  <button
                    key={key}
                    onClick={() => handleSelect(key)}
                    disabled={isActive}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                      isActive
                        ? 'bg-white/10 cursor-default'
                        : 'hover:bg-white/5 cursor-pointer'
                    } ${isAdminOption ? 'border border-yellow-500/20' : ''}`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                      key === 'Premium' ? 'bg-f1-red' : key === 'Administrador' ? 'bg-yellow-400' : 'bg-f1-gray'
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

            {(adminSelected || currentProfile === 'Administrador') && (
              <form onSubmit={handleAdminLogin} className="px-4 py-3 border-t border-f1-gray/30 space-y-2">
                <label className="block text-f1-silver/60 text-[10px] font-semibold uppercase tracking-widest">
                  Llave de Administrador
                </label>
                <input
                  type="password"
                  value={adminKey}
                  onChange={(e) => { setAdminKey(e.target.value); setAdminError('') }}
                  placeholder="Hex de 32 caracteres"
                  className="w-full px-3 py-2 rounded-lg bg-f1-black border border-f1-gray text-white text-xs font-mono placeholder:text-f1-silver/30 focus:outline-none focus:border-yellow-400/50 transition-colors"
                  autoComplete="off"
                />
                {adminError && (
                  <p className="text-f1-red text-[10px] font-semibold">{adminError}</p>
                )}
                <button
                  type="submit"
                  className="w-full px-3 py-2 rounded-lg bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-[10px] font-bold uppercase tracking-wider hover:bg-yellow-500/30 transition-colors cursor-pointer"
                >
                  Autenticar
                </button>
              </form>
            )}
          </div>
        </>
      )}
    </div>
  )
}
