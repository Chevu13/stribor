import { images } from '../config/images'
import { craftBeers, drinks } from '../data/drinks'
import { formatPrice } from '../lib'
import { PageHero } from '../components/PageHero'
import { ReservationCTA } from '../components/ReservationCTA'
import { Photo, Reel, ScrollReveal } from '../components/ScrollReveal'
import { SectionHeading } from '../components/SectionHeading'
import { Seo } from '../components/Seo'

const worlds = [
  { n: '01', title: 'Craft izbor', text: 'Dvadeset pet različitih craft piva, pažljivo biranih i za one sa najizbirljivijim nepcem.' },
  { n: '02', title: '3bir', text: 'Pivara čija craft piva sipamo na našim Beer & Aperitif druženjima, i ime koje stoji uz Stribor.' },
  { n: '03', title: 'Klasika', text: 'Kada znaš tačno šta hoćeš: hladno, poznato i bez razmišljanja.' },
  { n: '04', title: 'Bez alkohola', text: 'Limunada, voda i osveženje za one koji večeras voze ekipu kući.' },
]

export default function Drinks() {
  return (
    <>
      <Seo title="Pivo i piće" description="25 različitih craft piva u Striboru u Novom Sadu, 3bir druženja i ponuda pića uz dobru hranu." />
      <PageHero eyebrow="Pivo i piće" lines={['Prvo pivo', 'je tek početak.']} intro="Izbor za radoznale, klasika za sigurne i dovoljno razloga da ostaneš na još jedno." image={images.beerHand} position="center 30%" />

      <section className="section bg-forest">
        <div className="wrap grid items-end gap-10 lg:grid-cols-12">
          <p className="display text-[clamp(11rem,34vw,31rem)] leading-[0.72] text-gold lg:col-span-7">25</p>
          <div className="lg:col-span-5">
            <SectionHeading lines={['različitih', 'craft piva.']} accentLine={1} />
            <ScrollReveal className="mt-7">
              <p className="lede">Neko dolazi zbog gorčine, neko zbog arome, a neko jer mu je društvo reklo da mora da proba. Svi su u pravu.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section bg-ink">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="arch mx-auto aspect-[9/15] max-w-md overflow-hidden lg:sticky lg:top-28">
              <Reel className="h-full w-full object-cover" label="Točenje piva i atmosfera u Striboru" />
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading eyebrow="Šta je u čaši" lines={['Četiri načina', 'da nazdraviš.']} accentLine={1} />
            <ul className="mt-12">
              {worlds.map((w) => (
                <ScrollReveal key={w.n}>
                  <li className="grid grid-cols-[2.5rem_1fr] border-t border-cream/15 py-6">
                    <span className="pt-2 text-xs text-gold">{w.n}</span>
                    <div>
                      <h3 className="display text-[2.6rem] tracking-normal">{w.title}</h3>
                      <p className="mt-2 text-mute">{w.text}</p>
                    </div>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section border-t border-gold/20 bg-pine">
        <div className="wrap">
          <SectionHeading eyebrow="Karta pića" lines={['Šta sipamo.']} size="xl" />
          <div className="mt-14 grid gap-14 lg:grid-cols-3">
            <div>
              <h3 className="display border-b border-gold/40 pb-3 text-4xl tracking-normal">Craft piva</h3>
              {craftBeers.length ? (
                <ul>{craftBeers.map((d) => <DrinkRow key={d.name} {...d} />)}</ul>
              ) : (
                <p className="mt-5 text-mute">Izbor se menja, zato aktuelnu listu od 25 piva i cene pitajte za šankom ili telefonom.</p>
              )}
            </div>
            {drinks.map((group) => (
              <div key={group.title}>
                <h3 className="display border-b border-gold/40 pb-3 text-4xl tracking-normal">{group.title}</h3>
                <ul>{group.items.map((d) => <DrinkRow key={d.name} {...d} />)}</ul>
              </div>
            ))}
          </div>
          <p className="mt-12 text-sm text-mute">Prikazane cene su sa Stribor Wolt profila, preuzete 23.11.2026. Cene u lokalu mogu se razlikovati. Alkohol se služi samo punoletnim gostima.</p>
        </div>
      </section>

      <Photo image={images.interiorArches} parallax={9} className="h-[60svh]" />
      <ReservationCTA title="Tvoja tura te čeka." />
    </>
  )
}

function DrinkRow({ name, detail, price }: { name: string; detail?: string; price: number }) {
  return (
    <li className="flex items-baseline gap-3 border-b border-cream/10 py-3.5">
      <span className="display text-2xl tracking-normal">{name}</span>
      {detail && <span className="text-xs text-mute">{detail}</span>}
      <span aria-hidden className="flex-1 border-b border-dotted border-cream/25" />
      <span className="text-sm whitespace-nowrap text-gold">{formatPrice(price)}</span>
    </li>
  )
}
