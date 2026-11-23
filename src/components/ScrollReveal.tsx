import { useEffect, useRef, useState, type ComponentProps, type ReactNode, type RefObject } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { images, reelVideo, type SiteImage } from '../config/images'

export const ease = [0.2, 0.8, 0.2, 1] as const

export function ScrollReveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 1, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

/** Video se pušta samo dok je blizu ekrana. */
export function Reel({ className, label }: { className?: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduced = useReducedMotion()
  const inView = useInView(ref, { margin: '200px' })
  useEffect(() => {
    if (reduced) return
    if (inView) ref.current?.play().catch(() => {})
    else ref.current?.pause()
  }, [inView, reduced])
  return <video ref={ref} className={className} src={reelVideo} poster={images.beerHand.src} controls={!!reduced} muted loop playsInline preload="metadata" aria-label={label} />
}

type ParallaxProps = ComponentProps<typeof motion.img> & { target: RefObject<HTMLDivElement | null>; amount: number }

function ParallaxImage({ target, amount, ...img }: ParallaxProps) {
  const { scrollYProgress } = useScroll({ target, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`])
  return <motion.img {...img} style={{ y, scale: 1 + amount / 50, willChange: 'transform' }} />
}

type PhotoProps = {
  image: SiteImage
  className?: string
  imgClassName?: string
  /** Pomeraj slike pri skrolu, u procentima. */
  parallax?: number
  priority?: boolean
  /** Otkrivanje slike zavesom pri ulasku u ekran. */
  reveal?: boolean
}

export function Photo({ image, className = '', imgClassName = '', parallax = 0, priority, reveal = true }: PhotoProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(false)
  const reduced = useReducedMotion()
  const img = {
    src: image.src,
    alt: image.alt,
    loading: priority ? ('eager' as const) : ('lazy' as const),
    decoding: 'async' as const,
    onError: () => setFailed(true),
    className: `h-full w-full object-cover ${imgClassName}`,
  }

  return (
    <div ref={ref} className={`relative overflow-hidden bg-pine ${className}`}>
      {failed ? (
        <div className="absolute inset-0 grid place-items-center border border-gold/25">
          <img src={images.emblem.src} alt="" className="w-1/3 max-w-40 opacity-25" />
          <span className="sr-only">{image.alt}</span>
        </div>
      ) : parallax > 0 && !reduced ? (
        <ParallaxImage target={ref} amount={parallax} {...img} />
      ) : (
        <img {...img} />
      )}
      {reveal && (
        <motion.div
          aria-hidden
          className="absolute inset-0 origin-top bg-ink"
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={{ once: true, margin: '-6% 0px' }}
          transition={{ duration: 1.15, ease }}
        />
      )}
    </div>
  )
}
