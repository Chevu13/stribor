import { ArrowUpRight } from 'lucide-react'
import { images } from '../config/images'
import { site } from '../config/site'
import { eventFormats, events } from '../data/events'
import { splitEvents } from '../lib'
import { EventCard } from '../components/EventCard'
import { PageHero } from '../components/PageHero'
import { ReservationCTA } from '../components/ReservationCTA'
import { ScrollReveal } from '../components/ScrollReveal'
import { SectionHeading } from '../components/SectionHeading'
import { Seo } from '../components/Seo'

export default function Events() {
  const { upcoming, past } = splitEvents(events)
  return (
    <>
      <Seo title="Događaji" description="Akustične večeri, živa muzika i pivska druženja u Striboru u Novom Sadu." />
      <PageHero eyebrow="Događaji" lines={['Veče počinje', 'u Striboru.']} intro="Akustične večeri, živa svirka i pivska druženja. Staro mesto, nova priča, nova energija." image={images.barArches} position="center 45%" />

      <section className="section bg-ink">
        <div className="wrap">
          <SectionHeading eyebrow="Uskoro" lines={['Najavljeno.']} size="xl" />
          <div className="mt-12 space-y-14">
            {upcoming.length ? (
              upcoming.map((e, i) => <EventCard key={e.id} event={e} flip={i % 2 === 1} />)
            ) : (
              <ScrollReveal>
                <div className="grid gap-6 border-y border-gold/30 py-10 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <p className="display text-4xl tracking-normal md:text-5xl">Sledeći datum još nije objavljen.</p>
                    <p className="mt-3 text-mute">Nove večeri najavljujemo na Instagramu. Tamo saznaš prvi.</p>
                  </div>
                  <a href={site.instagram} target="_blank" rel="noreferrer" className="btn btn-gold">Prati najave <ArrowUpRight size={15} aria-hidden /></a>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      <section className="border-y border-gold/20 bg-forest">
        <ul className="wrap grid sm:grid-cols-2 lg:grid-cols-4">
          {eventFormats.map((f, i) => (
            <li key={f.title} className={`py-10 sm:px-6 ${i ? 'border-t border-cream/15 sm:border-t-0 lg:border-l' : ''}`}>
              <h2 className="display text-[2.4rem] tracking-normal">{f.title}</h2>
              <p className="mt-3 text-sm text-cream/75">{f.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section bg-ink">
        <div className="wrap">
          <SectionHeading eyebrow="Arhiva" lines={['Bilo je', 'dobro.']} size="xl" accentLine={1} />
          <div className="mt-12 space-y-14">
            {past.map((e, i) => <EventCard key={e.id} event={e} past flip={i % 2 === 1} />)}
          </div>
        </div>
      </section>
      <ReservationCTA title="Za sledeće veče, javi se na vreme." />
    </>
  )
}
