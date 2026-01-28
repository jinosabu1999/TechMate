"use client"

import { useState, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ArrowRightLeft, Ruler, Scale, Thermometer } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = {
  length: {
    label: "Length",
    icon: Ruler,
    units: ["meters", "feet", "inches", "centimeters", "kilometers", "miles"],
  },
  weight: {
    label: "Weight",
    icon: Scale,
    units: ["kilograms", "pounds", "ounces", "grams", "stones"],
  },
  temperature: {
    label: "Temperature",
    icon: Thermometer,
    units: ["celsius", "fahrenheit", "kelvin"],
  },
}

function convertLength(value: number, from: string, to: string): number {
  const meterConversions: { [key: string]: number } = {
    meters: 1,
    feet: 3.28084,
    inches: 39.3701,
    centimeters: 100,
    kilometers: 0.001,
    miles: 0.000621371,
  }
  const meters = value / meterConversions[from]
  return meters * meterConversions[to]
}

function convertWeight(value: number, from: string, to: string): number {
  const kgConversions: { [key: string]: number } = {
    kilograms: 1,
    pounds: 2.20462,
    ounces: 35.274,
    grams: 1000,
    stones: 0.157473,
  }
  const kg = value / kgConversions[from]
  return kg * kgConversions[to]
}

function convertTemperature(value: number, from: string, to: string): number {
  if (from === to) return value

  let celsius: number

  switch (from) {
    case "celsius":
      celsius = value
      break
    case "fahrenheit":
      celsius = ((value - 32) * 5) / 9
      break
    case "kelvin":
      celsius = value - 273.15
      break
    default:
      return 0
  }

  switch (to) {
    case "celsius":
      return celsius
    case "fahrenheit":
      return (celsius * 9) / 5 + 32
    case "kelvin":
      return celsius + 273.15
    default:
      return 0
  }
}

export function Converter() {
  const [category, setCategory] = useState<keyof typeof categories>("length")
  const [fromUnit, setFromUnit] = useState(categories.length.units[0])
  const [toUnit, setToUnit] = useState(categories.length.units[1])
  const [fromValue, setFromValue] = useState("")
  const [toValue, setToValue] = useState("")

  const handleConvert = useCallback(() => {
    const value = parseFloat(fromValue)
    if (isNaN(value) || !fromUnit || !toUnit) {
      setToValue("")
      return
    }

    let result: number
    switch (category) {
      case "length":
        result = convertLength(value, fromUnit, toUnit)
        break
      case "weight":
        result = convertWeight(value, fromUnit, toUnit)
        break
      case "temperature":
        result = convertTemperature(value, fromUnit, toUnit)
        break
      default:
        result = 0
    }

    setToValue(result.toFixed(4).replace(/\.?0+$/, ""))
  }, [category, fromUnit, toUnit, fromValue])

  useEffect(() => {
    handleConvert()
  }, [handleConvert])

  const swapUnits = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setFromValue(toValue)
    setToValue(fromValue)
  }

  const handleCategoryChange = (newCategory: keyof typeof categories) => {
    setCategory(newCategory)
    setFromUnit(categories[newCategory].units[0])
    setToUnit(categories[newCategory].units[1])
    setFromValue("")
    setToValue("")
  }

  const CategoryIcon = categories[category].icon

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Category Selection */}
      <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
        <Label className="text-sm font-medium text-muted-foreground mb-3 block">
          Category
        </Label>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(categories) as Array<keyof typeof categories>).map(
            (cat) => {
              const Icon = categories[cat].icon
              const isActive = category === cat
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-xl border transition-all",
                    isActive
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border bg-muted/30 hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {categories[cat].label}
                  </span>
                </button>
              )
            }
          )}
        </div>
      </div>

      {/* Converter */}
      <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
            <CategoryIcon className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="font-medium">{categories[category].label} Converter</h3>
            <p className="text-sm text-muted-foreground">
              Convert between different units
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* From Input */}
          <div className="space-y-2">
            <Label htmlFor="from-value" className="text-sm text-muted-foreground">
              From
            </Label>
            <div className="flex gap-2">
              <Input
                id="from-value"
                type="number"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                placeholder="Enter value"
                className="flex-1 h-12 text-lg bg-muted/50 border-border"
              />
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger className="w-[140px] h-12 bg-muted/50 border-border">
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  {categories[category].units.map((unit) => (
                    <SelectItem key={unit} value={unit} className="capitalize">
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={swapUnits}
              className="h-10 w-10 rounded-full border-border"
            >
              <ArrowRightLeft className="h-4 w-4 rotate-90" />
              <span className="sr-only">Swap units</span>
            </Button>
          </div>

          {/* To Input */}
          <div className="space-y-2">
            <Label htmlFor="to-value" className="text-sm text-muted-foreground">
              To
            </Label>
            <div className="flex gap-2">
              <Input
                id="to-value"
                type="text"
                value={toValue}
                readOnly
                placeholder="Result"
                className="flex-1 h-12 text-lg font-medium bg-accent/5 border-accent/20 text-foreground"
              />
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger className="w-[140px] h-12 bg-muted/50 border-border">
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  {categories[category].units.map((unit) => (
                    <SelectItem key={unit} value={unit} className="capitalize">
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Result Display */}
        {fromValue && toValue && (
          <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-center text-lg">
              <span className="font-medium">{fromValue}</span>{" "}
              <span className="text-muted-foreground capitalize">{fromUnit}</span>
              {" = "}
              <span className="font-bold text-accent">{toValue}</span>{" "}
              <span className="text-muted-foreground capitalize">{toUnit}</span>
            </p>
          </div>
        )}
      </div>

      {/* Quick Reference */}
      <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">
          Quick Reference
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          {category === "length" && (
            <>
              <div className="flex justify-between p-2 rounded bg-muted/30">
                <span className="text-muted-foreground">1 meter</span>
                <span>3.28 feet</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-muted/30">
                <span className="text-muted-foreground">1 kilometer</span>
                <span>0.62 miles</span>
              </div>
            </>
          )}
          {category === "weight" && (
            <>
              <div className="flex justify-between p-2 rounded bg-muted/30">
                <span className="text-muted-foreground">1 kilogram</span>
                <span>2.2 pounds</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-muted/30">
                <span className="text-muted-foreground">1 pound</span>
                <span>16 ounces</span>
              </div>
            </>
          )}
          {category === "temperature" && (
            <>
              <div className="flex justify-between p-2 rounded bg-muted/30">
                <span className="text-muted-foreground">0°C</span>
                <span>32°F</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-muted/30">
                <span className="text-muted-foreground">100°C</span>
                <span>212°F</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
