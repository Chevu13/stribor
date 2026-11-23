import { Link } from 'react-router-dom'
import { images } from '../config/images'
import { navLinks, site } from '../config/site'

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/20 bg-ink pt-20">
      <div className="wrap grid gap-12 pb-16 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <img src={images.emblem.src} alt="" loading="lazy" className="mb-6 w-28" />
          <p className="display max-w-xs text-3xl">Dobro pivo. Ozbiljno dobra hrana.</p>
        </div>
        <nav aria-label="Navigacija u podnožju">
          <h2 className="eyebrow mb-5">Mapa</h2>
          <ul className="space-y-1.5">
            <li><Link to="/" className="inline-block py-0.5 text-cream/80 hover:text-gold">Početna</Link></li>
            {navLinks.map((l) => (
              <li key={l.to}><Link to={l.to} className="inline-block py-0.5 text-cream/80 hover:text-gold">{l.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="eyebrow mb-5">Kontakt</h2>
          <address className="space-y-2 text-cream/80 not-italic">
            <a href={site.mapsLink} target="_blank" rel="noreferrer" className="block hover:text-gold">{site.address}<br />{site.city}</a>
            <a href={site.phoneHref} className="block hover:text-gold">{site.phoneDisplay}</a>
            <a href={site.instagram} target="_blank" rel="noreferrer" className="block hover:text-gold">{site.instagramHandle}</a>
          </address>
        </div>
        <div>
          <h2 className="eyebrow mb-5">Radno vreme</h2>
          <dl className="space-y-3 text-sm">
            {site.hours.map((h) => (
              <div key={h.days}><dt className="text-mute">{h.days}</dt><dd>{h.time}</dd></div>
            ))}
          </dl>
        </div>
      </div>
      <p aria-hidden className="display pointer-events-none text-center text-[23vw] leading-[0.72] tracking-[-0.01em] text-forest select-none">STRIBOR</p>
      <div className="relative border-t border-cream/10 bg-ink">
        <p className="wrap flex flex-col gap-1 py-5 text-xs text-mute sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Stribor Food & Beer</span>
          <span>Demo predlog redizajna, Unflow web studio</span>
        </p>
      </div>
    </footer>
  )
}
