import { lazy, Suspense, useEffect, useRef } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Seo } from './components/Seo'
import { ease } from './components/ScrollReveal'
import Home from './pages/Home'

const Menu = lazy(() => import('./pages/Menu'))
const Drinks = lazy(() => import('./pages/Drinks'))
const Events = lazy(() => import('./pages/Events'))
const Celebrations = lazy(() => import('./pages/Celebrations'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    // Sačekaj da se raspored nove stranice smiri pre skoka na sidro.
    const timer = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant' }), 80)
    return () => clearTimeout(timer)
  }, [pathname, hash])
  return null
}

function Loading() {
  return (
    <div role="status" className="grid min-h-svh place-items-center bg-ink">
      <span className="eyebrow">Učitavanje</span>
    </div>
  )
}

function NotFound() {
  return (
    <section className="wrap flex min-h-svh flex-col items-start justify-center pt-24">
      <Seo title="Stranica nije pronađena" description="Tražena stranica ne postoji." />
      <p className="eyebrow mb-6">Greška 404</p>
      <h1 className="display display-xl">Ovde je samo vetar.</h1>
      <Link to="/" className="btn btn-gold mt-10">Nazad na početnu</Link>
    </section>
  )
}

export default function App() {
  const location = useLocation()
  const firstRender = useRef(true)
  useEffect(() => {
    firstRender.current = false
  }, [])

  return (
    <>
      <a href="#sadrzaj" className="btn btn-gold fixed top-2 left-2 z-[90] -translate-y-24 focus:translate-y-0">Preskoči na sadržaj</a>
      <Navbar />
      {!firstRender.current && (
        <motion.div
          key={`curtain-${location.pathname}`}
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[60] origin-top bg-forest"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.75, ease }}
        />
      )}
      <main id="sadrzaj" key={location.pathname}>
        <Suspense fallback={<Loading />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/jelovnik" element={<Menu />} />
            <Route path="/pivo-i-pice" element={<Drinks />} />
            <Route path="/dogadjaji" element={<Events />} />
            <Route path="/proslave" element={<Celebrations />} />
            <Route path="/o-nama" element={<About />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ScrollManager />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
