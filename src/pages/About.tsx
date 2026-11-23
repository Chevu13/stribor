import { Link } from 'react-router-dom'
import { images } from '../config/images'
import { PageHero } from '../components/PageHero'
import { ReservationCTA } from '../components/ReservationCTA'
import { Photo, ScrollReveal } from '../components/ScrollReveal'
import { SectionHeading } from '../components/SectionHeading'
import { Seo } from '../components/Seo'

const values = [
  ['Hrana bez izgovora', 'Pub hrana ne mora da bude usputna. Zato burger, krilca i pomfrit dobijaju istu pažnju kao glavno jelo.'],
  ['Pivo sa karakterom', 'Dvadeset pet različitih craft piva znači da uvek postoji nešto novo za probati.'],
  ['Društvo na prvom mestu', 'Stolovi su tu da se spoje, porcije da se podele, a razgovori da potraju.'],
]

export default function About() {
  return (
    <>
      <Seo title="O nama" description="Stribor je novosadska pivnica pod ciglenim lukovima, posvećena dobroj hrani, craft pivu i dobrom društvu." />
      <PageHero eyebrow="O nama" lines={['Staro mesto.', 'Nova priča.']} intro="Cigla, drvo, topla svetla i sto za koji se uvek nađe još jedna stolica." image={images.interiorArches} position="center" />

      <section className="section bg-ink">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <img src={images.emblem.src} alt={images.emblem.alt} loading="lazy" className="w-40 lg:col-span-3 lg:w-full lg:max-w-64" />
          <div className="lg:col-span-8 lg:col-start-5">
            <ScrollReveal>
              <p className="display text-[clamp(2.3rem,4.6vw,5rem)] leading-[1.02]">Na našem grbu je lik koji duva vetar. Tako izgleda i dobro veče: dođe nenajavljeno, povede svakog za stolom i ne žuri da stane.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-2">
        <Photo image={images.burgerClose} parallax={7} className="aspect-[4/5] lg:aspect-auto lg:min-h-[52rem]" />
        <div className="flex flex-col justify-center bg-pine px-5 py-20 md:px-14 lg:px-[clamp(3rem,7vw,8rem)]">
          <SectionHeading eyebrow="Kultura hrane" lines={['Ozbiljno dobra', 'hrana.']} accentLine={1} />
          <ScrollReveal className="mt-8">
            <p className="lede">Od jutarnjih jaja sa slaninom do poslednjeg sampler tanjira za ceo sto. Naš jelovnik je napravljen za apetit, deljenje i ono „daj da probam”.</p>
            <Link to="/jelovnik" className="btn btn-line mt-8">Jelovnik</Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="grid lg:grid-cols-2">
        <div className="order-2 flex flex-col justify-center bg-forest px-5 py-20 md:px-14 lg:order-1 lg:px-[clamp(3rem,7vw,8rem)]">
          <SectionHeading eyebrow="Kultura piva" lines={['Čaša koja', 'otvara priču.']} accentLine={1} />
          <ScrollReveal className="mt-8">
            <p className="lede">Dobro pivo je razlog da se sedne i izgovor da se ostane. Uz širok izbor craft piva i druženja sa pivarom 3bir, uvek ima o čemu da se priča.</p>
            <Link to="/pivo-i-pice" className="btn btn-line mt-8">Pivo i piće</Link>
          </ScrollReveal>
        </div>
        <Photo image={images.beerHand} parallax={7} className="order-1 aspect-[4/5] lg:order-2 lg:aspect-auto lg:min-h-[52rem]" />
      </section>

      <section className="section bg-ink">
        <div className="wrap">
          <SectionHeading eyebrow="Filozofija" lines={['U šta verujemo.']} size="xl" />
          <ol className="mt-14">
            {values.map(([title, text], i) => (
              <ScrollReveal key={title}>
                <li className="grid gap-3 border-t border-gold/30 py-8 md:grid-cols-12 md:items-baseline">
                  <span className="text-xs text-gold md:col-span-1">0{i + 1}</span>
                  <h3 className="display text-[clamp(2.4rem,4.4vw,4.5rem)] md:col-span-6">{title}</h3>
                  <p className="text-mute md:col-span-5">{text}</p>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>
      <ReservationCTA title="Ostatak priče je za stolom." />
    </>
  )
}
