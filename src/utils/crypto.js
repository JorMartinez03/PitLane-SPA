const CRYPTO_KEY = 'PitLane2026AES128!!'

function xorEncode(str, key) {
  let result = ''
  for (let i = 0; i < str.length; i++) {
    result += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % key.length))
  }
  return result
}

function toBase64(str) {
  try {
    return btoa(unescape(encodeURIComponent(str)))
  } catch {
    return btoa(str)
  }
}

function fromBase64(str) {
  try {
    return decodeURIComponent(escape(atob(str)))
  } catch {
    try {
      return atob(str)
    } catch {
      return null
    }
  }
}

export function encrypt(data) {
  const json = JSON.stringify(data)
  const encoded = xorEncode(json, CRYPTO_KEY)
  return toBase64(encoded)
}

export function decrypt(ciphertext) {
  const decoded = fromBase64(ciphertext)
  if (!decoded) return null
  const json = xorEncode(decoded, CRYPTO_KEY)
  try {
    return JSON.parse(json)
  } catch {
    return null
  }
}

export function isValidAdminKey(key) {
  return /^[0-9a-fA-F]{32}$/.test(key)
}

export function hashKey(key) {
  let hash = 0
  for (let i = 0; i < key.length; i++) {
    const char = key.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(16).padStart(8, '0')
}
