import type { Metadata } from 'next'
import { Instrument_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import { OilSlick } from './components/OilSlick'

const sans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  // TODO: update to the real deployment URL after `npx vercel` assigns it
  metadataBase: new URL('https://wes-portfolio.vercel.app'),
  title: 'Wes Norris | Product Designer',
  description:
    'Wes Norris is a Lead Product Designer who ships to production. Design systems, product UX, and the code that delivers them.',
  openGraph: {
    title: 'Wes Norris | Product Designer',
    description:
      'Lead Product Designer who ships his own work to production.',
    images: [{ url: '/banner.jpg', width: 1400, height: 350 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/banner.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <OilSlick />
        {children}
      </body>
    </html>
  )
}
