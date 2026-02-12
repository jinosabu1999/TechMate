import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TechMate - Multi-Tool Kit',
  description: 'Your tech-savvy, multi-purpose companion. Generate passwords, record voice, create color palettes, and convert units with TechMate.',
  keywords: 'password generator, voice recorder, color palette, unit converter, tools',
  openGraph: {
    title: 'TechMate - Multi-Tool Kit',
    description: 'Your tech-savvy, multi-purpose companion for all your utility needs.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0050FF',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} dark:bg-slate-900`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}


