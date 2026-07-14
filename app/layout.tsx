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
  title: 'Wes Norris | Product Designer',
  description:
    'Wes Norris is a Lead Product Designer who ships to production. Design systems, product UX, and the code that delivers them.',
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
