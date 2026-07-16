import { useState } from 'react'
import standings from '../data/standings.js'

const POSITION_COLORS = {
  1: 'text-yellow-400',
  2: 'text-f1-silver',
  3: 'text-amber-600',
}

export default function ClasificacionesTable({ category }) {
  const [sortBy, setSortBy] = useState('pos')
  const [sortDir, setSortDir] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')

  const rows = standings[category] || []

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDir((d) => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortDir('asc')
    }
  }

  const filtered = rows
    .filter((r) => {
      if (!searchTerm) return true
      const term = searchTerm.toLowerCase()
      return r.driver.toLowerCase().includes(term) || r.team.toLowerCase().includes(term)
    })
    .sort((a, b) => {
      let valA = a[sortBy]
      let valB = b[sortBy]
      if (typeof valA === 'string') valA = valA.toLowerCase()
      if (typeof valB === 'string') valB = valB.toLowerCase()
      if (valA < valB) return sortDir === 'asc' ? -1 : 1
      if (valA > valB) return sortDir === 'asc' ? 1 : -1
      return 0
    })

  if (!rows.length) {
    return (
      <div className="text-center py-12">
        <p className="text-f1-silver text-sm">Clasificaciones no disponibles para {category}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar piloto o equipo..."
        className="w-full px-4 py-3 rounded-xl bg-f1-carbon border border-f1-gray/50 text-white text-sm placeholder:text-f1-silver/30 focus:outline-none focus:border-f1-red transition-colors"
      />

      <div className="overflow-x-auto rounded-xl border border-f1-gray/50">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-f1-carbon/80 border-b border-f1-gray/50">
              {[
                { key: 'pos', label: 'Pos' },
                { key: 'driver', label: 'Piloto' },
                { key: 'team', label: 'Equipo' },
                { key: 'points', label: 'Puntos' },
              ].map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className={`px-4 py-3 text-left text-f1-silver text-[10px] font-semibold uppercase tracking-widest cursor-pointer hover:text-white transition-colors ${key === 'team' ? 'hidden sm:table-cell' : ''} ${key === 'points' ? 'text-right' : ''}`}
                >
                  {label}
                  {sortBy === key && (sortDir === 'asc' ? ' ↑' : ' ↓')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
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
    </div>
  )
}
