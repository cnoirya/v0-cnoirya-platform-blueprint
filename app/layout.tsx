import type { Metadata } from 'next'
import { Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const spaceMono = Space_Mono({ 
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: '--font-space-mono'
})

export const metadata: Metadata = {
  title: 'CNOIRYA | Exclusive Membership',
  description: 'A sovereign archetype. Dark feminine empire. Exclusive access to the inner world.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${spaceMono.variable} font-mono antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
