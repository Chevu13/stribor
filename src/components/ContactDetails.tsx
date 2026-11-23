import { ArrowUpRight } from 'lucide-react'
import { site } from '../config/site'

export function MapEmbed({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-pine ${className}`}>
      <iframe
        title="Stribor na mapi, Branka Bajića 9N, Novi Sad"
        src={site.mapsEmbed}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_invert(.9)_contrast(.9)_sepia(.2)]"
      />
    </div>
  )
}

export function ContactDetails() {
  const row = 'grid gap-1 border-t border-cream/15 py-5 sm:grid-cols-[9rem_1fr]'
  const label = 'text-[0.68rem] font-medium tracking-[0.2em] text-gold uppercase sm:pt-2'
  return (
    <div>
      <div className={row}>
        <p className={label}>Adresa</p>
        <a href={site.mapsLink} target="_blank" rel="noreferrer" className="display inline-flex items-start gap-2 text-3xl leading-tight tracking-normal hover:text-gold">
          {site.address}, Novi Sad <ArrowUpRight size={18} className="mt-2 shrink-0" aria-hidden />
        </a>
      </div>
      <div className={row}>
        <p className={label}>Telefon</p>
        <a href={site.phoneHref} className="display text-3xl leading-tight tracking-normal hover:text-gold">{site.phoneDisplay}</a>
      </div>
      <div className={row}>
        <p className={label}>Instagram</p>
        <a href={site.instagram} target="_blank" rel="noreferrer" className="display text-3xl leading-tight tracking-normal break-all hover:text-gold">{site.instagramHandle}</a>
      </div>
      <div className={`${row} border-b`}>
        <p className={label}>Radno vreme</p>
        <div>
          <dl className="space-y-1">
            {site.hours.map((h) => (
              <div key={h.days} className="flex justify-between gap-4"><dt className="text-cream/75">{h.days}</dt><dd className="whitespace-nowrap">{h.time}</dd></div>
            ))}
          </dl>
          <p className="mt-3 text-xs text-mute">{site.hoursNote}</p>
        </div>
      </div>
    </div>
  )
}
