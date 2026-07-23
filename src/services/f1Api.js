const JOLPICA_BASE = 'https://api.jolpi.ca/ergast/f1'

function transformRace(raw, index) {
  const circuit = raw.Circuit?.circuitName || ''
  const country = raw.Circuit?.Location?.country || ''
  const locality = raw.Circuit?.Location?.locality || ''
  const locationStr = locality && country ? `${locality}, ${country}` : country || circuit

  return {
    id: `f1-${String(index + 1).padStart(2, '0')}`,
    name: raw.raceName,
    circuit: locationStr,
    date: raw.date,
    category: 'F1',
    status: 'upcoming',
    winner: null,
    team: null,
    round: Number(raw.round),
    time: raw.time || null,
    wikipediaUrl: raw.url || null,
  }
}

export async function fetchF1Calendar(season = new Date().getFullYear()) {
  const url = `${JOLPICA_BASE}/${season}.json`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`F1 API error: ${res.status}`)

  const data = await res.json()
  const races = data?.MRData?.RaceTable?.Races || []

  return races.map((race, i) => transformRace(race, i))
}

export async function fetchF1Results(season = new Date().getFullYear(), round) {
  const url = round
    ? `${JOLPICA_BASE}/${season}/${round}/results.json`
    : `${JOLPICA_BASE}/${season}/results.json`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`F1 Results API error: ${res.status}`)

  const data = await res.json()
  return data?.MRData?.RaceTable?.Races || []
}
