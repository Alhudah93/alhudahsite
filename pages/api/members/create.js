import { query } from '../../../lib/db'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, amount } = req.body || {}
  const normalizedEmail = String(email || '').trim().toLowerCase()
  const amountValue = Number(amount)
  if (!normalizedEmail || !amount || Number.isNaN(amountValue) || amountValue <= 0) {
    return res.status(400).json({ error: 'Invalid payload' })
  }

  try {
    const id = Date.now().toString()
    const created = new Date().toISOString().slice(0, 19).replace('T', ' ')

    // If a member with this email exists, update their amount instead of inserting duplicate
    const existing = await query('SELECT * FROM members WHERE email = ? LIMIT 1', [normalizedEmail])
    if (existing && existing.length) {
      const member = existing[0]
      const prevAmount = Number(member.amount || 0)
      if (prevAmount === amountValue) {
        return res.status(200).json({ ok: true, message: 'You have already made a pledge', member })
      }
      // amount changed — update record
      await query('UPDATE members SET amount = ? WHERE email = ?', [amountValue, normalizedEmail])
      member.amount = amountValue
      return res.status(200).json({ ok: true, updated: true, message: 'Pledge updated', member })
    }

    await query(
      'INSERT INTO members (id, email, amount, created, lastNotified) VALUES (?, ?, ?, ?, NULL)',
      [id, normalizedEmail, amountValue, created]
    )
    const member = { id, email: normalizedEmail, amount: amountValue, created, lastNotified: null }
    return res.status(200).json({ ok: true, member })
  } catch (e) {
    console.error('Create member error:', e?.message || e, { body: req.body })
    return res.status(500).json({ error: e?.message || 'Internal error' })
  }
}
