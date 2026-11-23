import type { StriborEvent } from '../data/events'
import { Photo, ScrollReveal } from './ScrollReveal'

export function EventCard({ event, past, flip }: { event: StriborEvent; past?: boolean; flip?: boolean }) {
  return (
    <ScrollReveal>
      <article className="group grid border-t border-gold/30 md:grid-cols-12">
        <Photo
          image={event.image}
          className={`aspect-[4/3] md:col-span-5 md:aspect-auto md:min-h-[30rem] ${flip ? 'md:order-2' : ''}`}
          imgClassName={`transition-transform duration-[1.4s] ease-out group-hover:scale-105 ${past ? 'saturate-[.7]' : ''}`}
        />
        <div className={`flex flex-col justify-between gap-10 py-8 md:col-span-7 md:py-10 ${flip ? 'md:pr-14' : 'md:pl-14'}`}>
          <div>
            <p className="eyebrow">{past ? `Održano · ${event.type}` : event.type}</p>
            <h3 className="display mt-5 text-[clamp(2.7rem,5.5vw,5.5rem)]">{event.title}</h3>
            <p className="lede mt-5">{event.description}</p>
          </div>
          <dl className="grid gap-4 border-t border-cream/10 pt-5 text-sm sm:grid-cols-3">
            <div><dt className="text-mute">Datum</dt><dd className="mt-1">{event.dateLabel}</dd></div>
            <div><dt className="text-mute">Vreme</dt><dd className="mt-1">{event.time}</dd></div>
            {event.price && <div><dt className="text-mute">Cena</dt><dd className="mt-1">{event.price}</dd></div>}
          </dl>
        </div>
      </article>
    </ScrollReveal>
  )
}
