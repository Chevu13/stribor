// Kontakt podaci i navigacija. Menjaju se samo ovde.
export const site = {
  name: 'Stribor Food & Beer',
  phoneDisplay: '063 551 132',
  phoneHref: 'tel:+38163551132',
  address: 'Branka Bajića 9N',
  city: '21000 Novi Sad',
  instagramHandle: '@stribor_pivnica',
  instagram: 'https://www.instagram.com/stribor_pivnica/',
  wolt: 'https://wolt.com/en/srb/novi_sad/restaurant/stribor-beer-and-more',
  mapsLink: 'https://www.google.com/maps/search/?api=1&query=Stribor%20pivnica%20Branka%20Baji%C4%87a%209N%20Novi%20Sad',
  mapsEmbed: 'https://www.google.com/maps?q=45.255916,19.819222&z=16&output=embed',
  // Izvor: javni Wolt profil, 23.11.2026. Druge liste navode drugačije, pa potvrditi sa vlasnikom.
  hours: [
    { days: 'Ponedeljak – četvrtak', time: '09:00 – 23:45' },
    { days: 'Petak i subota', time: '09:00 – 00:40' },
    { days: 'Nedelja', time: '09:00 – 22:45' },
  ],
  hoursNote: 'Prema Wolt profilu. Za praznike i rezervacije potvrdite telefonom.',
}

export const navLinks = [
  { to: '/jelovnik', label: 'Jelovnik' },
  { to: '/pivo-i-pice', label: 'Pivo i piće' },
  { to: '/dogadjaji', label: 'Događaji' },
  { to: '/proslave', label: 'Proslave' },
  { to: '/o-nama', label: 'O nama' },
  { to: '/kontakt', label: 'Kontakt' },
]

export const reservationLink = '/kontakt#rezervacija'
