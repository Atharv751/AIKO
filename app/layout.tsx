import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AIKO',
  description: 'Revolutionary AI Powered retail experiences',
  generator: 'Atharv Kumar',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
