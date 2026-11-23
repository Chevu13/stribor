// SVE FOTOGRAFIJE NA JEDNOM MESTU.
// Da zamenite sliku: ubacite fajl u public/images/ i promenite "src" ovde.
// Ako fajl ne postoji, sajt prikazuje elegantan placeholder bez narušavanja rasporeda.

export type SiteImage = { src: string; alt: string }

const image = (file: string, alt: string): SiteImage => ({ src: `/images/${file}`, alt })

export const images = {
  logo: image('logo.webp', 'Stribor Food & Beer logo'),
  emblem: image('emblem.webp', 'Stribor amblem, bradati lik koji duva vetar'),
  heroDesktop: image('bar-arches.webp', 'Šank Stribora pod ciglenim lukovima'),
  heroMobile: image('bar-arches.webp', 'Šank Stribora pod ciglenim lukovima'),
  interior: image('interior.webp', 'Pun lokal Stribor pod ciglenim lukovima'),
  // Izvor: laptopfriendly.co/novi-sad/stribor-3bir-more. Pre objave zameniti slikom vlasnika ili dobiti dozvolu.
  barArches: image('bar-arches.webp', 'Šank Stribora pod ciglenim lukovima'),
  interiorArches: image('interior-arches.webp', 'Cigleni lukovi, šank i gosti u Striboru'),
  tableWide: image('table-wide.webp', 'Burgeri, pomfrit i pivo na drvenom stolu'),
  tablePortrait: image('table-portrait.webp', 'Društvo za stolom sa burgerima i pomfritom'),
  beerHand: image('beer-hand.webp', 'Čaša zlatnog piva pored burgera'),
  burgerClassic: image('burger-classic.webp', 'Burger sa čedrom i paradajzom uz pomfrit'),
  burgerStacked: image('burger-stacked.webp', 'Visoki burger sa rukolom uz pomfrit'),
  burgerClose: image('burger-close.webp', 'Prerezan burger sa kremastim sosom'),
  fries: image('fries.webp', 'Zlatni pomfrit u metalnoj korpici'),
  wings: image('wings.webp', 'Pileća krilca sa belim sosom i parmezanom'),
  musician: image('musician.webp', 'Muzičar sa akustičnom gitarom u Striboru'),
  acousticPoster: image('event-acoustic-poster.webp', 'Plakat za Akustično veče u Striboru'),
}

export const reelVideo = '/videos/stribor-reel.mp4'

export const instagramGallery: SiteImage[] = [
  images.burgerClose,
  images.interior,
  images.wings,
  images.beerHand,
  images.burgerStacked,
  images.tablePortrait,
]
