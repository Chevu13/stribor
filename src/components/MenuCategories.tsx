import { useEffect, useRef } from 'react'

type Props = {
  categories: { id: string; title: string }[]
  active: string
  onSelect: (id: string) => void
}

export function MenuCategories({ categories, active, onSelect }: Props) {
  const list = useRef<HTMLDivElement>(null)

  // Aktivna kategorija ostaje vidljiva u horizontalnoj traci na telefonu.
  useEffect(() => {
    const bar = list.current
    const button = bar?.querySelector<HTMLElement>('[aria-pressed="true"]')
    if (bar && button) bar.scrollTo({ left: button.offsetLeft - bar.clientWidth / 2 + button.clientWidth / 2, behavior: 'smooth' })
  }, [active])

  const all = [{ id: 'sve', title: 'Sve' }, ...categories]
  return (
    <div ref={list} role="group" aria-label="Kategorije jelovnika" className="no-scrollbar relative flex gap-1 overflow-x-auto">
      {all.map((c) => (
        <button
          key={c.id}
          aria-pressed={active === c.id}
          onClick={() => onSelect(c.id)}
          className={`min-h-11 shrink-0 border-b px-3.5 text-[0.7rem] font-medium tracking-[0.15em] whitespace-nowrap uppercase transition-colors ${
            active === c.id ? 'border-gold text-gold' : 'border-transparent text-cream/70 hover:text-cream'
          }`}
        >
          {c.title}
        </button>
      ))}
    </div>
  )
}
