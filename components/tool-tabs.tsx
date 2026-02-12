'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { KeyRound, Mic, Palette, FileType } from 'lucide-react'

const tools = [
  {
    name: "Password",
    href: "/",
    icon: KeyRound
  },
  {
    name: "Recorder",
    href: "/recorder",
    icon: Mic
  },
  {
    name: "Colors",
    href: "/colors",
    icon: Palette
  },
  {
    name: "Converter",
    href: "/converter",
    icon: FileType
  }
]

export function ToolTabs() {
  const pathname = usePathname()

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
      {tools.map((tool) => {
        const Icon = tool.icon
        const isActive = pathname === tool.href
        return (
          <Link
            key={tool.href}
            href={tool.href}
            className={cn(
              "flex flex-col items-center justify-center gap-2 px-4 py-4 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-105",
              isActive
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "bg-secondary text-foreground hover:bg-muted border border-border/50"
            )}
          >
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-xs sm:text-sm text-center">{tool.name}</span>
          </Link>
        )
      })}
    </div>
  )
}


