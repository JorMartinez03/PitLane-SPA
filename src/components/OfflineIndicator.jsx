import { useState, useEffect } from 'react'

export default function OfflineIndicator() {
  const [showBanner, setShowBanner] = useState(() => !navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setShowBanner(false)
    const handleOffline = () => setShowBanner(true)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  useEffect(() => {
    if (showBanner) {
      const timer = setTimeout(() => setShowBanner(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [showBanner])

  if (!showBanner) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-yellow-500 text-black px-4 py-2.5 text-center text-sm font-bold shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
        <span>Modo sin Conexión — Mostrando datos en caché</span>
        <button
          onClick={() => setShowBanner(false)}
          className="ml-4 text-black/60 hover:text-black font-bold cursor-pointer"
        >
          &times;
        </button>
      </div>
    </div>
  )
}
