import { type NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { deriveOperatorToken } from '@/lib/operator-auth'

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')
  const masterToken = process.env.OPERATOR_MASTER_TOKEN

  if (!token || !masterToken || token !== masterToken) {
    return new Response('Unauthorized', { status: 401 })
  }

  const derived = deriveOperatorToken(masterToken)
  const cookieStore = await cookies()

  cookieStore.set('operator_auth', derived, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  })

  redirect('/operator')
}
