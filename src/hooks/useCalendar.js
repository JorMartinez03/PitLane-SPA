import { useState, useEffect, useMemo, useCallback } from 'react'
import races from '../data/races.js'

const SIMULATED_DELAY = 600

function computeStatus(dateStr) {
  const now = new Date()
  const raceDate = new Date(dateStr)
  const diff = raceDate - now
  if (diff < 0) return 'past'
  if (diff < 7 * 24 * 60 * 60 * 1000) return 'next'
  return 'upcoming'
}

function enrichRaces(raw) {
  return raw.map((r) => {
    const liveStatus = computeStatus(r.date)
    return {
      id: r.id,
      name: r.name,
      circuit: r.circuit,
      date: r.date,
      category: r.category,
      status: r.status === 'past' ? 'past' : liveStatus,
    }
  })
}

const allRaces = enrichRaces(races)

export default function useCalendar() {
  const [state, setState] = useState({
    races: [],
    loading: true,
    activeCategory: 'F1',
  })

  useEffect(() => {
    let cancelled = false

    setState((prev) => ({ ...prev, loading: true }))

    const timer = setTimeout(() => {
      if (cancelled) return
      setState((prev) => ({
        ...prev,
        races: allRaces,
        loading: false,
      }))
    }, SIMULATED_DELAY)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [])

  const setActiveCategory = useCallback((category) => {
    setState((prev) => ({ ...prev, activeCategory: category }))
  }, [])

  const filteredRaces = useMemo(() => {
    return state.races.filter((r) => r.category === state.activeCategory)
  }, [state.races, state.activeCategory])

  const nextRace = useMemo(() => {
    return filteredRaces.find((r) => r.status === 'next') || null
  }, [filteredRaces])

  const pastRaces = useMemo(() => {
    return filteredRaces.filter((r) => r.status === 'past')
  }, [filteredRaces])

  const upcomingRaces = useMemo(() => {
    return filteredRaces.filter((r) => r.status !== 'past')
  }, [filteredRaces])

  return {
    races: filteredRaces,
    allRaces: state.races,
    loading: state.loading,
    activeCategory: state.activeCategory,
    setActiveCategory,
    nextRace,
    pastRaces,
    upcomingRaces,
  }
}
