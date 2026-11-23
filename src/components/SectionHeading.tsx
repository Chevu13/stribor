import { motion } from 'framer-motion'
import { ease } from './ScrollReveal'

type Props = {
  eyebrow?: string
  /** Svaki red naslova se otkriva zasebno. */
  lines: string[]
  size?: 'lg' | 'xl'
  className?: string
  as?: 'h1' | 'h2'
  /** Red koji se prikazuje zlatnim kurzivom. */
  accentLine?: number
}

export function SectionHeading({ eyebrow, lines, size = 'lg', className = '', as: Tag = 'h2', accentLine }: Props) {
  return (
    // Okidač je roditelj: redovi kreću odsečeni, pa sami nikada ne bi bili "u kadru".
    <motion.div className={className} initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.2 }}>
      {eyebrow && <p className="eyebrow mb-6 md:mb-8">{eyebrow}</p>}
      <Tag className={`display ${size === 'xl' ? 'display-xl' : 'display-lg'}`}>
        {lines.map((line, i) => (
          <span key={line} className="-mt-[0.18em] block overflow-hidden pt-[0.18em] pb-[0.08em]">
            <motion.span
              className={`block ${accentLine === i ? 'text-gold italic' : ''}`}
              variants={{ hidden: { y: '110%' }, shown: { y: 0 } }}
              transition={{ duration: 1.05, delay: i * 0.11, ease }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  )
}
