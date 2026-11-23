import { useCallback, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { images } from '../config/images'
import { navLinks, reservationLink } from '../config/site'
import { MobileMenu } from './MobileMenu'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
          scrolled ? 'border-gold/20 bg-ink/95' : 'border-transparent bg-ink/45'
        }`}
      >
        <div className="wrap grid h-[4.5rem] grid-cols-[1fr_auto] items-center lg:grid-cols-[1fr_auto_1fr]">
          <Link to="/" aria-label="Stribor, početna strana" className="flex w-fit items-center">
            <img
              src={images.logo.src}
              alt="Stribor Food & Beer"
              width={206}
              height={244}
              className="h-14 w-auto"
            />
          </Link>

          <nav aria-label="Glavna navigacija" className="hidden items-center gap-[clamp(1.1rem,2.3vw,2.5rem)] lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `group relative py-2 text-[0.72rem] font-medium tracking-[0.17em] whitespace-nowrap uppercase transition-colors hover:text-gold ${isActive ? 'text-gold' : 'text-cream'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span className={`absolute inset-x-0 bottom-0 h-px origin-left bg-gold transition-transform duration-500 group-hover:scale-x-100 ${isActive ? 'scale-x-100' : 'scale-x-0'}`} />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-3">
            <Link to={reservationLink} className="btn btn-gold hidden !min-h-11 !px-5 !py-2 sm:inline-flex">Rezerviši</Link>
            <button
              onClick={() => setOpen(true)}
              aria-label="Otvori meni"
              aria-expanded={open}
              className="grid h-12 w-12 place-items-center border border-gold/50 bg-ink/30 text-cream lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={close} />
    </>
  )
}
