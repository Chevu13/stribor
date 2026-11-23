import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Phone } from 'lucide-react'
import { images, instagramGallery } from '../config/images'
import { reservationLink, site } from '../config/site'
import { eventFormats, events, showTonight } from '../data/events'
import { menu, menuSource } from '../data/menu'
import { formatPrice, splitEvents } from '../lib'
import { ContactDetails, MapEmbed } from '../components/ContactDetails'
import { ImageGallery } from '../components/ImageGallery'
import { Photo, Reel, ScrollReveal, ease } from '../components/ScrollReveal'
import { SectionHeading } from '../components/SectionHeading'
import { Seo } from '../components/Seo'

let introPlayed = false

function Hero() {
  const [intro] = useState(() => !introPlayed)
  introPlayed = true
  const base = intro ? 0.5 : 0.2
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%'])

  return (
    <section ref={ref} className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-ink">
      {intro && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[80] grid place-items-center bg-ink"
          initial={{ y: 0 }}
          animate={{ y: '-100%' }}
          transition={{ duration: 0.45, delay: 0.35, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.img
            src={images.emblem.src}
            alt=""
            className="w-44 md:w-64"
            initial={{ opacity: 0, x: -26, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.35, ease }}
          />
        </motion.div>
      )}

      <motion.div style={reduced ? undefined : { y: imageY }} className="absolute inset-0 h-[116%] will-change-transform">
        <picture>
          <source media="(max-width: 767px)" srcSet={images.heroMobile.src} />
          <img src={images.heroDesktop.src} alt={images.heroDesktop.alt} fetchPriority="high" className="kenburns h-full w-full object-cover object-[50%_40%]" />
        </picture>
      </motion.div>
      <div className="absolute inset-0 bg-ink/72" />

      <div className="wrap relative flex flex-col items-center pt-24 pb-10 text-center">
        <motion.img
          src={images.emblem.src}
          alt=""
          className="mb-4 w-20 md:w-24"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: base, ease }}
        />
        <motion.h1 style={reduced ? undefined : { y: titleY }} className="font-display font-medium">
          <span className="sr-only">Stribor. Food. Beer. Experience.</span>
          <span aria-hidden className="flex justify-center overflow-hidden py-[0.04em] pl-[0.07em] text-[min(16.5vw,24svh)] leading-none tracking-[0.07em] md:text-[min(13.5vw,25svh)]">
            {'STRIBOR'.split('').map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.65, delay: base + i * 0.03, ease }}
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.div
          className="flex w-full flex-col items-center"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: base + 0.25, ease }}
        >
          <p aria-hidden className="mt-3 flex w-full max-w-3xl items-center gap-4 text-[0.68rem] font-medium tracking-[0.32em] whitespace-nowrap text-gold uppercase md:text-[0.78rem]">
            <span className="h-px flex-1 bg-gold/60" />Food. Beer. Experience.<span className="h-px flex-1 bg-gold/60" />
          </p>
          <p className="display mt-6 text-[1.7rem] leading-tight tracking-normal lg:text-[2.1rem]">
            Dobro pivo. Ozbiljno dobra hrana.<br />
            <em className="text-gold">Mesto za još jednu turu.</em>
          </p>
          <div className="mt-8 grid w-full grid-cols-1 gap-2.5 min-[520px]:w-auto min-[520px]:grid-cols-2">
            <Link to="/jelovnik" className="btn btn-gold">Pogledaj jelovnik</Link>
            <Link to={reservationLink} className="btn btn-line">Rezerviši sto</Link>
          </div>
        </motion.div>
      </div>

      <div aria-hidden className="absolute top-1/2 right-5 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex lg:right-10">
        <span className="text-[0.6rem] tracking-[0.3em] text-cream/75 uppercase [writing-mode:vertical-rl]">Skroluj</span>
        <span className="h-16 w-px bg-cream/20"><span className="scroll-line block h-full w-px bg-gold" /></span>
      </div>
    </section>
  )
}

function Marquee() {
  const words = ['Dobro pivo', 'Ozbiljno dobra hrana', 'Još jedna tura', 'Branka Bajića 9N']
  const row = [...words, ...words]
  return (
    <div aria-hidden className="overflow-hidden border-y border-gold/25 bg-pine py-4">
      <div className="marquee">
        {[...row, ...row].map((w, i) => (
          <span key={i} className="display flex items-center text-3xl tracking-normal italic md:text-4xl">
            <span className="px-7">{w}</span><span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          </span>
        ))}
      </div>
    </div>
  )
}

function Story() {
  return (
    <section className="grid lg:grid-cols-2">
      <div className="relative lg:order-2">
        <Photo image={images.interior} parallax={7} className="aspect-square lg:sticky lg:top-0 lg:aspect-auto lg:h-svh" />
      </div>
      <div className="wrap flex flex-col justify-center py-20 lg:min-h-[120svh] lg:px-[clamp(3rem,6vw,7rem)] lg:py-32">
        <SectionHeading eyebrow="Stribor od 2021." lines={['Nije samo pivnica.', 'To je Stribor.']} accentLine={1} />
        <ScrollReveal className="mt-10 space-y-6">
          <p className="lede">Ispod ciglenih lukova, na Branka Bajića, svako veče počne isto: „samo jedno pivo”. A onda stigne burger, pa društvo, pa još jedna tura.</p>
          <p className="lede">Ovde se hrana ne pravi usput, a pivo se ne bira nasumice. Stribor je mesto za one koji vole da sede dugo, jedu dobro i znaju šta im je u čaši.</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1} className="mt-12 grid grid-cols-2 border-t border-gold/40 pt-6">
          <div><p className="display text-6xl text-gold md:text-7xl">25</p><p className="mt-2 text-sm text-mute">različitih craft piva</p></div>
          <div><p className="display text-6xl text-gold md:text-7xl">2021</p><p className="mt-2 text-sm text-mute">godina na našem grbu</p></div>
        </ScrollReveal>
        <Link to="/o-nama" className="link-line mt-12 inline-flex w-fit items-center gap-3 pb-1 text-sm tracking-[0.12em] uppercase">Naša priča <ArrowRight size={15} aria-hidden /></Link>
      </div>
    </section>
  )
}

const showcase = [
  { title: 'Burgeri', detail: 'Original cheese, Double Smash, Black Angus', from: 860, image: images.burgerClose },
  { title: 'Krilca', detail: 'Krilca i otkoštena krilca, uz sos po izboru', from: 690, image: images.wings },
  { title: 'Pomfriti', detail: 'Volcano, tartuf i parmezan, bacon loaded', from: 420, image: images.fries },
  { title: 'Za ceo sto', detail: 'Small i Super sampler, za društvo koje deli', from: 1800, image: images.tableWide },
]

function Food() {
  const [active, setActive] = useState(0)
  return (
    <section className="section bg-ink">
      <div className="wrap">
        <SectionHeading eyebrow="Iz naše kuhinje" lines={['Ukus koji', 'se pamti.']} size="xl" accentLine={1} />
        <div className="mt-12 grid gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          <div className="relative aspect-[4/5] overflow-hidden bg-pine sm:aspect-[16/11] lg:col-span-7 lg:aspect-[5/4]">
            <AnimatePresence initial={false}>
              <motion.img
                key={showcase[active].title}
                src={showcase[active].image.src}
                alt={showcase[active].image.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ clipPath: 'inset(0 0 0 100%)', scale: 1.12 }}
                animate={{ clipPath: 'inset(0 0 0 0%)', scale: 1 }}
                exit={{ opacity: 0.999 }}
                transition={{ duration: 0.95, ease }}
              />
            </AnimatePresence>
          </div>
          <div className="flex flex-col justify-between lg:col-span-5">
            <ul>
              {showcase.map((row, i) => (
                <li key={row.title} className="border-t border-cream/15 last:border-b">
                  <button
                    aria-pressed={active === i}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="group grid w-full grid-cols-[1fr_auto] items-baseline gap-x-4 py-4 text-left md:py-5"
                  >
                    <span className={`display text-[clamp(2.4rem,4.2vw,4.4rem)] transition-all duration-500 ${active === i ? 'translate-x-2 text-gold italic' : ''}`}>{row.title}</span>
                    <span className="text-xs whitespace-nowrap text-gold">od {formatPrice(row.from)}</span>
                    <span className="col-span-2 mt-1 text-sm text-mute">{row.detail}</span>
                  </button>
                </li>
              ))}
            </ul>
            <Link to="/jelovnik" className="btn btn-gold mt-8 w-full sm:w-fit">Istraži jelovnik <ArrowRight size={15} aria-hidden /></Link>
          </div>
        </div>
      </div>
    </section>
  )
}

const priceList = ['juneci-burgeri', 'piletina', 'pomfrit'].flatMap((id) => menu.filter((c) => c.id === id))

function PriceList() {
  return (
    <section className="section border-t border-gold/20 bg-pine">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Cenovnik" lines={['Šta jedemo', 'večeras?']} accentLine={1} />
          <Link to="/jelovnik" className="btn btn-line w-full md:w-auto">Ceo jelovnik <ArrowRight size={15} aria-hidden /></Link>
        </div>
        <div className="mt-12 grid gap-12 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-16">
          {priceList.map((category) => (
            <ScrollReveal key={category.id}>
              <h3 className="display border-b border-gold/50 pb-3 text-4xl tracking-normal text-gold">{category.title}</h3>
              <ul>
                {category.items.slice(0, 6).map((item) => (
                  <li key={item.name} className="group flex items-baseline gap-3 border-b border-cream/10 py-3">
                    <span className="min-w-0 text-[0.95rem] transition-[color,translate] duration-300 group-hover:translate-x-1 group-hover:text-gold">{item.name}</span>
                    <span aria-hidden className="min-w-4 flex-1 border-b border-dotted border-cream/25" />
                    <span className="shrink-0 text-sm font-medium whitespace-nowrap text-gold">{formatPrice(item.price)}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>
        <p className="mt-8 text-xs text-mute">{menuSource}</p>
      </div>
    </section>
  )
}

function Beer() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['6%', '-14%'])
  return (
    <section ref={ref} className="relative overflow-hidden bg-forest py-20 lg:py-32">
      <motion.p aria-hidden style={reduced ? undefined : { x }} className="display pointer-events-none absolute top-6 left-0 text-[30vw] leading-none whitespace-nowrap text-pine will-change-transform select-none lg:top-2">
        još jedna tura
      </motion.p>
      <div className="wrap relative grid items-center gap-12 lg:grid-cols-12">
        <ScrollReveal className="mx-auto w-full max-w-[26rem] lg:col-span-4 lg:col-start-2">
          <div className="arch relative aspect-[9/15] overflow-hidden border border-gold/50 bg-ink p-2">
            <Reel className="arch h-full w-full object-cover" label="Kratak video iz Stribora: točenje piva i atmosfera lokala" />
          </div>
        </ScrollReveal>
        <div className="lg:col-span-6 lg:col-start-7">
          <SectionHeading eyebrow="Pivo" lines={['Za dobro društvo.', 'I još bolje pivo.']} accentLine={1} />
          <ScrollReveal className="mt-9">
            <p className="lede">Čak 25 različitih craft piva, birano za one koji žele nešto više od „daj mi jedno točeno”. Probaj novo, vrati se omiljenom, pa pitaj šta je sledeće.</p>
            <Link to="/pivo-i-pice" className="btn btn-gold mt-9 w-full sm:w-auto">Pogledaj ponudu pića <ArrowRight size={15} aria-hidden /></Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

function Atmosphere() {
  return (
    <section className="section overflow-hidden bg-ink">
      <div className="wrap">
        <SectionHeading eyebrow="Atmosfera" lines={['Ovde veče ima', 'svoju priču.']} size="xl" accentLine={1} className="text-right" />
        <div className="mt-14 grid grid-cols-6 gap-2.5 md:mt-24 md:grid-cols-12 md:gap-5">
          <Photo image={images.interiorArches} parallax={8} className="col-span-6 aspect-[16/10] md:col-span-8 md:aspect-[16/9]" />
          <Photo image={images.burgerStacked} parallax={6} className="col-span-3 aspect-[3/4] md:col-span-3 md:col-start-10 md:mt-28" />
          <Photo image={images.wings} parallax={6} className="col-span-3 mt-10 aspect-[3/4] md:col-span-3 md:col-start-2 md:-mt-24" />
          <div className="col-span-6 self-center py-5 md:col-span-3 md:px-2">
            <p className="display text-4xl italic md:text-[2.9rem]">„Još samo jednu”, rekao je svako ko je ovde ostao do kraja.</p>
          </div>
          <Photo image={images.tablePortrait} parallax={7} className="col-span-4 aspect-square md:col-span-5 md:-mt-20" />
          <Photo image={images.beerHand} parallax={6} className="col-span-2 aspect-[2/4] md:hidden" />
        </div>
      </div>
    </section>
  )
}

function EventsTeaser() {
  const { upcoming, past } = splitEvents(events)
  const featured = upcoming[0] ?? past[0]
  return (
    <section className="section border-t border-gold/20 bg-pine">
      <div className="wrap grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeading eyebrow="Događaji" lines={['Večeri zbog', 'kojih se izlazi.']} accentLine={1} />
          <ul className="mt-12">
            {eventFormats.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.05}>
                <li className="grid gap-1 border-t border-cream/15 py-5 md:grid-cols-[3rem_1fr_1.25fr] md:items-baseline">
                  <span className="hidden text-xs text-gold md:block">0{i + 1}</span>
                  <h3 className="display text-4xl tracking-normal">{f.title}</h3>
                  <p className="text-sm text-mute">{f.text}</p>
                </li>
              </ScrollReveal>
            ))}
          </ul>
          <Link to="/dogadjaji" className="btn btn-gold mt-8 w-full sm:w-auto">Pogledaj događaje <ArrowRight size={15} aria-hidden /></Link>
        </div>
        <ScrollReveal className="lg:col-span-4 lg:col-start-9">
          <Link to="/dogadjaji" className="group block">
            <Photo image={images.beerHand} className="aspect-[4/5]" imgClassName="transition-transform duration-[1.4s] group-hover:scale-105" />
            <p className="mt-4 text-[0.68rem] tracking-[0.2em] text-gold uppercase">{upcoming.length ? 'Sledeće' : 'Poslednje održano'}</p>
            <p className="display mt-1 text-3xl tracking-normal">{featured.title}</p>
            <p className="text-sm text-mute">{featured.dateLabel}, {featured.time}</p>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}

function Tonight() {
  return (
    <section className="border-t border-gold/20 bg-ink py-16 lg:py-24">
      <div className="wrap mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[auto_1fr] md:gap-16">
        <ScrollReveal className="mx-auto w-52 md:w-64">
          <div className="arch border border-gold/50 p-1.5">
            <div className="arch overflow-hidden">
              <Photo image={images.musician} reveal={false} className="aspect-[3/4]" imgClassName="object-top" />
            </div>
          </div>
        </ScrollReveal>
        <div>
          <SectionHeading eyebrow="Živa muzika" lines={['Večeras', 'nastupa.']} accentLine={1} />
          <ScrollReveal className="mt-6">
            <p className="lede">Gitara, glas i pivo u ruci. Javi se na vreme ako želiš dobar sto.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to={reservationLink} className="btn btn-gold">Rezerviši sto</Link>
              <Link to="/dogadjaji" className="btn btn-line">Svi događaji</Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

function PrivateEvents() {
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden">
      <Photo image={images.interiorArches} parallax={10} reveal={false} className="!absolute inset-0" />
      <div className="absolute inset-0 bg-ink/68" />
      <div className="wrap relative py-24 text-center">
        <SectionHeading eyebrow="Proslave i firme" lines={['Okupi ekipu.', 'Mi brinemo za atmosferu.']} accentLine={1} size="xl" />
        <ScrollReveal className="mx-auto mt-9 max-w-2xl">
          <p className="text-lg text-cream/90">Korporativne proslave, rođendani i grupna okupljanja. Recite nam koliko vas je, ostalo dogovaramo zajedno.</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/proslave#upit" className="btn btn-gold">Pošalji upit</Link>
            <a href={site.phoneHref} className="btn btn-line"><Phone size={15} aria-hidden /> {site.phoneDisplay}</a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function Instagram() {
  return (
    <section className="section bg-ink">
      <div className="wrap">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionHeading eyebrow="Instagram" lines={[site.instagramHandle]} />
          <a href={site.instagram} target="_blank" rel="noreferrer" className="btn btn-line w-full md:w-auto">Zaprati nas <ArrowUpRight size={15} aria-hidden /></a>
        </div>
        <ImageGallery items={instagramGallery} />
      </div>
    </section>
  )
}

function ContactTeaser() {
  return (
    <section className="grid border-t border-gold/20 bg-pine lg:grid-cols-2">
      <div className="wrap py-20 lg:px-[clamp(3rem,6vw,7rem)] lg:py-28">
        <SectionHeading eyebrow="Kontakt" lines={['Vidimo se', 'u Striboru.']} accentLine={1} />
        <div className="mt-11"><ContactDetails /></div>
        <Link to={reservationLink} className="btn btn-gold mt-9 w-full sm:w-auto">Rezerviši sto</Link>
      </div>
      <MapEmbed className="min-h-[24rem]" />
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Seo title="Pivnica i gastropub" description="Stribor Food & Beer, Branka Bajića 9N, Novi Sad. Burgeri, krilca, 25 craft piva, akustične večeri i proslave. Rezervacije: 063 551 132." />
      <Hero />
      <Marquee />
      <Story />
      <Food />
      <PriceList />
      <Beer />
      <Atmosphere />
      <EventsTeaser />
      {showTonight && <Tonight />}
      <PrivateEvents />
      <Instagram />
      <ContactTeaser />
    </>
  )
}
