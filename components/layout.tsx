'use client'

import { useTheme } from "next-themes"
import { Sun, Moon, Sparkles, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/sidebar"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

interface LayoutProps {
  children: React.ReactNode
  showSidebar?: boolean
}

export function Layout({ children, showSidebar = true }: LayoutProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {showSidebar && <Sidebar />}

      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-sm lg:ml-64">
        <div className="container-fluid flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
            <div className="flex items-center gap-2 lg:hidden">
              <div className="rounded-lg bg-gradient-to-r from-primary to-accent p-1.5">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <h1 className="text-lg font-bold">TechMate</h1>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {sidebarOpen && showSidebar && (
        <div className="fixed inset-0 z-20 bg-background/80 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="fixed left-0 top-0 bottom-0 w-64 bg-surface border-r border-border z-30" onClick={(e) => e.stopPropagation()}>
            <Sidebar />
          </div>
        </div>
      )}

      <main className="lg:ml-64 min-h-[calc(100vh-4rem)]">
        <div className="container-fluid px-4 sm:px-6 lg:px-8 py-8">
          <div className="w-full max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}


