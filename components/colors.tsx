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
    <div className="p-6 rounded-lg bg-slate-900">
      <div className="grid grid-cols-3 gap-4 mb-6">
        {palette.map((color, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <button
              onClick={() => copyToClipboard(color.hex, index)}
              className="w-full aspect-square rounded-lg flex items-center justify-center text-white text-3xl transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/20"
              style={{ backgroundColor: color.hex }}
            />
            <div className="flex items-center gap-2">
              <span className="text-sm text-white font-mono">{color.hex}</span>
              <AnimatePresence initial={false} mode="wait">
                <motion.button
                  key={copiedIndex === index ? 'check' : 'copy'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => copyToClipboard(color.hex, index)}
                  className="p-1 rounded-full hover:bg-white/10"
                >
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-white/70" />
                  )}
                  <span className="sr-only">
                    {copiedIndex === index ? 'Copied' : 'Copy color code'}
                  </span>
                </motion.button>
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={generateNewPalette}
        className="w-full bg-white text-slate-900 hover:bg-white/90 h-12 text-lg font-medium"
      >
        <RefreshCw className="w-5 h-5 mr-2" />
        Generate New Palette
      </Button>

      <div className="mt-6">
        <h2 className="text-xl text-white mb-3">Color Harmony</h2>
        <div className="h-12 rounded-lg overflow-hidden flex">
          {palette.map((color, index) => (
            <div
              key={index}
              className="flex-1"
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

                    
