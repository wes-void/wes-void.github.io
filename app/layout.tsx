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
    'Product design, shipped to production. Wes Norris is a Lead Product Designer at Threshold, where the design system, client platform, and marketing site were designed and built by the same pair of hands.',
  openGraph: {
    title: 'Wes Norris | Product design, shipped to production.',
    description:
      'Lead Product Designer at Threshold. The design system, client platform, and marketing site, built by one pair of hands.',
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
