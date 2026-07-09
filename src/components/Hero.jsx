import CountdownTimer from './CountdownTimer.jsx'
import { parseLocalDate, formatLocalDate } from '../utils/dateUtils.js'

export default function Hero({ race }) {
  if (!race) return null

  const formattedDate = formatLocalDate(race.date, 'es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <section className="relative overflow-hidden rounded-2xl border-t-4 border-f1-red bg-gradient-to-br from-f1-carbon via-f1-carbon to-f1-black">
      <div className="absolute top-0 right-0 w-64 h-64 bg-f1-red/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-f1-red/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative px-8 py-10 md:py-14 md:px-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-1">
            <p className="text-f1-red text-xs font-semibold tracking-[0.2em] uppercase">
              Próxima Carrera
            </p>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
              {race.name}
            </h2>
            <p className="text-f1-silver text-sm md:text-base font-medium">
              {race.circuit}
            </p>
            {race.winner && (
              <p className="text-f1-silver text-xs font-medium">
                Ganador: <span className="text-white">{race.winner}</span>
              </p>
            )}
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <div className="flex flex-col items-start md:items-end gap-1">
              <span className="text-f1-silver text-xs font-medium uppercase tracking-wider">
                Fecha
              </span>
              <time
                dateTime={race.date}
                className="text-white text-lg md:text-2xl font-bold"
              >
                {formattedDate}
              </time>
              <span className="inline-flex items-center gap-1.5 mt-1 px-3 py-1 rounded-full bg-f1-red/20 text-f1-red text-xs font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-f1-red animate-pulse" />
                {race.category}
              </span>
            </div>

            {race.status !== 'past' && (
              <div className="mt-2">
                <span className="text-f1-silver text-[10px] font-semibold uppercase tracking-wider block mb-1">
                  Tiempo restante
                </span>
                <CountdownTimer targetDate={race.date} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
