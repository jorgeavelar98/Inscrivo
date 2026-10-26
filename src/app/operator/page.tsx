export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { checkOperatorCookie } from '@/lib/operator-auth'
import { createOperatorClient } from '@/lib/supabase-admin'
import OperatorClient from './OperatorClient'

export default async function OperatorPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const token = params.token

  if (token) {
    const tokenStr = Array.isArray(token) ? token[0] : token
    redirect(`/api/operator/auth?token=${encodeURIComponent(tokenStr)}`)
  }

  const isAuthed = await checkOperatorCookie()
  if (!isAuthed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-sm">Unauthorized</p>
      </div>
    )
  }

  const supabase = createOperatorClient()

  // client_overview is the secret-free join of clients + hosting + billing; operator tokens
  // live in client_secrets and are merged in by client id.
  const [{ data: overview }, { data: secrets }] = await Promise.all([
    supabase
      .from('client_overview')
      .select(
        'id, slug, name, owner_name, owner_emails, owner_phone, preview_url, custom_domain, subscription_status, subscription_tier, monthly_price_cents, stripe_setup_fee_paid, lead_status, notes, created_at',
      )
      .order('created_at', { ascending: false }),
    supabase.from('client_secrets').select('client_id, operator_token'),
  ])

  const tokens = new Map((secrets ?? []).map((s) => [s.client_id, s.operator_token as string | null]))
  const clients = (overview ?? []).map(({ id, ...client }) => ({
    ...client,
    // Billing is created on first payment, so a client without a row has no setup-fee flag yet
    stripe_setup_fee_paid: client.stripe_setup_fee_paid ?? false,
    operator_token: tokens.get(id) ?? null,
  }))

  return <OperatorClient clients={clients} />
}
