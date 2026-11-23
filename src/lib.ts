export const formatPrice = (rsd: number) =>
  `${String(rsd).replace(/\B(?=(\d{3})+$)/g, '.')} RSD`

// Pretraga radi i bez naših slova: "cevap" nalazi "ćevap", "dj" nalazi "đ".
export const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/đ/g, 'dj')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

export const matchesSearch = (query: string, ...fields: string[]) => {
  const haystack = normalize(fields.join(' '))
  return normalize(query).split(/\s+/).filter(Boolean).every((word) => haystack.includes(word))
}

export const localToday = (now = new Date()) =>
  `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

// Događaj bez pune potvrđene godine (date: null) uvek ide u arhivu.
export function splitEvents<T extends { date: string | null }>(events: T[], today = localToday()) {
  const upcoming = events.filter((e) => e.date !== null && e.date >= today)
  const past = events.filter((e) => e.date === null || e.date < today)
  upcoming.sort((a, b) => a.date!.localeCompare(b.date!))
  past.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
  return { upcoming, past }
}

export type FormValues = Record<
  'name' | 'email' | 'phone' | 'eventType' | 'guests' | 'date' | 'message',
  string
>

export function validateForm(v: FormValues, variant: 'inquiry' | 'contact', today = localToday()) {
  const errors: Partial<Record<keyof FormValues, string>> = {}
  if (v.name.trim().length < 2) errors.name = 'Unesite ime i prezime.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) errors.email = 'Unesite ispravnu email adresu.'
  const digits = v.phone.replace(/\D/g, '').length
  if (!/^\+?[\d\s/-]+$/.test(v.phone.trim()) || digits < 8 || digits > 15) {
    errors.phone = 'Unesite ispravan broj telefona.'
  }
  if (variant === 'inquiry') {
    if (!v.eventType) errors.eventType = 'Izaberite vrstu proslave.'
    if (!/^\d+$/.test(v.guests) || Number(v.guests) < 1) errors.guests = 'Unesite broj gostiju.'
    if (!v.date) errors.date = 'Izaberite željeni datum.'
    else if (v.date < today) errors.date = 'Datum ne može biti u prošlosti.'
  } else if (v.message.trim().length < 10) {
    errors.message = 'Napišite poruku od bar 10 karaktera.'
  }
  return errors
}
