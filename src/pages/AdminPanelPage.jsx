import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useLiveRaceContext } from '../context/LiveRaceContext.jsx'
import AuditLog from '../components/AuditLog.jsx'
import races from '../data/races.js'

export default function AdminPanelPage() {
  const { admin, logoutAdmin } = useAuth()

  if (!admin.authed) {
    return <Navigate to="/admin/login" replace />
  }

  return <AdminPanelContent logoutAdmin={logoutAdmin} />
}

function AdminPanelContent({ logoutAdmin }) {
  const { isLive, startLive, stopLive } = useLiveRaceContext()
  const { log, addEntry } = AuditLog()
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { key: 'overview', label: 'General' },
    { key: 'edit', label: 'Editar Datos' },
    { key: 'live', label: 'Carrera en Vivo' },
    { key: 'audit', label: 'Bitácora' },
  ]

  return (
    <div className="min-h-screen bg-f1-black">
      <header className="border-b border-f1-gray/50 bg-f1-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-f1-red flex items-center justify-center text-white text-xs font-extrabold">
                PL
              </span>
              <h1 className="text-white font-bold text-lg tracking-tight">
                Panel Administrativo
              </h1>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 rounded bg-f1-red/20 text-f1-red text-[10px] font-bold uppercase tracking-wider">
              Admin
            </span>
            <button
              onClick={logoutAdmin}
              className="text-f1-silver hover:text-white transition-colors text-sm font-medium cursor-pointer"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex gap-1 p-1 rounded-xl bg-f1-carbon border border-f1-gray w-fit">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`
                px-4 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer
                ${activeTab === key
                  ? 'text-white bg-f1-red shadow-lg shadow-f1-red/30'
                  : 'text-f1-silver hover:text-white hover:bg-white/5'}
              `}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'edit' && <EditTab addEntry={addEntry} />}
        {activeTab === 'live' && (
          <LiveControlTab isLive={isLive} startLive={startLive} stopLive={stopLive} />
        )}
        {activeTab === 'audit' && <AuditTab log={log} />}
      </main>
    </div>
  )
}

function OverviewTab() {
  const totalRaces = races.length
  const pastRaces = races.filter((r) => r.status === 'past').length
  const upcomingRaces = races.filter((r) => r.status !== 'past').length

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Resumen del Sistema</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Carreras', value: totalRaces, color: 'text-white' },
          { label: 'Finalizadas', value: pastRaces, color: 'text-green-400' },
          { label: 'Próximas', value: upcomingRaces, color: 'text-f1-red' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-f1-carbon border border-f1-gray/30 rounded-xl p-5 text-center">
            <p className={`text-3xl font-extrabold ${color} tabular-nums`}>{value}</p>
            <p className="text-f1-silver text-xs font-medium mt-1 uppercase tracking-wider">{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function EditTab({ addEntry }) {
  const [selectedRace, setSelectedRace] = useState('')
  const [field, setField] = useState('winner')
  const [newValue, setNewValue] = useState('')
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const race = races.find((r) => r.id === selectedRace)

  const handleSave = () => {
    setError('')
    if (!selectedRace || !newValue.trim()) {
      setError('Seleccione una carrera y complete el campo')
      return
    }

    if ((field === 'winner' || field === 'team') && /[^a-zA-ZáéíóúñÁÉÍÓÚÑ\s']/.test(newValue)) {
      setError('Formato incorrecto: Ingrese un valor válido sin caracteres especiales')
      return
    }

    addEntry({
      adminKey: '****c5d6',
      action: `Modificación de ${field === 'winner' ? 'ganador' : field === 'team' ? 'equipo' : field}`,
      field: `${race?.name} — ${race?.category}`,
      oldValue: race?.[field] || 'N/A',
      newValue: newValue,
    })

    setSaved(true)
    setNewValue('')
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Edición de Datos de Contingencia</h2>
      <p className="text-f1-silver text-sm">
        Modifique de forma excepcional los datos de las carreras. Toda alteración quedará registrada en la bitácora.
      </p>

      <div className="bg-f1-carbon border border-f1-gray/30 rounded-xl p-6 space-y-4">
        <div className="space-y-2">
          <label className="text-f1-silver text-xs font-semibold uppercase tracking-widest">
            Carrera
          </label>
          <select
            value={selectedRace}
            onChange={(e) => setSelectedRace(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-f1-black border border-f1-gray/50 text-white text-sm focus:outline-none focus:border-f1-red"
          >
            <option value="">Seleccionar carrera...</option>
            {races.filter((r) => r.category === 'F1').map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} ({r.date})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-f1-silver text-xs font-semibold uppercase tracking-widest">
            Campo a Modificar
          </label>
          <select
            value={field}
            onChange={(e) => setField(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-f1-black border border-f1-gray/50 text-white text-sm focus:outline-none focus:border-f1-red"
          >
            <option value="winner">Ganador</option>
            <option value="team">Equipo</option>
            <option value="date">Fecha</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-f1-silver text-xs font-semibold uppercase tracking-widest">
            Nuevo Valor
          </label>
          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Ingrese el nuevo valor..."
            className="w-full px-4 py-3 rounded-xl bg-f1-black border border-f1-gray/50 text-white text-sm placeholder:text-f1-silver/30 focus:outline-none focus:border-f1-red"
          />
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
            <p className="text-red-400 text-sm font-medium">{error}</p>
          </div>
        )}

        {saved && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3">
            <p className="text-green-400 text-sm font-medium">
              Cambio registrado exitosamente en la bitácora de auditoría
            </p>
          </div>
        )}

        <button
          onClick={handleSave}
          className="w-full px-6 py-3 rounded-xl bg-f1-red text-white font-bold text-sm tracking-wider hover:bg-f1-red/90 transition-colors cursor-pointer"
        >
          Confirmar Cambio
        </button>
      </div>
    </div>
  )
}

function LiveControlTab({ isLive, startLive, stopLive }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Control de Carrera en Vivo</h2>
      <p className="text-f1-silver text-sm">
        Inicie o detenga la simulación de carrera en vivo para las pantallas de los usuarios premium.
      </p>

      <div className="bg-f1-carbon border border-f1-gray/30 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-3">
          <span className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-f1-gray'}`} />
          <span className="text-white text-sm font-semibold">
            Estado: {isLive ? 'En Vivo' : 'Inactivo'}
          </span>
        </div>

        <div className="flex gap-3">
          {!isLive ? (
            <button
              onClick={() => startLive('F1')}
              className="px-6 py-3 rounded-xl bg-green-600 text-white font-bold text-sm hover:bg-green-700 transition-colors cursor-pointer"
            >
              Iniciar Simulación
            </button>
          ) : (
            <button
              onClick={stopLive}
              className="px-6 py-3 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition-colors cursor-pointer"
            >
              Detener Simulación
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function AuditTab({ log }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Bitácora de Auditoría</h2>
      <p className="text-f1-silver text-sm">
        Historial detallado de todas las modificaciones realizadas por los administradores.
      </p>
      {log}
    </div>
  )
}
