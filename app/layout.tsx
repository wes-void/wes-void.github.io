import type { Metadata } from 'next'
import { Instrument_Sans, IBM_Plex_Mono, Inter, Caudex } from 'next/font/google'
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

// Scoped to the embedded Threshold assessment so it renders in its real fonts.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const caudex = Caudex({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-caudex',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://wes-void.github.io'),
  title: 'Wes Norris | Product Designer',
  description:
    'Wes Norris is a Lead Product Designer who ships to production. Design systems, product UX, and the code that delivers them.',
  openGraph: {
    title: 'Wes Norris | Product Designer',
    description:
      'Lead Product Designer who ships his own work to production.',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${inter.variable} ${caudex.variable}`}
    >
      <body>
        <OilSlick />
        {children}
      </body>
    </html>
  )
}
