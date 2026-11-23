import { images } from '../config/images'
import { ContactDetails, MapEmbed } from '../components/ContactDetails'
import { ContactForm } from '../components/ContactForm'
import { PageHero } from '../components/PageHero'
import { ReservationCTA } from '../components/ReservationCTA'
import { SectionHeading } from '../components/SectionHeading'
import { Seo } from '../components/Seo'

export default function Contact() {
  return (
    <>
      <Seo title="Kontakt" description="Stribor, Branka Bajića 9N, Novi Sad. Telefon za rezervacije: 063 551 132. Adresa, mapa, radno vreme i Instagram." />
      <PageHero eyebrow="Kontakt" lines={['Vidimo se', 'u Striboru.']} intro="Branka Bajića 9N, Novi Sad. Dođi na jedno, ostani na još jednu turu." image={images.tableWide} position="center" />
      <ReservationCTA id="rezervacija" title="Rezerviši sto jednim pozivom." text="Rezervacije primamo telefonom. Tako odmah dobijate pravu potvrdu, bez čekanja." />
      <section className="grid bg-ink lg:grid-cols-2">
        <div className="wrap py-20 lg:px-[clamp(3rem,6vw,7rem)]">
          <SectionHeading eyebrow="Gde smo" lines={['Lako nas je', 'naći.']} accentLine={1} />
          <div className="mt-11"><ContactDetails /></div>
        </div>
        <MapEmbed className="min-h-[26rem]" />
      </section>
      <section className="section border-t border-gold/20 bg-pine">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Poruka" lines={['Pišite nam.']} />
            <p className="lede mt-7">Za pitanja, saradnju ili pohvalu kuhinji. Za rezervaciju je telefon najbrži.</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7"><ContactForm variant="contact" /></div>
        </div>
      </section>
    </>
  )
}
