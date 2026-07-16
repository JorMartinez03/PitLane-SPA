import { useState, useEffect } from 'react'
import { parseLocalDate } from '../utils/dateUtils.js'

function computeDelta(targetDate) {
  const diff = targetDate - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  return { days, hours, minutes, seconds, expired: false }
}

export default function CountdownTimer({ targetDate }) {
  const [delta, setDelta] = useState(() => computeDelta(parseLocalDate(targetDate)))

  useEffect(() => {
    const id = setInterval(() => {
      setDelta(computeDelta(parseLocalDate(targetDate)))
    }, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  if (delta.expired) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-600/20 text-green-400 text-xs font-bold uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        En Vivo
      </span>
    )
  }

  return (
    <div className="flex items-center gap-3">
      {[
        { label: 'Días', value: delta.days },
        { label: 'Horas', value: delta.hours },
        { label: 'Min', value: delta.minutes },
        { label: 'Seg', value: delta.seconds },
      ].map(({ label, value }) => (
        <div key={label} className="text-center">
          <span className="block text-xl md:text-2xl font-extrabold text-white tabular-nums">
            {String(value).padStart(2, '0')}
          </span>
          <span className="block text-[10px] text-f1-silver font-semibold uppercase tracking-wider">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
