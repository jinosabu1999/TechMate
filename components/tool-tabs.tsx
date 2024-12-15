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
    <div className="flex border rounded-lg overflow-hidden mb-6">
      {tools.map((tool) => {
        const Icon = tool.icon
        return (
          <Link
            key={tool.href}
            href={tool.href}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors",
              pathname === tool.href
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{tool.name}</span>
          </Link>
        )
      })}
    </div>
  )
}


