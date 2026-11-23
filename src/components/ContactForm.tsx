import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy, Phone } from 'lucide-react'
import { site } from '../config/site'
import { localToday, validateForm, type FormValues } from '../lib'

const empty: FormValues = { name: '', email: '', phone: '', eventType: '', guests: '', date: '', message: '' }
const eventTypes = ['Korporativna proslava', 'Rođendan', 'Privatno okupljanje', 'Grupna rezervacija']

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-[0.68rem] font-medium tracking-[0.18em] text-mute uppercase">{label}</label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-[#e29a7f]">{error}</p>}
    </div>
  )
}

export function ContactForm({ variant }: { variant: 'inquiry' | 'contact' }) {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState<ReturnType<typeof validateForm>>({})
  const [ready, setReady] = useState(false)
  const [copied, setCopied] = useState(false)
  const form = useRef<HTMLFormElement>(null)
  const inquiry = variant === 'inquiry'

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof FormValues
    setValues((v) => ({ ...v, [name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const found = validateForm(values, variant)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
    else setReady(true)
  }

  const summary = [
    `Ime: ${values.name}`,
    `Email: ${values.email}`,
    `Telefon: ${values.phone}`,
    ...(inquiry ? [`Vrsta: ${values.eventType}`, `Broj gostiju: ${values.guests}`, `Željeni datum: ${values.date}`] : []),
    ...(values.message ? [`Poruka: ${values.message}`] : []),
  ].join('\n')

  const copy = async () => {
    await navigator.clipboard.writeText(summary)
    setCopied(true)
  }

  const prop = (name: keyof FormValues) => ({
    id: `${variant}-${name}`,
    name,
    value: values[name],
    onChange,
    className: 'field',
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${variant}-${name}-error` : undefined,
  })

  return (
    <AnimatePresence mode="wait" initial={false}>
      {ready ? (
        <motion.div key="ready" role="status" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="border border-gold/40 p-6 md:p-10">
          <p className="eyebrow">Demo verzija</p>
          <h3 className="display mt-5 text-4xl md:text-5xl">Poruka nije poslata.</h3>
          <p className="mt-4 text-cream/80">
            Podaci su ispravni, ali ovaj demo još nema povezan prijem poruka. Da biste stigli do Stribora, pozovite ih i po potrebi iskoristite kopirani tekst upita.
          </p>
          <pre className="mt-5 overflow-x-auto bg-ink/50 p-4 font-sans text-sm whitespace-pre-wrap text-mute">{summary}</pre>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={site.phoneHref} className="btn btn-gold"><Phone size={15} aria-hidden /> Pozovi {site.phoneDisplay}</a>
            <button type="button" onClick={copy} className="btn btn-line">
              {copied ? <Check size={15} aria-hidden /> : <Copy size={15} aria-hidden />} {copied ? 'Kopirano' : 'Kopiraj upit'}
            </button>
            <button type="button" onClick={() => setReady(false)} className="min-h-11 px-3 text-sm text-mute underline underline-offset-4 hover:text-cream">Izmeni podatke</button>
          </div>
        </motion.div>
      ) : (
        <motion.form key="form" ref={form} onSubmit={onSubmit} noValidate exit={{ opacity: 0 }} className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field id={`${variant}-name`} label="Ime i prezime" error={errors.name}>
              <input {...prop('name')} autoComplete="name" />
            </Field>
          </div>
          <Field id={`${variant}-email`} label="Email" error={errors.email}>
            <input {...prop('email')} type="email" autoComplete="email" inputMode="email" />
          </Field>
          <Field id={`${variant}-phone`} label="Telefon" error={errors.phone}>
            <input {...prop('phone')} type="tel" autoComplete="tel" inputMode="tel" />
          </Field>
          {inquiry && (
            <>
              <div className="sm:col-span-2">
                <Field id="inquiry-eventType" label="Vrsta proslave" error={errors.eventType}>
                  <select {...prop('eventType')}>
                    <option value="">Izaberite</option>
                    {eventTypes.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </Field>
              </div>
              <Field id="inquiry-guests" label="Broj gostiju" error={errors.guests}>
                <input {...prop('guests')} type="number" min={1} inputMode="numeric" />
              </Field>
              <Field id="inquiry-date" label="Željeni datum" error={errors.date}>
                <input {...prop('date')} type="date" min={localToday()} />
              </Field>
            </>
          )}
          <div className="sm:col-span-2">
            <Field id={`${variant}-message`} label={inquiry ? 'Poruka (opciono)' : 'Poruka'} error={errors.message}>
              <textarea {...prop('message')} rows={4} className="field resize-y" />
            </Field>
          </div>
          <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
            <button type="submit" className="btn btn-gold w-full sm:w-auto">{inquiry ? 'Pripremi upit' : 'Pripremi poruku'}</button>
            <p className="text-sm text-mute">Demo forma: proverava unos, ali ništa ne šalje.</p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
