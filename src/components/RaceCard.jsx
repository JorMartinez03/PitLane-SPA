import CountdownTimer from './CountdownTimer.jsx'
import { formatLocalDate } from '../utils/dateUtils.js'

const STATUS_CONFIG = {
  past: {
    label: 'Finalizado',
    dot: 'bg-f1-gray',
    border: 'border-f1-gray',
  },
  next: {
    label: 'Siguiente',
    dot: 'bg-f1-red',
    border: 'border-f1-red',
  },
  upcoming: {
    label: 'Próximo',
    dot: 'bg-f1-silver',
    border: 'border-f1-gray',
  },
}

export default function RaceCard({ race }) {
  const cfg = STATUS_CONFIG[race.status]
  const formatted = formatLocalDate(race.date, 'es-MX', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <article
      className={`
        group relative rounded-xl border ${cfg.border} bg-f1-carbon
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:border-f1-red hover:shadow-lg hover:shadow-f1-red/10
        cursor-default overflow-hidden
      `}
    >
      <div className="absolute inset-x-0 top-0 h-0.5 bg-f1-red scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-f1-silver">
              {cfg.label}
            </span>
          </span>
          <span className="text-f1-red text-[10px] font-bold tracking-widest">
            {race.category}
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="text-sm md:text-base font-bold text-white leading-tight group-hover:text-f1-red transition-colors duration-200">
            {race.name}
          </h3>
          <p className="text-xs text-f1-silver font-medium leading-relaxed">
            {race.circuit}
          </p>
        </div>

        <div className="pt-2 border-t border-f1-gray/50 space-y-2">
          <time
            dateTime={race.date}
            className="text-xs font-semibold text-f1-silver block"
          >
            {formatted}
          </time>

          {race.winner && (
            <p className="text-[11px] text-f1-silver font-medium">
              Ganador: <span className="text-white">{race.winner}</span>
            </p>
          )}

          {race.status !== 'past' && (
            <div className="pt-1">
              <CountdownTimer targetDate={race.date} />
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
