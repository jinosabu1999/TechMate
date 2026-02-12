'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Copy, RefreshCw, Check } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

export function PasswordGenerator() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(12)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const generatePassword = () => {
    let charset = ""
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz"
    if (includeNumbers) charset += "0123456789"
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?"

    let newPassword = ""
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setPassword(newPassword)
  }

  useEffect(() => {
    generatePassword()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(password)
    setCopied(true)
    toast({
      description: "Password copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="card space-y-6">
      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-wide text-muted-foreground">Generated Password</Label>
        <div className="relative">
          <Input
            value={password}
            readOnly
            placeholder="Generated password will appear here"
            className="pr-12 text-base font-mono"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={copyToClipboard}
          >
            {copied ? (
              <Check className="h-4 w-4 text-accent" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">Copy password</span>
          </Button>
        </div>
      </div>

      <div className="space-y-4 rounded-lg bg-background/50 p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Password Length</Label>
            <span className="text-lg font-bold text-primary">{length}</span>
          </div>
          <Slider
            value={[length]}
            onValueChange={([value]) => {
              setLength(value)
              generatePassword()
            }}
            min={6}
            max={32}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Min: 6</span>
            <span>Max: 32</span>
          </div>
        </div>

        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
          <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
            <Label htmlFor="uppercase" className="text-sm">Uppercase</Label>
            <Switch
              id="uppercase"
              checked={includeUppercase}
              onCheckedChange={(checked) => {
                setIncludeUppercase(checked)
                generatePassword()
              }}
            />
          </div>
          <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
            <Label htmlFor="lowercase" className="text-sm">Lowercase</Label>
            <Switch
              id="lowercase"
              checked={includeLowercase}
              onCheckedChange={(checked) => {
                setIncludeLowercase(checked)
                generatePassword()
              }}
            />
          </div>
          <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
            <Label htmlFor="numbers" className="text-sm">Numbers</Label>
            <Switch
              id="numbers"
              checked={includeNumbers}
              onCheckedChange={(checked) => {
                setIncludeNumbers(checked)
                generatePassword()
              }}
            />
          </div>
          <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
            <Label htmlFor="symbols" className="text-sm">Symbols</Label>
            <Switch
              id="symbols"
              checked={includeSymbols}
              onCheckedChange={(checked) => {
                setIncludeSymbols(checked)
                generatePassword()
              }}
            />
          </div>
        </div>
      </div>

      <Button
        className="w-full h-11 text-base font-semibold"
        onClick={generatePassword}
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        Generate New Password
      </Button>
    </div>
  )
}


