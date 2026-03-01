function createHash(length = 16): string {
  const bytes = new Uint8Array(Math.ceil(length / 2))
  crypto.getRandomValues(bytes)

  return Array.from(
    bytes, // iterable
    (byte) => byte.toString(16).padStart(2, '0'), // mapFn
  )
    .join('')
    .slice(0, length)
}

export default createHash
