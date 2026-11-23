// PIĆE. Cene su sa Wolt profila (23.11.2026). Cene u lokalu potvrditi sa vlasnikom.
export type Drink = { name: string; detail?: string; price: number }

export const drinks: { title: string; items: Drink[] }[] = [
  { title: 'Pivo', items: [{ name: 'Heineken', detail: '0,5 L', price: 320 }] },
  {
    title: 'Bezalkoholno',
    items: [
      { name: 'Limunada', price: 230 },
      { name: 'Pepsi', detail: '0,5 L', price: 250 },
      { name: 'Knjaz Miloš', price: 200 },
      { name: 'Voda Voda', price: 200 },
    ],
  },
]

// Ovde upisati potvrđenu listu craft piva kada je vlasnik dostavi.
// Primer: { name: 'Naziv piva', detail: 'Stil, 5%', price: 450 }
export const craftBeers: Drink[] = []
