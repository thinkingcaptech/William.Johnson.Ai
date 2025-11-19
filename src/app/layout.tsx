import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Will.Johnson.AI | The Alchemist - Remote AI & Systems Architecture',
  description: 'Transmuting chaos into code. Remote AI specialist, systems architect, and business alchemist. Building geometric scaling systems for visionary entrepreneurs.',
  keywords: ['AI specialist', 'systems architecture', 'remote consulting', 'business automation', 'geometric scaling', 'Will Johnson'],
  authors: [{ name: 'Will Johnson' }],
  openGraph: {
    title: 'Will.Johnson.AI | The Alchemist',
    description: 'Transmuting chaos into code. Remote AI & Systems Architecture specialist.',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
