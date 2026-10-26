'use client'

import { useState, useRef } from 'react'

type Client = {
  slug: string
  name: string
  owner_name: string | null
  owner_emails: string[]
  owner_phone: string | null
  preview_url: string | null
  custom_domain: string | null
  subscription_status: string | null
  subscription_tier: string | null
  monthly_price_cents: number | null
  stripe_setup_fee_paid: boolean
  lead_status: string
  notes: string | null
  created_at: string | null
  operator_token: string | null
}

function CopyToken({ token }: { token: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(token)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={handleCopy}
      title={token}
      className="text-xs font-mono text-gray-400 hover:text-gray-700 mt-0.5 block truncate max-w-40"
    >
      {copied ? 'copied!' : `${token.slice(0, 12)}…`}
    </button>
  )
}

const LEAD_STATUSES = ['prospect', 'demo_sent', 'active', 'churned'] as const

const LEAD_LABELS: Record<string, string> = {
  prospect: 'Prospect',
  demo_sent: 'Demo sent',
  active: 'Active',
  churned: 'Churned',
}

function leadBadgeClass(status: string): string {
  switch (status) {
    case 'prospect': return 'bg-blue-100 text-blue-800'
    case 'demo_sent': return 'bg-purple-100 text-purple-800'
    case 'active': return 'bg-green-100 text-green-800'
    case 'churned': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-700'
  }
}

function subBadgeClass(status: string | null): string {
  switch (status) {
    case 'active':
    case 'trialing': return 'bg-green-100 text-green-800'
    case 'past_due':
    case 'incomplete': return 'bg-orange-100 text-orange-800'
    case 'canceled':
    case 'unpaid': return 'bg-red-100 text-red-800'
    case 'paused': return 'bg-gray-100 text-gray-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  const month = d.toLocaleString('en-US', { month: 'short' })
  const day = d.getDate()
  const year = String(d.getFullYear()).slice(2)
  return `${month} ${day}, '${year}`
}

async function patchClient(slug: string, patch: { lead_status?: string; notes?: string }) {
  const res = await fetch('/api/operator/update', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug, ...patch }),
  })
  if (!res.ok) throw new Error('update failed')
}

function ClientRow({
  client,
  onUpdate,
}: {
  client: Client
  onUpdate: (slug: string, patch: Partial<Client>) => void
}) {
  const [editingNotes, setEditingNotes] = useState(false)
  const [notesBuffer, setNotesBuffer] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const liveUrl = client.custom_domain ?? client.preview_url

  async function handleLeadStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value
    const prev = client.lead_status
    onUpdate(client.slug, { lead_status: next })
    try {
      await patchClient(client.slug, { lead_status: next })
    } catch {
      onUpdate(client.slug, { lead_status: prev })
    }
  }

  function handleNotesClick() {
    setNotesBuffer(client.notes ?? '')
    setEditingNotes(true)
    setTimeout(() => textareaRef.current?.focus(), 0)
  }

  async function handleNotesBlur() {
    setEditingNotes(false)
    if (notesBuffer === (client.notes ?? '')) return
    onUpdate(client.slug, { notes: notesBuffer })
    try {
      await patchClient(client.slug, { notes: notesBuffer })
    } catch {
      onUpdate(client.slug, { notes: client.notes })
    }
  }

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 align-top">
      <td className="px-4 py-3">
        <div className="font-medium text-gray-900 text-sm">{client.name}</div>
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:underline block truncate max-w-[200px]"
          >
            {liveUrl.replace(/^https?:\/\//, '')}
          </a>
        )}
        <div className="text-xs text-gray-400 font-mono mt-0.5">{client.slug}</div>
      </td>

      <td className="px-4 py-3">
        <select
          value={client.lead_status}
          onChange={handleLeadStatusChange}
          className={`text-xs font-semibold px-2 py-1 rounded cursor-pointer border-0 appearance-none ${leadBadgeClass(client.lead_status)}`}
        >
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {LEAD_LABELS[s]}
            </option>
          ))}
        </select>
      </td>

      <td className="px-4 py-3">
        {!client.owner_name && client.owner_emails.length === 0 && !client.owner_phone ? (
          <span className="text-gray-400 text-sm">—</span>
        ) : (
          <>
            {client.owner_name && <div className="text-sm text-gray-900">{client.owner_name}</div>}
            {client.owner_emails.map((email) => (
              <div key={email} className="text-xs text-gray-500">{email}</div>
            ))}
            {client.owner_phone && <div className="text-xs text-gray-500">{client.owner_phone}</div>}
          </>
        )}
      </td>

      <td className="px-4 py-3">
        {client.subscription_status ? (
          <>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded ${subBadgeClass(client.subscription_status)}`}
            >
              {client.subscription_status}
            </span>
            {client.subscription_tier && (
              <div className="text-xs text-gray-500 mt-0.5">{client.subscription_tier}</div>
            )}
          </>
        ) : (
          <span className="text-gray-400 text-sm">—</span>
        )}
      </td>

      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
        {client.monthly_price_cents != null ? `$${(client.monthly_price_cents / 100).toFixed(0)}` : '—'}
      </td>

      <td className="px-4 py-3">
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded ${
            client.stripe_setup_fee_paid
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-500'
          }`}
        >
          {client.stripe_setup_fee_paid ? 'Paid' : 'Pending'}
        </span>
      </td>

      <td className="px-4 py-3 w-48">
        {editingNotes ? (
          <textarea
            ref={textareaRef}
            value={notesBuffer}
            onChange={(e) => setNotesBuffer(e.target.value)}
            onBlur={handleNotesBlur}
            rows={3}
            className="w-full text-sm border border-gray-300 rounded px-2 py-1 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        ) : (
          <span
            onClick={handleNotesClick}
            className="text-sm text-gray-600 cursor-pointer hover:text-gray-900 block min-h-6"
          >
            {client.notes || (
              <span className="text-gray-300 italic text-xs">click to add</span>
            )}
          </span>
        )}
      </td>

      <td className="px-4 py-3">
        {client.operator_token ? (
          <CopyToken token={client.operator_token} />
        ) : (
          <span className="text-gray-300 text-xs italic">—</span>
        )}
      </td>

      <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
        {formatDate(client.created_at)}
      </td>
    </tr>
  )
}

export default function OperatorClient({ clients: initialClients }: { clients: Client[] }) {
  const [clients, setClients] = useState(initialClients)
  const [filter, setFilter] = useState('all')

  function handleUpdate(slug: string, patch: Partial<Client>) {
    setClients((prev) => prev.map((c) => (c.slug === slug ? { ...c, ...patch } : c)))
  }

  const counts: Record<string, number> = { all: clients.length }
  for (const s of LEAD_STATUSES) {
    counts[s] = clients.filter((c) => c.lead_status === s).length
  }

  const filtered = filter === 'all' ? clients : clients.filter((c) => c.lead_status === filter)

  const pills = [
    { key: 'all', label: 'All' },
    ...LEAD_STATUSES.map((s) => ({ key: s, label: LEAD_LABELS[s] })),
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Operator Dashboard</h1>

        <div className="flex gap-2 mb-4 flex-wrap">
          {pills.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === key
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
              }`}
            >
              {label}{' '}
              <span className="opacity-60">({counts[key] ?? 0})</span>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                {['Name + URL', 'Lead Status', 'Owner', 'Subscription', '$/mo', 'Setup Fee', 'Notes', 'Token', 'Since'].map(
                  (col) => (
                    <th
                      key={col}
                      className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap"
                    >
                      {col}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-gray-400">
                    No clients found.
                  </td>
                </tr>
              ) : (
                filtered.map((client) => (
                  <ClientRow key={client.slug} client={client} onUpdate={handleUpdate} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
