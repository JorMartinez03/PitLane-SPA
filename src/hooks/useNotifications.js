import { useState, useEffect, useCallback } from 'react'

const NOTIF_KEY = 'pitlane_notifications'

function loadPrefs() {
  try {
    const stored = localStorage.getItem(NOTIF_KEY)
    return stored ? JSON.parse(stored) : { redFlags: false, safetyCar: false, raceStart: false }
  } catch {
    return { redFlags: false, safetyCar: false, raceStart: false }
  }
}

function savePrefs(prefs) {
  try {
    localStorage.setItem(NOTIF_KEY, JSON.stringify(prefs))
  } catch { /* empty */ }
}

export default function useNotifications() {
  const [prefs, setPrefs] = useState(loadPrefs)
  const [permission, setPermission] = useState(() => {
    if (typeof Notification !== 'undefined') return Notification.permission
    return 'default'
  })

  useEffect(() => {
    savePrefs(prefs)
  }, [prefs])

  const requestPermission = useCallback(async () => {
    if (typeof Notification === 'undefined') return 'denied'
    const result = await Notification.requestPermission()
    setPermission(result)
    return result
  }, [])

  const togglePref = useCallback(async (key) => {
    const current = prefs[key]
    if (!current) {
      const perm = await requestPermission()
      if (perm !== 'granted') return false
    }
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }))
    return true
  }, [prefs, requestPermission])

  const sendNotification = useCallback((title, body, tag) => {
    if (permission !== 'granted') return
    try {
      new Notification(title, {
        body,
        icon: '/favicon.svg',
        tag: tag || 'pitlane-alert',
        renotify: true,
      })
    } catch { /* empty */ }
  }, [permission])

  return { prefs, permission, togglePref, sendNotification, requestPermission }
}
