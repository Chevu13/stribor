import type { MenuEntry } from '../data/menu'
import { formatPrice } from '../lib'

export function MenuItem({ item }: { item: MenuEntry }) {
  return (
    <li className="group flex gap-4 border-b border-cream/10 py-5">
      {item.image && (
        <img src={item.image.src} alt={item.image.alt} loading="lazy" className="h-20 w-16 shrink-0 object-cover" />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-3">
          <h3 className="display text-[1.65rem] leading-tight tracking-normal transition-colors group-hover:text-gold">{item.name}</h3>
          <span aria-hidden className="min-w-4 flex-1 translate-y-[-0.2em] border-b border-dotted border-cream/25" />
          <span className="shrink-0 text-sm font-medium whitespace-nowrap text-gold">{formatPrice(item.price)}</span>
        </div>
        {item.description && <p className="mt-1 max-w-[34rem] text-sm leading-relaxed text-mute">{item.description}</p>}
        {item.popular && <p className="mt-2 text-[0.62rem] font-medium tracking-[0.2em] text-gold uppercase">Često naručivano</p>}
      </div>
    </li>
  )
}
