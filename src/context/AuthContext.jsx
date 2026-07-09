/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const AUTH_KEY = 'pitlane_session'

const AuthContext = createContext(null)

function decodeSession(raw) {
  try {
    const json = atob(raw)
    const data = JSON.parse(json)
    if (data.p && data.t && data.e) return data
  } catch {
    /* empty */
  }
  return null
}

function encodeSession(profile) {
  const payload = {
    p: profile,
    t: Date.now(),
    e: Date.now() + 24 * 60 * 60 * 1000,
  }
  return btoa(JSON.stringify(payload))
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

  return (
    <AuthContext.Provider value={{ ...user, login, setProfile, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
