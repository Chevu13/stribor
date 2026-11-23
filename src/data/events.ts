// DOGAĐAJI. Dodajte novi objekat i sajt ga sam svrstava u najavljene ili arhivu.
// "date" je u formatu GGGG-MM-DD. Ako godina nije potvrđena, stavite null (ide u arhivu).
import { images, type SiteImage } from '../config/images'

export type StriborEvent = {
  id: string
  title: string
  type: string
  date: string | null
  dateLabel: string
  time: string
  price?: string
  description: string
  image: SiteImage
}

export const events: StriborEvent[] = [
  {
    id: 'akusticno-vece-septembar-2026',
    title: 'Akustično veče',
    type: 'Živa muzika',
    date: '2026-09-11',
    dateLabel: 'Petak, 11. septembar 2026.',
    time: '21:00',
    description: 'Muzika se vratila u Stribor: gitara, glas i veče koje je trajalo taman koliko treba.',
    image: images.musician,
  },
  {
    id: 'beer-aperitif-avgust',
    title: 'Beer & Aperitif',
    type: 'Druženje uz pivo',
    date: null,
    dateLabel: '15. avgust, avgustovsko izdanje',
    time: '17:00 – 20:00',
    price: '1.500 RSD',
    description: 'Letnji afterwork uz craft piva pivare 3bir, koliko želite, i zalogaje koji idu uz njih.',
    image: images.beerHand,
  },
]

// Sekcija "Večeras nastupa" na početnoj. Stavite false kada te večeri nema svirke.
export const showTonight = true

export const eventFormats = [
  { title: 'Akustične večeri', text: 'Gitara, glas i dovoljno tišine da se čuje refren.' },
  { title: 'Živa muzika', text: 'Kada bina oživi, ostatak grada može da sačeka.' },
  { title: 'Posebni događaji', text: 'Večeri sa razlogom, ili bez njega. Oba su dobra.' },
  { title: 'Pivska druženja', text: 'Craft piva, zalogaji i ljudi koji znaju šta je u čaši.' },
]
