import { Phone } from 'lucide-react'
import { images } from '../config/images'
import { site } from '../config/site'
import { ContactForm } from '../components/ContactForm'
import { PageHero } from '../components/PageHero'
import { Photo, ScrollReveal } from '../components/ScrollReveal'
import { SectionHeading } from '../components/SectionHeading'
import { Seo } from '../components/Seo'

const occasions = [
  { title: 'Korporativne proslave', text: 'Kolege bez prezentacija. Timsko veče koje će se pominjati i u ponedeljak.', image: images.interior, cls: 'lg:col-span-7', ratio: 'aspect-[16/11]' },
  { title: 'Rođendani', text: 'Godine se ne broje, ture možda. Vi dovedite slavljenika.', image: images.tablePortrait, cls: 'lg:col-span-4 lg:col-start-9 lg:mt-32', ratio: 'aspect-[4/5]' },
  { title: 'Privatna okupljanja', text: 'Godišnjice, povratak starog društva ili veče bez ikakvog povoda.', image: images.beerHand, cls: 'lg:col-span-4 lg:col-start-2 lg:-mt-16', ratio: 'aspect-[4/5]' },
  { title: 'Grupne rezervacije', text: 'Veće društvo, jedan poziv, spojeni stolovi i sampleri na sredini.', image: images.tableWide, cls: 'lg:col-span-6 lg:col-start-7', ratio: 'aspect-[16/11]' },
]

const steps = [
  ['Javite se', 'Pozovite nas ili pripremite upit sa datumom i brojem gostiju.'],
  ['Dogovaramo', 'Proveravamo termin i zajedno biramo šta ide na sto.'],
  ['Vi slavite', 'Dođete sa ekipom. Atmosfera je naša briga.'],
]

export default function Celebrations() {
  return (
    <>
      <Seo title="Proslave" description="Korporativne proslave, rođendani, privatna okupljanja i grupne rezervacije u Striboru, Novi Sad. Pozovite 063 551 132." />
      <PageHero eyebrow="Proslave i grupe" lines={['Vi dovedite', 'ekipu.']} intro="Korporativne proslave, rođendani i okupljanja pod ciglenim lukovima, uz hranu koja nestaje brže od zdravica." image={images.interior} position="center 45%">
        <a href="#upit" className="btn btn-gold">Pošalji upit</a>
        <a href={site.phoneHref} className="btn btn-line"><Phone size={15} aria-hidden /> {site.phoneDisplay}</a>
      </PageHero>

      <section className="section bg-ink">
        <div className="wrap">
          <SectionHeading eyebrow="Povodi" lines={['Svaki razlog', 'je dobar razlog.']} accentLine={1} />
          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-y-20">
            {occasions.map((o) => (
              <ScrollReveal key={o.title} className={o.cls}>
                <article className="group">
                  <Photo image={o.image} parallax={5} className={o.ratio} imgClassName="transition-transform duration-[1.4s] group-hover:scale-105" />
                  <h3 className="display mt-5 text-[clamp(2.3rem,3.6vw,3.6rem)]">{o.title}</h3>
                  <p className="mt-2 max-w-md text-mute">{o.text}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-gold/20 bg-forest">
        <ol className="wrap grid md:grid-cols-3">
          {steps.map(([title, text], i) => (
            <li key={title} className={`py-10 md:px-8 md:py-14 ${i ? 'border-t border-cream/15 md:border-t-0 md:border-l' : 'md:pl-0'}`}>
              <span className="display text-6xl text-gold">{i + 1}</span>
              <h2 className="display mt-3 text-4xl tracking-normal">{title}</h2>
              <p className="mt-2 text-cream/75">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="upit" className="section bg-pine">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Upit" lines={['Recite nam', 'kada i koliko.']} accentLine={1} />
            <p className="lede mt-7">Najbrži put do dogovora je poziv. Termin i detalje potvrđujemo direktno sa vama.</p>
            <a href={site.phoneHref} className="display mt-7 block text-5xl text-gold hover:text-cream">{site.phoneDisplay}</a>
          </div>
          <div className="lg:col-span-6 lg:col-start-7"><ContactForm variant="inquiry" /></div>
        </div>
      </section>
    </>
  )
}
