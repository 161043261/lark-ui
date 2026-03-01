function base64(str: string | Uint8Array): string {
  const bytes = typeof str === 'string' ? new TextEncoder().encode(str) : str
  let binary = ''
  for (const b of bytes) {
    binary += String.fromCharCode(b)
  }
  const base64 = btoa(binary)
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export default base64
