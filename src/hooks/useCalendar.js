import { useState, useEffect, useMemo, useCallback } from 'react'
import { parseLocalDate } from '../utils/dateUtils.js'
import { fetchF1Calendar } from '../services/f1Api.js'
import races from '../data/races.js'

const SIMULATED_DELAY = 400

function computeStatus(dateStr) {
  const now = new Date()
  const raceDate = parseLocalDate(dateStr)
  const diff = raceDate - now
  if (diff < 0) return 'past'
  if (diff < 7 * 24 * 60 * 60 * 1000) return 'next'
  return 'upcoming'
}

function enrichRaces(raw) {
  return raw.map((r) => ({
    ...r,
    status: computeStatus(r.date),
  }))
}

const localRaces = enrichRaces(races)

export default function useCalendar(initialCategory = 'F1') {
  const [state, setState] = useState({
    races: [],
    loading: true,
    activeCategory: initialCategory,
    source: 'local',
  })

  useEffect(() => {
    let cancelled = false
    let timer = null

    async function load() {
      if (initialCategory === 'F1') {
        try {
          const apiRaces = await fetchF1Calendar()
          if (cancelled) return
          if (apiRaces.length > 0) {
            setState((prev) => ({
              ...prev,
              races: enrichRaces(apiRaces),
              loading: false,
              source: 'api',
            }))
            return
          }
        } catch {
          // Fallback to local data
        }
      }

      timer = setTimeout(() => {
        if (cancelled) return
        setState((prev) => ({
          ...prev,
          races: localRaces,
          loading: false,
          source: 'local',
        }))
      }, SIMULATED_DELAY)
    }

    load()

    return () => {
      cancelled = true
      if (timer) clearTimeout(timer)
    }
  }, [initialCategory])

  const setActiveCategory = useCallback((category) => {
    setState((prev) => ({ ...prev, activeCategory: category }))
  }, [])

  const filteredRaces = useMemo(() => {
    return state.races.filter((r) => r.category === state.activeCategory)
  }, [state.races, state.activeCategory])

  const nextRace = useMemo(() => {
    return filteredRaces.find((r) => r.status === 'next')
      || filteredRaces.find((r) => r.status === 'upcoming')
      || null
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
    source: state.source,
  }
}
