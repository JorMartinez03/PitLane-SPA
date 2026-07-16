import { useState } from 'react'

const INITIAL_LOG = [
  {
    id: 1,
    timestamp: '2026-07-15T14:32:00',
    adminKey: '****c5d6',
    action: 'Modificación de horario',
    field: 'GP de Bélgica — Hora de Clasificación',
    oldValue: '15:00 UTC',
    newValue: '16:00 UTC',
  },
  {
    id: 2,
    timestamp: '2026-07-10T09:15:00',
    adminKey: '****c5d6',
    action: 'Corrección de ganador',
    field: 'GP de Gran Bretaña — F1',
    oldValue: 'Charles Leclerc',
    newValue: 'George Russell',
  },
]

export default function AuditLog() {
  const [log, setLog] = useState(INITIAL_LOG)

  const addEntry = (entry) => {
    setLog((prev) => [
      {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...entry,
      },
      ...prev,
    ])
  }

  return { log, addEntry, AuditLogUI: <AuditLogView log={log} /> }
}

function AuditLogView({ log }) {
  if (!log.length) {
    return (
      <div className="text-center py-8">
        <p className="text-f1-silver text-sm">Sin registros de auditoría</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {log.map((entry) => (
        <div
          key={entry.id}
          className="bg-f1-carbon border border-f1-gray/30 rounded-xl p-4 space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-f1-red text-xs font-bold uppercase tracking-wider">
              {entry.action}
            </span>
            <span className="text-f1-silver text-[10px] font-mono">
              {new Date(entry.timestamp).toLocaleString('es-MX')}
            </span>
          </div>
          <p className="text-white text-sm font-medium">{entry.field}</p>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-red-400 line-through">{entry.oldValue}</span>
            <span className="text-f1-silver">&rarr;</span>
            <span className="text-green-400 font-semibold">{entry.newValue}</span>
          </div>
          <p className="text-f1-silver/50 text-[10px]">
            Admin: {entry.adminKey}
          </p>
        </div>
      ))}
    </div>
  )
}
