export function parseLocalDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function formatLocalDate(dateStr, locale = 'es-MX', options = {}) {
  const date = parseLocalDate(dateStr)
  return date.toLocaleDateString(locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...options,
  })
}

export function detectTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  } catch {
    return 'UTC'
  }
}

export function getTimezoneOffset() {
  try {
    const tz = detectTimezone()
    const now = new Date()
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      timeZoneName: 'shortOffset',
    })
    const parts = formatter.formatToParts(now)
    const offsetPart = parts.find((p) => p.type === 'timeZoneName')
    return offsetPart?.value || 'UTC'
  } catch {
    return 'UTC'
  }
}

export function formatTime24(dateStr) {
  const date = parseLocalDate(dateStr)
  return date.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}
