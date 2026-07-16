import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function AdminLoginPage() {
  const { loginAdmin } = useAuth()
  const navigate = useNavigate()
  const [key, setKey] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      const result = loginAdmin(key)
      setLoading(false)

      if (result.success) {
        navigate('/admin')
      } else {
        setError(result.error)
      }
    }, 300)
  }

  return (
    <div className="min-h-screen bg-f1-black flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center gap-3">
            <span className="w-12 h-12 rounded-xl bg-f1-red flex items-center justify-center text-white text-lg font-extrabold">
              PL
            </span>
          </Link>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Panel Administrativo
          </h1>
          <p className="text-f1-silver text-sm">
            Ingrese su llave de seguridad única para acceder
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-f1-silver text-xs font-semibold uppercase tracking-widest">
              Llave de Seguridad
            </label>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="32 caracteres hexadecimales"
              maxLength={32}
              className="
                w-full px-4 py-3 rounded-xl bg-f1-carbon border border-f1-gray/50
                text-white text-sm font-mono placeholder:text-f1-silver/30
                focus:outline-none focus:border-f1-red focus:ring-1 focus:ring-f1-red/30
                transition-colors
              "
            />
            <p className="text-f1-silver/50 text-[10px]">
              Formato: 32 caracteres hexadecimales (0-9, a-f)
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
              <p className="text-red-400 text-sm font-medium">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || key.length === 0}
            className="
              w-full px-6 py-3 rounded-xl bg-f1-red text-white font-bold text-sm
              tracking-wider hover:bg-f1-red/90 transition-colors cursor-pointer
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {loading ? 'Validando...' : 'Acceder al Panel'}
          </button>
        </form>

        <div className="text-center">
          <Link
            to="/"
            className="text-f1-silver hover:text-white transition-colors text-sm font-medium"
          >
            &larr; Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
