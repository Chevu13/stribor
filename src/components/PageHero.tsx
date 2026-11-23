import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type { SiteImage } from '../config/images'
import { ease } from './ScrollReveal'

type Props = { eyebrow: string; lines: string[]; intro: string; image: SiteImage; position?: string; children?: ReactNode }

export function PageHero({ eyebrow, lines, intro, image, position = 'center', children }: Props) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section ref={ref} className="relative flex min-h-[86svh] items-end overflow-hidden bg-ink pt-32 pb-12 md:pb-16">
      <motion.img
        src={image.src}
        alt={image.alt}
        fetchPriority="high"
        style={reduced ? { objectPosition: position } : { y, objectPosition: position }}
        className="absolute inset-0 h-[115%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-ink/70" />
      <div className="wrap relative grid items-end gap-8 lg:grid-cols-[1fr_minmax(18rem,27rem)]">
        <div>
          <motion.p className="eyebrow mb-6 !text-cream" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.8 }}>
            {eyebrow}
          </motion.p>
          <h1 className="display display-xl">
            {lines.map((line, i) => (
              <span key={line} className="-mt-[0.18em] block overflow-hidden pt-[0.18em] pb-[0.08em]">
                <motion.span className="block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.15, delay: 0.3 + i * 0.12, ease }}>
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.9, ease }}>
          <p className="text-cream/90 lg:text-lg">{intro}</p>
          {children && <div className="mt-6 flex flex-wrap gap-3">{children}</div>}
        </motion.div>
      </div>
    </section>
  )
}
