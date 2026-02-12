'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { RefreshCw, Copy, Check } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { motion, AnimatePresence } from "framer-motion"

interface ColorPalette {
  hex: string
}

export function Colors() {
  const [palette, setPalette] = useState<ColorPalette[]>(generatePalette())
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const { toast } = useToast()

  function generatePalette(): ColorPalette[] {
    return Array.from({ length: 6 }, () => ({
      hex: `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`,
    }))
  }

  const generateNewPalette = () => {
    setPalette(generatePalette())
  }

  const copyToClipboard = async (color: string, index: number) => {
    await navigator.clipboard.writeText(color)
    setCopiedIndex(index)
    toast({ description: `Color ${color} copied to clipboard` })
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="card space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Color Palette</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {palette.map((color, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <button
                onClick={() => copyToClipboard(color.hex, index)}
                className="w-full aspect-square rounded-lg flex items-center justify-center text-white text-2xl transition-all hover:shadow-lg hover:shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/50"
                style={{ backgroundColor: color.hex }}
                title={`Click to copy ${color.hex}`}
              />
              <div className="flex items-center gap-2 w-full">
                <span className="text-xs sm:text-sm text-foreground font-mono flex-1 text-center">{color.hex}</span>
                <AnimatePresence initial={false} mode="wait">
                  <motion.button
                    key={copiedIndex === index ? 'check' : 'copy'}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => copyToClipboard(color.hex, index)}
                    className="p-1 rounded-full hover:bg-muted"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4 text-accent" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">
                      {copiedIndex === index ? 'Copied' : 'Copy color code'}
                    </span>
                  </motion.button>
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Button
        onClick={generateNewPalette}
        className="w-full h-11 text-base font-semibold"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Generate New Palette
      </Button>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Harmony Preview</h3>
        <div className="h-12 rounded-lg overflow-hidden flex shadow-lg">
          {palette.map((color, index) => (
            <motion.div
              key={index}
              className="flex-1 transition-all hover:flex-[1.5]"
              style={{ backgroundColor: color.hex }}
              whileHover={{ scale: 1.05 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

                    
