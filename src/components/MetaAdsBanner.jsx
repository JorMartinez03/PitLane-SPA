import { useState, useEffect, useRef } from 'react'

export default function MetaAdsBanner() {
  const [loaded, setLoaded] = useState(false)
  const [visible, setVisible] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true)
    }, 2000)

    const visTimer = setTimeout(() => {
      setVisible(true)
    }, 2500)

    return () => {
      clearTimeout(timer)
      clearTimeout(visTimer)
    }
  }, [])

  if (!loaded) return null

  return (
    <div
      ref={containerRef}
      className={`
        w-full rounded-xl border border-f1-gray/30 overflow-hidden
        transition-opacity duration-500
        ${visible ? 'opacity-100' : 'opacity-0'}
      `}
    >
      <div className="bg-f1-carbon/50 flex items-center justify-center py-6 px-4">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">AD</span>
            </div>
            <span className="text-f1-silver text-xs font-medium uppercase tracking-wider">
              Espacio Publicitario
            </span>
          </div>
          <div className="w-full max-w-md mx-auto h-20 rounded-lg bg-gradient-to-r from-f1-gray/30 via-f1-gray/50 to-f1-gray/30 animate-pulse flex items-center justify-center">
            <span className="text-f1-silver/50 text-xs">
              Meta Ads — Carga asíncrona
            </span>
          </div>
          <p className="text-f1-silver/30 text-[10px]">
            Anuncio cargado de forma asíncrona sin bloquear la interfaz
          </p>
        </div>
      </div>
    </div>
  )
}
