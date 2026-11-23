import { ArrowUpRight } from 'lucide-react'
import type { SiteImage } from '../config/images'
import { site } from '../config/site'
import { Photo } from './ScrollReveal'

// Namerno nepravilan mozaik: pet polja, različite veličine.
const spans = [
  'col-span-2 row-span-2 lg:col-span-5',
  'lg:col-span-4',
  'lg:col-span-3 lg:row-span-2',
  'lg:col-span-2',
  'col-span-2 lg:col-span-2',
]

export function ImageGallery({ items }: { items: SiteImage[] }) {
  return (
    <ul className="grid auto-rows-[38vw] grid-cols-2 gap-1.5 sm:auto-rows-[30vw] lg:auto-rows-[15.5vw] lg:grid-cols-12 2xl:auto-rows-[15rem]">
      {items.slice(0, 5).map((image, i) => (
        <li key={image.src} className={spans[i]}>
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label={`${image.alt}, otvori Stribor na Instagramu`}
            className="group relative block h-full overflow-hidden"
          >
            <Photo image={image} className="h-full" imgClassName="transition-transform duration-[1.4s] ease-out group-hover:scale-105" />
            <span className="absolute inset-0 grid place-items-center bg-ink/0 text-cream opacity-0 transition-all duration-500 group-hover:bg-ink/55 group-hover:opacity-100 group-focus-visible:bg-ink/55 group-focus-visible:opacity-100">
              <ArrowUpRight size={30} strokeWidth={1.2} />
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
