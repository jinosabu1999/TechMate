'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, Upload } from "lucide-react"

export function PreferencesSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tool Preferences</CardTitle>
          <CardDescription>
            Configure default settings for each tool
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label className="text-base font-semibold">Password Generator</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-4 border-l-2 border-primary/20">
              <div className="space-y-2">
                <Label htmlFor="password-length">Default Length</Label>
                <Select defaultValue="16">
                  <SelectTrigger id="password-length">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="8">8 characters</SelectItem>
                    <SelectItem value="12">12 characters</SelectItem>
                    <SelectItem value="16">16 characters</SelectItem>
                    <SelectItem value="24">24 characters</SelectItem>
                    <SelectItem value="32">32 characters</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <div className="flex-1">
                  <Label className="text-sm">Include Symbols</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Add special characters
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-border">
            <Label className="text-base font-semibold">Voice Recorder</Label>
            <div className="space-y-3 pl-4 border-l-2 border-accent/20">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-transcript">Auto-transcribe</Label>
                <Switch id="auto-transcript" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="save-locally">Save Locally</Label>
                <Switch id="save-locally" />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-border">
            <Label className="text-base font-semibold">Color Palette</Label>
            <div className="space-y-3 pl-4 border-l-2 border-purple-500/20">
              <div className="flex items-center justify-between">
                <Label htmlFor="color-format">Color Format</Label>
                <Select defaultValue="hex">
                  <SelectTrigger id="color-format" className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hex">HEX</SelectItem>
                    <SelectItem value="rgb">RGB</SelectItem>
                    <SelectItem value="hsl">HSL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>
            Export or import your settings and data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            <Download className="h-4 w-4 mr-2" />
            Export Settings
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Upload className="h-4 w-4 mr-2" />
            Import Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
