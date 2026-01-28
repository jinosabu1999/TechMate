"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Copy,
  RefreshCw,
  Check,
  Shield,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export function PasswordGenerator() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [copied, setCopied] = useState(false)

  const generatePassword = useCallback(() => {
    let charset = ""
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz"
    if (includeNumbers) charset += "0123456789"
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?"

    if (charset === "") {
      charset = "abcdefghijklmnopqrstuvwxyz"
    }

    let newPassword = ""
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setPassword(newPassword)
    setCopied(false)
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols])

  useEffect(() => {
    generatePassword()
  }, [generatePassword])

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(password)
    setCopied(true)
    toast.success("Password copied to clipboard")
    setTimeout(() => setCopied(false), 2000)
  }

  const getStrength = () => {
    let score = 0
    if (length >= 12) score++
    if (length >= 16) score++
    if (includeUppercase && includeLowercase) score++
    if (includeNumbers) score++
    if (includeSymbols) score++

    if (score <= 2) return { label: "Weak", color: "text-destructive", bg: "bg-destructive", icon: ShieldAlert }
    if (score <= 3) return { label: "Medium", color: "text-yellow-500", bg: "bg-yellow-500", icon: Shield }
    return { label: "Strong", color: "text-accent", bg: "bg-accent", icon: ShieldCheck }
  }

  const strength = getStrength()
  const StrengthIcon = strength.icon

  const options = [
    {
      id: "uppercase",
      label: "Uppercase",
      sublabel: "A-Z",
      checked: includeUppercase,
      onChange: setIncludeUppercase,
    },
    {
      id: "lowercase",
      label: "Lowercase",
      sublabel: "a-z",
      checked: includeLowercase,
      onChange: setIncludeLowercase,
    },
    {
      id: "numbers",
      label: "Numbers",
      sublabel: "0-9",
      checked: includeNumbers,
      onChange: setIncludeNumbers,
    },
    {
      id: "symbols",
      label: "Symbols",
      sublabel: "!@#$%",
      checked: includeSymbols,
      onChange: setIncludeSymbols,
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Password Display */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/50 to-accent/30 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
        <div className="relative bg-card border border-border rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <StrengthIcon className={cn("h-5 w-5", strength.color)} />
              <span className={cn("text-sm font-medium", strength.color)}>
                {strength.label}
              </span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1.5 w-6 rounded-full transition-colors",
                    i <=
                      (strength.label === "Weak"
                        ? 2
                        : strength.label === "Medium"
                        ? 3
                        : 5)
                      ? strength.bg
                      : "bg-muted"
                  )}
                />
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="font-mono text-lg sm:text-xl md:text-2xl break-all leading-relaxed text-foreground bg-muted/50 rounded-lg p-4 pr-12 min-h-[60px]">
              {password || "Generating..."}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-lg transition-all",
                copied && "text-accent"
              )}
              onClick={copyToClipboard}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="sr-only">Copy password</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-6">
        {/* Length Slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Password Length</Label>
            <span className="text-2xl font-bold text-accent tabular-nums">
              {length}
            </span>
          </div>
          <Slider
            value={[length]}
            onValueChange={([value]) => setLength(value)}
            min={6}
            max={64}
            step={1}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>6</span>
            <span>64</span>
          </div>
        </div>

        {/* Character Options */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Character Types</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {options.map((option) => (
              <div
                key={option.id}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg border transition-colors",
                  option.checked
                    ? "border-accent/50 bg-accent/5"
                    : "border-border bg-muted/30"
                )}
              >
                <div className="flex flex-col">
                  <Label
                    htmlFor={option.id}
                    className="text-sm font-medium cursor-pointer"
                  >
                    {option.label}
                  </Label>
                  <span className="text-xs text-muted-foreground font-mono">
                    {option.sublabel}
                  </span>
                </div>
                <Switch
                  id={option.id}
                  checked={option.checked}
                  onCheckedChange={option.onChange}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <Button
          className="w-full h-12 text-base font-medium bg-accent hover:bg-accent/90 text-accent-foreground"
          onClick={generatePassword}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Generate New Password
        </Button>
      </div>
    </div>
  )
}
