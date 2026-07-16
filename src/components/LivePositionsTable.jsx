import { useLiveRaceContext } from '../context/LiveRaceContext.jsx'

const POS_COLORS = {
  1: 'text-yellow-400',
  2: 'text-gray-300',
  3: 'text-amber-600',
}

export default function LivePositionsTable() {
  const { positions, isLive } = useLiveRaceContext()

  if (!isLive || !positions.length) return null

  return (
    <div className="overflow-x-auto rounded-xl border border-f1-gray/50">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-f1-carbon/80 border-b border-f1-gray/50">
            <th className="px-3 py-3 text-left text-f1-silver text-[10px] font-semibold uppercase tracking-widest">
              Pos
            </th>
            <th className="px-3 py-3 text-left text-f1-silver text-[10px] font-semibold uppercase tracking-widest">
              #
            </th>
            <th className="px-3 py-3 text-left text-f1-silver text-[10px] font-semibold uppercase tracking-widest">
              Piloto
            </th>
            <th className="px-3 py-3 text-left text-f1-silver text-[10px] font-semibold uppercase tracking-widest hidden sm:table-cell">
              Equipo
            </th>
            <th className="px-3 py-3 text-right text-f1-silver text-[10px] font-semibold uppercase tracking-widest">
              Intervalo
            </th>
            <th className="px-3 py-3 text-right text-f1-silver text-[10px] font-semibold uppercase tracking-widest hidden md:table-cell">
              Última Vuelta
            </th>
            <th className="px-3 py-3 text-center text-f1-silver text-[10px] font-semibold uppercase tracking-widest hidden lg:table-cell">
              Pits
            </th>
          </tr>
        </thead>
        <tbody>
          {positions.map((row) => (
            <tr
              key={row.number}
              className="border-b border-f1-gray/20 hover:bg-white/5 transition-colors"
            >
              <td className={`px-3 py-2.5 font-extrabold text-base ${POS_COLORS[row.position] || 'text-white'}`}>
                {row.position}
              </td>
              <td className="px-3 py-2.5 text-f1-silver font-mono text-xs">
                {row.number}
              </td>
              <td className="px-3 py-2.5 font-semibold text-white text-sm">
                {row.driver}
              </td>
              <td className="px-3 py-2.5 text-f1-silver text-xs hidden sm:table-cell">
                {row.team}
              </td>
              <td className="px-3 py-2.5 text-right font-bold text-white tabular-nums text-xs">
                {row.interval}
              </td>
              <td className="px-3 py-2.5 text-right text-f1-silver font-mono text-xs hidden md:table-cell">
                {row.lastLap}
              </td>
              <td className="px-3 py-2.5 text-center text-f1-silver text-xs hidden lg:table-cell">
                {row.pitStops}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
