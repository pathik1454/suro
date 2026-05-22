import './globals.css'
import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter, IBM_Plex_Mono } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['300', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-plex',
  display: 'swap',
  weight: ['400', '500'],
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
      className={`${cormorant.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
