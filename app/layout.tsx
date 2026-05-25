import './globals.css'
import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter, IBM_Plex_Mono, Jost } from 'next/font/google'

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant-garamond',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
  weight: ['400', '500'],
})

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Surendra & Co. | Volvo 9600 XL Masterpiece',
  description:
    'Experience the art of coachbuilding. Surendra & Co. — master coachbuilders in Ahmedabad crafting premium sleeper coaches with 25+ years of engineering excellence.',
  icons: { icon: '/Logo.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${inter.variable} ${ibmPlexMono.variable} ${jost.variable}`}
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}

