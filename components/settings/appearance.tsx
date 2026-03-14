'use client'

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Monitor, Moon, Sun } from "lucide-react"

export function AppearanceSettings() {
  const { theme, setTheme, themes } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize the look and feel of TechMate
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label className="text-base font-semibold">Theme</Label>
          <RadioGroup value={theme || "system"} onValueChange={setTheme}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {themeOptions.map((option) => {
                const Icon = option.icon
                return (
                  <div key={option.value} className="flex items-center">
                    <RadioGroupItem
                      value={option.value}
                      id={option.value}
                      className="hidden"
                    />
                    <Label
                      htmlFor={option.value}
                      className="flex items-center gap-3 p-4 rounded-lg border-2 border-border cursor-pointer transition-all hover:border-primary data-[state=checked]:border-primary data-[state=checked]:bg-primary/5"
                      onClick={() => setTheme(option.value)}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{option.label}</span>
                    </Label>
                  </div>
                )
              })}
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4 pt-6 border-t border-border">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-semibold">Animations</Label>
              <p className="text-sm text-muted-foreground mt-1">
                Enable smooth transitions and animations
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-border">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-semibold">Compact Mode</Label>
              <p className="text-sm text-muted-foreground mt-1">
                Use a more compact layout
              </p>
            </div>
            <Switch />
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-border">
          <Label className="text-base font-semibold">Color Accent</Label>
          <div className="flex gap-3">
            {["blue", "cyan", "purple", "green"].map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full ring-2 ring-offset-2 ring-offset-background transition-all ${
                  color === "blue"
                    ? "bg-blue-500 ring-primary"
                    : `bg-${color}-500`
                }`}
                title={color}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
