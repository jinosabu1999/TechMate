'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  KeyRound,
  Mic,
  Palette,
  FileType,
  Settings,
  HelpCircle,
  Sparkles,
} from 'lucide-react'

const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Tools',
    href: '#',
    icon: Sparkles,
    children: [
      {
        label: 'Password Generator',
        href: '/',
        icon: KeyRound,
      },
      {
        label: 'Voice Recorder',
        href: '/recorder',
        icon: Mic,
      },
      {
        label: 'Color Palette',
        href: '/colors',
        icon: Palette,
      },
      {
        label: 'Unit Converter',
        href: '/converter',
        icon: FileType,
      },
    ],
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
  },
  {
    label: 'Help',
    href: '/help',
    icon: HelpCircle,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-64 lg:flex-col bg-surface border-r border-border">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-8 border-b border-border">
        <div className="rounded-lg bg-gradient-to-r from-primary to-accent p-2">
          <Sparkles className="h-5 w-5 text-primary-foreground" />
        </div>
        <h1 className="text-xl font-bold">TechMate</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.children?.some(child => pathname === child.href))

            return (
              <div key={item.label}>
                {item.href !== '#' ? (
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-surface-light'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <div className="px-4 py-3">
                    <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </div>
                  </div>
                )}

                {/* Submenu */}
                {item.children && (
                  <div className="space-y-1 mt-2 ml-6">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon
                      const isChildActive = pathname === child.href

                      return (
                        <Link
                          key={child.label}
                          href={child.href}
                          className={cn(
                            'flex items-center gap-3 px-3 py-2 rounded text-xs font-medium transition-all duration-200',
                            isChildActive
                              ? 'bg-primary/20 text-primary'
                              : 'text-muted-foreground hover:text-foreground hover:bg-surface-light'
                          )}
                        >
                          <ChildIcon className="h-4 w-4" />
                          <span>{child.label}</span>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-border px-4 py-4">
        <p className="text-xs text-muted-foreground text-center">
          TechMate v1.0
        </p>
      </div>
    </aside>
  )
}
