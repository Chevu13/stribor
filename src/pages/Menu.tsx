import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Search, X } from 'lucide-react'
import { images } from '../config/images'
import { site } from '../config/site'
import { menu, menuSource } from '../data/menu'
import { matchesSearch } from '../lib'
import { MenuCategories } from '../components/MenuCategories'
import { MenuItem } from '../components/MenuItem'
import { PageHero } from '../components/PageHero'
import { ReservationCTA } from '../components/ReservationCTA'
import { Photo } from '../components/ScrollReveal'
import { Seo } from '../components/Seo'

export default function Menu() {
  const [active, setActive] = useState('sve')
  const [query, setQuery] = useState('')

  const visible = useMemo(
    () =>
      menu
        .filter((c) => active === 'sve' || c.id === active)
        .map((c) => ({ ...c, items: c.items.filter((i) => matchesSearch(query, i.name, i.description ?? '', c.title)) }))
        .filter((c) => c.items.length > 0),
    [active, query],
  )
  const count = visible.reduce((sum, c) => sum + c.items.length, 0)

  const select = (id: string) => {
    setActive(id)
    const top = document.getElementById('meni')?.getBoundingClientRect().top ?? 0
    window.scrollTo({ top: window.scrollY + top - 72, behavior: 'smooth' })
  }

  return (
    <>
      <Seo title="Jelovnik" description="Jelovnik Stribora u Novom Sadu: burgeri, krilca, wrapovi, sendviči, meksički kutak, pomfriti, doručak i dezerti, sa cenama." />
      <PageHero eyebrow="Jelovnik" lines={['Gladan si.', 'Znamo.']} intro="Od prvog doručka do poslednjeg pomfrita. Burgeri, krilca, wrapovi i sve što ide uz dobro pivo." image={images.burgerClose} position="center 35%">
        <a href={site.wolt} target="_blank" rel="noreferrer" className="btn btn-line">Poruči preko Wolta <ArrowUpRight size={15} aria-hidden /></a>
      </PageHero>

      <div id="meni" className="sticky top-[4.5rem] z-30 border-b border-gold/25 bg-ink/95">
        <div className="wrap grid items-center gap-x-6 py-1.5 lg:grid-cols-[minmax(0,1fr)_17rem]">
          <div className="order-2 min-w-0 lg:order-1"><MenuCategories categories={menu} active={active} onSelect={select} /></div>
          <div className="relative order-1 lg:order-2">
            <Search size={16} aria-hidden className="absolute top-1/2 left-0 -translate-y-1/2 text-gold" />
            <label htmlFor="menu-search" className="sr-only">Pretraži jelovnik</label>
            <input
              id="menu-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pretraži jelo ili sastojak"
              className="field !min-h-11 !border-cream/15 !py-1 !pr-9 !pl-7 text-sm [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button onClick={() => setQuery('')} aria-label="Obriši pretragu" className="absolute top-0 right-0 grid h-11 w-9 place-items-center text-mute hover:text-cream"><X size={16} /></button>
            )}
          </div>
        </div>
      </div>

      <section className="wrap min-h-[60svh] py-14 md:py-20" aria-label="Stavke jelovnika">
        <p aria-live="polite" className="mb-10 text-sm text-mute">{count} {count % 10 === 1 && count % 100 !== 11 ? 'stavka' : 'stavki'}. {menuSource}</p>
        <AnimatePresence mode="wait">
          <motion.div key={active + query} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.28 }}>
            {visible.length === 0 ? (
              <div className="py-20 text-center">
                <p className="display text-5xl">Nema takvog zalogaja.</p>
                <button onClick={() => { setQuery(''); setActive('sve') }} className="btn btn-line mt-8">Prikaži ceo jelovnik</button>
              </div>
            ) : (
              visible.map((category, index) => (
                <section key={category.id} aria-labelledby={`cat-${category.id}`} className="grid gap-8 pb-16 md:pb-24 lg:grid-cols-12 lg:gap-14">
                  <header className={`lg:sticky lg:top-44 lg:col-span-4 lg:self-start ${index % 2 ? 'lg:order-2 lg:col-start-9' : ''}`}>
                    <p className="text-xs tracking-[0.2em] text-gold">{String(menu.indexOf(menu.find((c) => c.id === category.id)!) + 1).padStart(2, '0')}</p>
                    <h2 id={`cat-${category.id}`} className="display mt-2 text-[clamp(2.8rem,4.6vw,4.8rem)]">{category.title}</h2>
                    {category.intro && <p className="mt-3 text-mute italic">{category.intro}</p>}
                    {category.image && <Photo image={category.image} reveal={false} className="mt-6 aspect-[16/10] lg:aspect-[4/3.4]" />}
                  </header>
                  <ul className={`border-t border-gold/30 lg:col-span-8 ${index % 2 ? 'lg:order-1 lg:col-start-1' : ''} ${category.items.length > 7 ? 'xl:columns-2 xl:gap-12 [&>li]:break-inside-avoid' : ''}`}>
                    {category.items.map((item) => <MenuItem key={item.name} item={item} />)}
                  </ul>
                </section>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </section>
      <ReservationCTA title="Sto je sledeći korak." />
    </>
  )
}
