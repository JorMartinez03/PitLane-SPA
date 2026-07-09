import standings from '../data/standings.js'

const POSITION_COLORS = {
  1: 'text-yellow-400',
  2: 'text-f1-silver',
  3: 'text-amber-600',
}

export default function ClasificacionesTable({ category }) {
  const rows = standings[category]
  if (!rows || !rows.length) {
    return (
      <div className="text-center py-12">
        <p className="text-f1-silver text-sm">Clasificaciones no disponibles para {category}</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-f1-gray/50">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-f1-carbon/80 border-b border-f1-gray/50">
            <th className="px-4 py-3 text-left text-f1-silver text-[10px] font-semibold uppercase tracking-widest">
              Pos
            </th>
            <th className="px-4 py-3 text-left text-f1-silver text-[10px] font-semibold uppercase tracking-widest">
              Piloto
            </th>
            <th className="px-4 py-3 text-left text-f1-silver text-[10px] font-semibold uppercase tracking-widest hidden sm:table-cell">
              Equipo
            </th>
            <th className="px-4 py-3 text-right text-f1-silver text-[10px] font-semibold uppercase tracking-widest">
              Puntos
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.pos}
              className="border-b border-f1-gray/20 hover:bg-white/5 transition-colors"
            >
              <td className={`px-4 py-3 font-extrabold text-base ${POSITION_COLORS[row.pos] || 'text-white'}`}>
                {row.pos}
              </td>
              <td className="px-4 py-3 font-semibold text-white">
                {row.driver}
              </td>
              <td className="px-4 py-3 text-f1-silver hidden sm:table-cell">
                {row.team}
              </td>
              <td className="px-4 py-3 text-right font-bold text-white tabular-nums">
                {row.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
