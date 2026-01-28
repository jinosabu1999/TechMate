"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw, Copy, Check, Lock, Unlock } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface ColorPalette {
  hex: string
  locked: boolean
}

function generateRandomColor(): string {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`
}

function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? "#000000" : "#ffffff"
}

export function Colors() {
  const [palette, setPalette] = useState<ColorPalette[]>(() =>
    Array.from({ length: 5 }, () => ({
      hex: generateRandomColor(),
      locked: false,
    }))
  )
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const generateNewPalette = useCallback(() => {
    setPalette((prev) =>
      prev.map((color) =>
        color.locked ? color : { ...color, hex: generateRandomColor() }
      )
    )
  }, [])

  const toggleLock = (index: number) => {
    setPalette((prev) =>
      prev.map((color, i) =>
        i === index ? { ...color, locked: !color.locked } : color
      )
    )
  }

  const copyToClipboard = async (color: string, index: number) => {
    await navigator.clipboard.writeText(color)
    setCopiedIndex(index)
    toast.success(`Copied ${color.toUpperCase()}`)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Color Grid */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {/* Desktop: Horizontal layout */}
        <div className="hidden sm:flex h-48 md:h-56 lg:h-64">
          {palette.map((color, index) => (
            <div
              key={index}
              className="flex-1 relative group transition-all hover:flex-[1.2]"
              style={{ backgroundColor: color.hex }}
            >
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: getContrastColor(color.hex) }}
              >
                <button
                  onClick={() => toggleLock(index)}
                  className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                  aria-label={color.locked ? "Unlock color" : "Lock color"}
                >
                  {color.locked ? (
                    <Lock className="h-5 w-5" />
                  ) : (
                    <Unlock className="h-5 w-5" />
                  )}
                </button>
                <button
                  onClick={() => copyToClipboard(color.hex, index)}
                  className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                  aria-label="Copy color code"
                >
                  {copiedIndex === index ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
                <span className="font-mono text-sm font-medium tracking-wider">
                  {color.hex.toUpperCase()}
                </span>
              </div>
              {color.locked && (
                <div
                  className="absolute top-3 right-3"
                  style={{ color: getContrastColor(color.hex) }}
                >
                  <Lock className="h-4 w-4 opacity-50" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: Grid layout */}
        <div className="grid grid-cols-2 sm:hidden gap-1 p-1">
          {palette.map((color, index) => (
            <button
              key={index}
              onClick={() => copyToClipboard(color.hex, index)}
              className={cn(
                "relative aspect-square rounded-lg flex flex-col items-center justify-center gap-2 transition-transform active:scale-95",
                index === 4 && "col-span-2 aspect-[2/1]"
              )}
              style={{
                backgroundColor: color.hex,
                color: getContrastColor(color.hex),
              }}
            >
              <div className="flex items-center gap-2">
                {color.locked && <Lock className="h-4 w-4 opacity-70" />}
                <span className="font-mono text-sm font-medium">
                  {color.hex.toUpperCase()}
                </span>
              </div>
              {copiedIndex === index && (
                <span className="text-xs font-medium">Copied!</span>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleLock(index)
                }}
                className="absolute top-2 right-2 p-1.5 rounded-md hover:bg-black/10 dark:hover:bg-white/10"
                aria-label={color.locked ? "Unlock color" : "Lock color"}
              >
                {color.locked ? (
                  <Lock className="h-4 w-4" />
                ) : (
                  <Unlock className="h-4 w-4 opacity-50" />
                )}
              </button>
            </button>
          ))}
        </div>
      </div>

      {/* Color Codes */}
      <div className="grid grid-cols-5 gap-2">
        {palette.map((color, index) => (
          <button
            key={index}
            onClick={() => copyToClipboard(color.hex, index)}
            className={cn(
              "flex flex-col items-center gap-2 p-3 rounded-lg border transition-all hover:border-accent/50",
              copiedIndex === index
                ? "border-accent bg-accent/5"
                : "border-border bg-card"
            )}
          >
            <div
              className="h-8 w-8 rounded-md shadow-sm"
              style={{ backgroundColor: color.hex }}
            />
            <span className="font-mono text-xs text-muted-foreground">
              {color.hex.toUpperCase()}
            </span>
          </button>
        ))}
      </div>

      {/* Generate Button */}
      <Button
        onClick={generateNewPalette}
        className="w-full h-12 text-base font-medium bg-accent hover:bg-accent/90 text-accent-foreground"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Generate New Palette
      </Button>

      {/* Harmony Preview */}
      <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">
          Color Harmony Preview
        </h3>
        <div className="h-8 rounded-lg overflow-hidden flex shadow-inner">
          {palette.map((color, index) => (
            <div
              key={index}
              className="flex-1 transition-all"
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10">
          <Lock className="h-4 w-4 text-accent" />
        </div>
        <div>
          <p className="text-sm font-medium">Pro Tip</p>
          <p className="text-sm text-muted-foreground">
            Lock colors you like before generating a new palette. They will stay
            in place while the rest changes.
          </p>
        </div>
      </div>
    </div>
  )
}
