import base64 from './base64'

interface JwtHeader {
  alg: string
  typ: string
}

async function hmacSha256(message: string, secret: string): Promise<string> {
  const encoder = new TextEncoder()
  const keyData = encoder.encode(secret)
  const messageData = encoder.encode(message)
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData)
  return base64(new Uint8Array(signature))
}

async function jwt<T extends object>(payload: T, secret: string): Promise<string> {
  const header: JwtHeader = {
    alg: 'HS256',
    typ: 'JWT',
  }
  const encodedHeader = base64(JSON.stringify(header))
  const encodedPayload = base64(JSON.stringify(payload))
  const signature = await hmacSha256(`${encodedHeader}.${encodedPayload}`, secret)
  return `${encodedHeader}.${encodedPayload}.${signature}`
}

export default jwt
