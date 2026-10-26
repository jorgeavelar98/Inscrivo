import { createClient } from '@supabase/supabase-js'

// Service-role client for the operator pages. All Inscrivo tables live in the `inscrivo` schema.
export function createOperatorClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_SUPABASE_SECRET_KEY!, {
    db: { schema: 'inscrivo' },
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
