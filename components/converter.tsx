'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const units = {
  length: ['meters', 'feet', 'inches', 'centimeters'],
  weight: ['kilograms', 'pounds', 'ounces', 'grams'],
  temperature: ['celsius', 'fahrenheit', 'kelvin'],
}

export function Converter() {
  const [category, setCategory] = useState('length')
  const [fromUnit, setFromUnit] = useState(units.length[0])
  const [toUnit, setToUnit] = useState(units.length[1])
  const [fromValue, setFromValue] = useState('')
  const [toValue, setToValue] = useState('')

  useEffect(() => {
    handleConvert()
  }, [category, fromUnit, toUnit, fromValue])

  const handleConvert = () => {
    const value = parseFloat(fromValue)
    if (isNaN(value) || !fromUnit || !toUnit) {
      setToValue('')
      return
    }

    let result: number
    switch (category) {
      case 'length':
        result = convertLength(value, fromUnit, toUnit)
        break
      case 'weight':
        result = convertWeight(value, fromUnit, toUnit)
        break
      case 'temperature':
        result = convertTemperature(value, fromUnit, toUnit)
        break
      default:
        result = 0
    }

    setToValue(result.toFixed(2))
  }

  return (
    <div className="p-6 rounded-lg bg-slate-900 space-y-4">
      <h2 className="text-xl text-white mb-3">Unit Converter</h2>
      <Select value={category} onValueChange={(value) => {
        setCategory(value)
        setFromUnit(units[value as keyof typeof units][0])
        setToUnit(units[value as keyof typeof units][1])
      }}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="length">Length</SelectItem>
          <SelectItem value="weight">Weight</SelectItem>
          <SelectItem value="temperature">Temperature</SelectItem>
        </SelectContent>
      </Select>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="from-value" className="text-white">From</Label>
          <Input
            id="from-value"
            type="number"
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
            className="bg-slate-800 text-white border-slate-700"
          />
          <Select value={fromUnit} onValueChange={setFromUnit}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              {units[category as keyof typeof units].map((unit) => (
                <SelectItem key={unit} value={unit}>{unit}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="to-value" className="text-white">To</Label>
          <Input
            id="to-value"
            type="number"
            value={toValue}
            readOnly
            className="bg-slate-800 text-white border-slate-700"
          />
          <Select value={toUnit} onValueChange={setToUnit}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              {units[category as keyof typeof units].map((unit) => (
                <SelectItem key={unit} value={unit}>{unit}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

function convertLength(value: number, from: string, to: string): number {
  const meterConversions: { [key: string]: number } = {
    meters: 1,
    feet: 3.28084,
    inches: 39.3701,
    centimeters: 100,
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
  }

  const kg = value / kgConversions[from]
  return kg * kgConversions[to]
}

function convertTemperature(value: number, from: string, to: string): number {
  if (from === to) return value

  let celsius: number

  switch (from) {
    case 'celsius':
      celsius = value
      break
    case 'fahrenheit':
      celsius = (value - 32) * 5/9
      break
    case 'kelvin':
      celsius = value - 273.15
      break
    default:
      return 0
  }

  switch (to) {
    case 'celsius':
      return celsius
    case 'fahrenheit':
      return (celsius * 9/5) + 32
    case 'kelvin':
      return celsius + 273.15
    default:
      return 0
  }
}

    
