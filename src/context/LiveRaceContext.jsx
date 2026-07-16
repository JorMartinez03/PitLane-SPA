/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useRef } from 'react'
import {
  generateInitialPositions,
  generateRaceUpdate,
  generateFlagChange,
  getLapsForCategory,
} from '../data/liveRaceData.js'

const UPDATE_INTERVAL = 3000
const FLAG_CHECK_INTERVAL = 8000

const FLAG_STYLES = {
  Verde: { bg: 'bg-green-600', label: 'BANDERA VERDE', color: '#16a34a' },
  Amarilla: { bg: 'bg-yellow-500', label: 'BANDERA AMARILLA', color: '#eab308' },
  'Safety Car': { bg: 'bg-yellow-400', label: 'SAFETY CAR', color: '#facc15' },
  Roja: { bg: 'bg-red-600', label: 'BANDERA ROJA', color: '#dc2626' },
  VSC: { bg: 'bg-orange-500', label: 'VSC', color: '#f97316' },
}

const LiveRaceContext = createContext(null)

export function LiveRaceProvider({ children }) {
  const [positions, setPositions] = useState([])
  const [flag, setFlag] = useState('Verde')
  const [isLive, setIsLive] = useState(false)
  const [elapsedLaps, setElapsedLaps] = useState(0)
  const [activeCategory, setActiveCategory] = useState('F1')
  const [totalLaps, setTotalLaps] = useState(58)
  const intervalRef = useRef(null)
  const flagRef = useRef(null)

  const startLive = useCallback((category) => {
    const cat = category || activeCategory
    setActiveCategory(cat)
    setIsLive(true)
    setPositions(generateInitialPositions(cat))
    setElapsedLaps(Math.floor(getLapsForCategory(cat) * 0.6))
    setTotalLaps(getLapsForCategory(cat))

    if (intervalRef.current) clearInterval(intervalRef.current)
    if (flagRef.current) clearInterval(flagRef.current)

    intervalRef.current = setInterval(() => {
      setPositions((prev) => generateRaceUpdate(prev))
      setElapsedLaps((prev) => prev + 1)
    }, UPDATE_INTERVAL)

    flagRef.current = setInterval(() => {
      const newFlag = generateFlagChange()
      if (newFlag) setFlag(newFlag)
    }, FLAG_CHECK_INTERVAL)
  }, [activeCategory])

  const stopLive = useCallback(() => {
    setIsLive(false)
    setFlag('Verde')
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (flagRef.current) clearInterval(flagRef.current)
  }, [])

  const flagStyle = FLAG_STYLES[flag] || FLAG_STYLES.Verde

  return (
    <LiveRaceContext.Provider
      value={{
        positions,
        flag,
        flagStyle,
        isLive,
        elapsedLaps,
        activeCategory,
        totalLaps,
        startLive,
        stopLive,
      }}
    >
      {children}
    </LiveRaceContext.Provider>
  )
}

export function useLiveRaceContext() {
  const ctx = useContext(LiveRaceContext)
  if (!ctx) throw new Error('useLiveRaceContext debe usarse dentro de LiveRaceProvider')
  return ctx
}
