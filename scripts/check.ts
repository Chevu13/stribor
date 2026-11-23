// Run: npm run check
import assert from 'node:assert/strict'
import { formatPrice, matchesSearch, splitEvents, validateForm } from '../src/lib.ts'

assert.equal(formatPrice(860), '860 RSD')
assert.equal(formatPrice(1030), '1.030 RSD')
assert.ok(matchesSearch('pileci', 'Pileći taquitos'))
assert.ok(matchesSearch('djak', 'Đak'))
assert.ok(!matchesSearch('losos', 'Original pomfrit'))

const { upcoming, past } = splitEvents(
  [{ date: '2026-09-11' }, { date: null }, { date: '2026-12-01' }, { date: '2026-11-23' }],
  '2026-11-23',
)
assert.deepEqual(upcoming.map((e) => e.date), ['2026-11-23', '2026-12-01'])
assert.deepEqual(past.map((e) => e.date), ['2026-09-11', null])

const ok = { name: 'Ana Anić', email: 'ana@primer.rs', phone: '063 123 456', eventType: 'Rođendan', guests: '12', date: '2026-12-01', message: '' }
assert.deepEqual(validateForm(ok, 'inquiry', '2026-11-23'), {})
assert.ok(validateForm({ ...ok, date: '2026-11-01' }, 'inquiry', '2026-11-23').date)
assert.ok(validateForm({ ...ok, guests: '0' }, 'inquiry', '2026-11-23').guests)
assert.ok(validateForm({ ...ok, email: 'ana@' }, 'inquiry', '2026-11-23').email)
assert.ok(validateForm(ok, 'contact', '2026-11-23').message)
console.log('ok')
