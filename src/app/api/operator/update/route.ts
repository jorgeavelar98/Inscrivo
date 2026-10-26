import { type NextRequest } from 'next/server'
import { checkOperatorCookie } from '@/lib/operator-auth'
import { createOperatorClient } from '@/lib/supabase-admin'

export async function PATCH(request: NextRequest) {
  const isAuthed = await checkOperatorCookie()
  if (!isAuthed) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { slug, lead_status, notes } = body

  if (!slug) {
    return Response.json({ error: 'slug required' }, { status: 400 })
  }

  const supabase = createOperatorClient()

  const update: Record<string, unknown> = {}
  if (lead_status !== undefined) update.lead_status = lead_status
  if (notes !== undefined) update.notes = notes

  if (Object.keys(update).length === 0) {
    return Response.json({ error: 'nothing to update' }, { status: 400 })
  }

  const { error } = await supabase.from('clients').update(update).eq('slug', slug)

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ ok: true })
}
