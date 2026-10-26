import crypto from 'crypto'
import { cookies } from 'next/headers'

export function deriveOperatorToken(masterToken: string): string {
  return crypto.createHmac('sha256', masterToken).update('operator-session').digest('hex')
}

export async function checkOperatorCookie(): Promise<boolean> {
  const masterToken = process.env.OPERATOR_MASTER_TOKEN
  if (!masterToken) return false

  const cookieStore = await cookies()
  const cookie = cookieStore.get('operator_auth')
  if (!cookie) return false

  const expected = deriveOperatorToken(masterToken)
  return cookie.value === expected
}
