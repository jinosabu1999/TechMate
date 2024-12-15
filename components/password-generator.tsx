'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Copy } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

export function PasswordGenerator() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(12)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
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
  }, [])

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(password)
    toast({
      description: "Password copied to clipboard",
    })
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Input
          value={password}
          readOnly
          placeholder="Generated password will appear here"
          className="pr-10"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full"
          onClick={copyToClipboard}
        >
          <Copy className="h-4 w-4" />
          <span className="sr-only">Copy password</span>
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Password Length: {length}</Label>
          <Slider
            value={[length]}
            onValueChange={([value]) => {
              setLength(value)
              generatePassword()
            }}
            min={6}
            max={32}
            step={1}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="uppercase">Include Uppercase</Label>
            <Switch
              id="uppercase"
              checked={includeUppercase}
              onCheckedChange={(checked) => {
                setIncludeUppercase(checked)
                generatePassword()
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="lowercase">Include Lowercase</Label>
            <Switch
              id="lowercase"
              checked={includeLowercase}
              onCheckedChange={(checked) => {
                setIncludeLowercase(checked)
                generatePassword()
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="numbers">Include Numbers</Label>
            <Switch
              id="numbers"
              checked={includeNumbers}
              onCheckedChange={(checked) => {
                setIncludeNumbers(checked)
                generatePassword()
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="symbols">Include Symbols</Label>
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
        className="w-full"
        onClick={generatePassword}
      >
        Generate New Password
      </Button>
    </div>
  )
}


