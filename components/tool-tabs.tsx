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
      {/* Mobile: Horizontal scroll */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible scrollbar-hide">
        {tools.map((tool) => {
          const Icon = tool.icon
          const isActive = pathname === tool.href
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 min-w-fit",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isActive
                  ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20"
                  : "bg-card hover:bg-secondary border border-border/50 text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0",
                  isActive ? "text-accent-foreground" : "text-muted-foreground"
                )}
              />
              <span className="whitespace-nowrap">{tool.name}</span>
            </Link>
          )
        })}
      </div>

      {/* Desktop: Grid with descriptions */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-3 mt-4">
        {tools.map((tool) => {
          const Icon = tool.icon
          const isActive = pathname === tool.href
          return (
            <Link
              key={`${tool.href}-desktop`}
              href={tool.href}
              className={cn(
                "group flex flex-col gap-2 p-4 rounded-xl transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isActive
                  ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20"
                  : "bg-card hover:bg-secondary border border-border/50"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                    isActive
                      ? "bg-accent-foreground/20"
                      : "bg-muted group-hover:bg-accent/10"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      isActive
                        ? "text-accent-foreground"
                        : "text-muted-foreground group-hover:text-accent"
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "font-medium",
                    isActive ? "text-accent-foreground" : "text-foreground"
                  )}
                >
                  {tool.name}
                </span>
              </div>
              <p
                className={cn(
                  "text-xs",
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
