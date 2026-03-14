'use client'

import { Layout } from "@/components/layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppearanceSettings } from "@/components/settings/appearance"
import { PreferencesSettings } from "@/components/settings/preferences"
import { AboutSettings } from "@/components/settings/about"
import { Sliders, Palette, Info } from "lucide-react"

export default function SettingsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
          <p className="text-lg text-muted-foreground">
            Customize TechMate to your preferences
          </p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Sliders className="h-4 w-4" />
              <span className="hidden sm:inline">Preferences</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline">About</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <TabsContent value="appearance">
              <AppearanceSettings />
            </TabsContent>

            <TabsContent value="preferences">
              <PreferencesSettings />
            </TabsContent>

            <TabsContent value="about">
              <AboutSettings />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </Layout>
  )
}
