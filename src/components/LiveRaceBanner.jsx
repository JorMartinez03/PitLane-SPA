import { useLiveRaceContext } from '../context/LiveRaceContext.jsx'

export default function LiveRaceBanner() {
  const { flag, flagStyle, isLive, elapsedLaps, totalLaps } = useLiveRaceContext()

  if (!isLive) return null

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-f1-gray/50 transition-all duration-150"
      style={{ backgroundColor: flagStyle.color + '22' }}
    >
      {flag === 'Safety Car' || flag === 'Amarilla' ? (
        <div className="absolute inset-0 animate-pulse" style={{ backgroundColor: flagStyle.color + '15' }} />
      ) : null}

      <div className="relative px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className="w-3 h-3 rounded-full animate-pulse"
            style={{ backgroundColor: flagStyle.color }}
          />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-f1-silver">
              Estado de Pista en Vivo
            </p>
            <p
              className="text-sm font-extrabold uppercase tracking-wider"
              style={{ color: flagStyle.color }}
            >
              {flagStyle.label}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-[10px] text-f1-silver font-medium uppercase tracking-wider">
            Vueltas
          </p>
          <p className="text-white text-sm font-bold tabular-nums">
            {elapsedLaps} / {totalLaps}
          </p>
        </div>
      </div>
    </div>
  )
}
