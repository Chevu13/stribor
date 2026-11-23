import { Phone } from 'lucide-react'
import { images } from '../config/images'
import { site } from '../config/site'
import { ScrollReveal } from './ScrollReveal'

type Props = { title?: string; text?: string; id?: string }

export function ReservationCTA({
  title = 'Sačuvaćemo vam mesto.',
  text = 'Rezervacije primamo telefonom, da odmah znate da li vas sto čeka.',
  id,
}: Props) {
  return (
    <section id={id} className="relative overflow-hidden bg-forest">
      <img src={images.emblem.src} alt="" loading="lazy" className="pointer-events-none absolute top-1/2 -right-[12%] w-[min(70rem,110vw)] max-w-none -translate-y-1/2 opacity-[0.07]" />
      <div className="wrap section relative grid items-end gap-10 lg:grid-cols-[1.5fr_1fr]">
        <ScrollReveal>
          <p className="eyebrow mb-6">Rezervacije</p>
          <h2 className="display display-lg">{title}</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.12}>
          <p className="lede">{text}</p>
          <a href={site.phoneHref} className="btn btn-gold mt-7 w-full sm:w-auto">
            <Phone size={15} aria-hidden /> Pozovi {site.phoneDisplay}
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
