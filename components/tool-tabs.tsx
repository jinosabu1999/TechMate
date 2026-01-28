"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { KeyRound, Mic, Palette, ArrowRightLeft } from "lucide-react"

const tools = [
  {
    name: "Password",
    description: "Generate secure passwords",
    href: "/",
    icon: KeyRound,
  },
  {
    name: "Recorder",
    description: "Voice to text",
    href: "/recorder",
    icon: Mic,
  },
  {
    name: "Colors",
    description: "Color palette generator",
    href: "/colors",
    icon: Palette,
  },
  {
    name: "Converter",
    description: "Unit conversion",
    href: "/converter",
    icon: ArrowRightLeft,
  },
]

export function ToolTabs() {
  const pathname = usePathname()

  return (
    <nav className="mb-8" aria-label="Tool navigation">
      {/* Navigation tabs - responsive grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {tools.map((tool) => {
          const Icon = tool.icon
          const isActive = pathname === tool.href
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className={cn(
                "group flex flex-col gap-2 p-3 sm:p-4 rounded-xl transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isActive
                  ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20"
                  : "bg-card hover:bg-secondary border border-border/50"
              )}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div
                  className={cn(
                    "flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg transition-colors shrink-0",
                    isActive
                      ? "bg-accent-foreground/20"
                      : "bg-muted group-hover:bg-accent/10"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-3.5 w-3.5 sm:h-4 sm:w-4",
                      isActive
                        ? "text-accent-foreground"
                        : "text-muted-foreground group-hover:text-accent"
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "font-medium text-sm sm:text-base",
                    isActive ? "text-accent-foreground" : "text-foreground"
                  )}
                >
                  {tool.name}
                </span>
              </div>
              <p
                className={cn(
                  "text-xs hidden sm:block",
                  isActive
                    ? "text-accent-foreground/80"
                    : "text-muted-foreground"
                )}
              >
                {tool.description}
              </p>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
