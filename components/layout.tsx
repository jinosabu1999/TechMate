'use client'

import { useTheme } from "next-themes"
import { Sun, Moon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function Layout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-14 items-center px-4 justify-between">
          <h1 className="text-xl font-semibold">Multi-Tool Kit</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>
      <main className="container py-6">
        <div className="mx-auto max-w-[800px]">
          {children}
        </div>
      </main>
    </div>
  )
}


