import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react'
import { images } from '../config/images'
import { navLinks, reservationLink, site } from '../config/site'
import { ease } from './ScrollReveal'

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const opener = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    panel.current?.querySelector('button')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab' || !panel.current) return
      const items = panel.current.querySelectorAll<HTMLElement>('a,button')
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      opener?.focus()
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label="Glavni meni"
          className="fixed inset-0 z-[70] flex flex-col overflow-x-hidden overflow-y-auto bg-pine"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.7, ease }}
        >
          <img src={images.emblem.src} alt="" className="pointer-events-none absolute -right-24 bottom-16 w-[26rem] max-w-none opacity-[0.06]" />
          <div className="wrap flex h-20 shrink-0 items-center justify-between">
            <span className="display text-2xl tracking-[0.18em]">STRIBOR</span>
            <button onClick={onClose} aria-label="Zatvori meni" className="grid h-12 w-12 place-items-center border border-gold/50 text-gold">
              <X size={20} />
            </button>
          </div>
          <nav aria-label="Mobilna navigacija" className="wrap relative flex flex-1 flex-col justify-center py-6">
            {[{ to: '/', label: 'Početna' }, ...navLinks].map((link, i) => (
              <div key={link.to} className="overflow-hidden border-b border-cream/10">
                <motion.div initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.75, delay: 0.16 + i * 0.05, ease }}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `display flex items-baseline justify-between py-2.5 text-[clamp(2.1rem,10.5vw,3.6rem)] ${isActive ? 'text-gold italic' : ''}`
                    }
                  >
                    {link.label}
                    <span className="font-sans text-[0.68rem] tracking-[0.2em] text-mute not-italic">0{i + 1}</span>
                  </NavLink>
                </motion.div>
              </div>
            ))}
          </nav>
          <div className="wrap relative grid shrink-0 gap-3 pb-7">
            <NavLink to={reservationLink} onClick={onClose} className="btn btn-gold">Rezerviši sto</NavLink>
            <div className="flex justify-between text-sm text-mute">
              <a href={site.phoneHref} className="py-2">{site.phoneDisplay}</a>
              <a href={site.instagram} target="_blank" rel="noreferrer" className="py-2">Instagram</a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
