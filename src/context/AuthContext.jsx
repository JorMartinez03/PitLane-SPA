/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { encrypt, decrypt, isValidAdminKey, hashKey } from '../utils/crypto.js'

const AUTH_KEY = 'pitlane_session'
const ADMIN_KEY = 'pitlane_admin'
const ADMIN_SECRET = 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6'

const AuthContext = createContext(null)

function decodeSession(raw) {
  const data = decrypt(raw)
  if (data && data.p && data.t && data.e) return data
  return null
}

function encodeSession(profile) {
  return encrypt({
    p: profile,
    t: Date.now(),
    e: Date.now() + 24 * 60 * 60 * 1000,
  })
}

function loadAdminSession() {
  try {
    const raw = localStorage.getItem(ADMIN_KEY)
    if (!raw) return null
    const data = decrypt(raw)
    if (data && data.k && data.t && data.e && Date.now() <= data.e) {
      return data
    }
    localStorage.removeItem(ADMIN_KEY)
    return null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(AUTH_KEY)
    if (!stored) return { profile: 'Gratuito', authed: false }
    const session = decodeSession(stored)
    if (!session || Date.now() > session.e) {
      localStorage.removeItem(AUTH_KEY)
      return { profile: 'Gratuito', authed: false }
    }
    return { profile: session.p, authed: true }
  })

  const [admin, setAdmin] = useState(() => {
    const session = loadAdminSession()
    return { authed: !!session, keyHash: session?.k || null }
  })

  useEffect(() => {
    function handle(e) {
      if (e.key === AUTH_KEY) {
        const stored = localStorage.getItem(AUTH_KEY)
        if (!stored) {
          setUser({ profile: 'Gratuito', authed: false })
        } else {
          const session = decodeSession(stored)
          if (session && Date.now() <= session.e) {
            setUser({ profile: session.p, authed: true })
          }
        }
      }
      if (e.key === ADMIN_KEY) {
        const session = loadAdminSession()
        setAdmin({ authed: !!session, keyHash: session?.k || null })
      }
    }
    window.addEventListener('storage', handle)
    return () => window.removeEventListener('storage', handle)
  }, [])

  const login = useCallback((profileName) => {
    const session = encodeSession(profileName)
    localStorage.setItem(AUTH_KEY, session)
    setUser({ profile: profileName, authed: true })
    return null
  }, [])

  const setProfile = useCallback((profile) => {
    if (profile === 'Gratuito') {
      localStorage.removeItem(AUTH_KEY)
      setUser({ profile: 'Gratuito', authed: false })
      return
    }
    const session = encodeSession(profile)
    localStorage.setItem(AUTH_KEY, session)
    setUser({ profile, authed: true })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY)
    setUser({ profile: 'Gratuito', authed: false })
  }, [])

  const loginAdmin = useCallback((key) => {
    if (!isValidAdminKey(key)) {
      return { success: false, error: 'Longitud inválida: ingrese 32 caracteres hexadecimales' }
    }
    if (key.toLowerCase() !== ADMIN_SECRET.toLowerCase()) {
      return { success: false, error: 'Acceso Denegado: Llave de seguridad inválida' }
    }
    const keyHash = hashKey(key)
    const payload = encrypt({ k: keyHash, t: Date.now(), e: Date.now() + 8 * 60 * 60 * 1000 })
    localStorage.setItem(ADMIN_KEY, payload)
    setAdmin({ authed: true, keyHash })
    return { success: true }
  }, [])

  const logoutAdmin = useCallback(() => {
    localStorage.removeItem(ADMIN_KEY)
    setAdmin({ authed: false, keyHash: null })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        ...user,
        admin,
        login,
        setProfile,
        logout,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
