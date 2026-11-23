// React 19 sam prebacuje ove tagove u <head>.
export function Seo({ title, description }: { title: string; description: string }) {
  const full = `${title} | Stribor Food & Beer, Novi Sad`
  return (
    <>
      <title>{full}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={description} />
    </>
  )
}
