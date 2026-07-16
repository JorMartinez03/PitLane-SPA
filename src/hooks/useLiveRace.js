import { useState, useEffect, useCallback, useRef } from 'react'
import {
  generateInitialPositions,
  generateRaceUpdate,
  generateFlagChange,
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

export default function useLiveRace(category = 'F1') {
  const [positions, setPositions] = useState(() => generateInitialPositions(category))
  const [flag, setFlag] = useState('Verde')
  const [isLive, setIsLive] = useState(false)
  const [elapsedLaps, setElapsedLaps] = useState(35)
  const intervalRef = useRef(null)
  const flagRef = useRef(null)

  const startLive = useCallback(() => {
    setIsLive(true)
    setPositions(generateInitialPositions(category))
    setElapsedLaps(35)

    intervalRef.current = setInterval(() => {
      setPositions((prev) => generateRaceUpdate(prev))
      setElapsedLaps((prev) => prev + 1)
    }, UPDATE_INTERVAL)

    flagRef.current = setInterval(() => {
      const newFlag = generateFlagChange()
      if (newFlag) setFlag(newFlag)
    }, FLAG_CHECK_INTERVAL)
  }, [category])

  const stopLive = useCallback(() => {
    setIsLive(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (flagRef.current) clearInterval(flagRef.current)
  }, [])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (flagRef.current) clearInterval(flagRef.current)
    }
  }, [])

  const flagStyle = FLAG_STYLES[flag] || FLAG_STYLES.Verde

  return {
    positions,
    flag,
    flagStyle,
    isLive,
    elapsedLaps,
    startLive,
    stopLive,
    totalLaps: 58,
  }
}
