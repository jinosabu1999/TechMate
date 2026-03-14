'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ToolCard } from '@/components/tool-card'
import {
  KeyRound,
  Mic,
  Palette,
  FileType,
  ArrowRight,
  Zap,
  Clock,
} from 'lucide-react'

const tools = [
  {
    title: 'Password Generator',
    description: 'Create strong, secure passwords instantly',
    icon: KeyRound,
    href: '/',
    color: 'blue' as const,
    stats: [
      { label: 'Generated', value: 0 },
      { label: 'Strength', value: 'High' },
    ],
  },
  {
    title: 'Voice Recorder',
    description: 'Record and transcribe audio with AI',
    icon: Mic,
    href: '/recorder',
    color: 'cyan' as const,
    stats: [
      { label: 'Recordings', value: 0 },
      { label: 'Total Time', value: '0m' },
    ],
  },
  {
    title: 'Color Palette',
    description: 'Generate beautiful color palettes for design',
    icon: Palette,
    href: '/colors',
    color: 'purple' as const,
    stats: [
      { label: 'Generated', value: 0 },
      { label: 'Saved', value: 0 },
    ],
  },
  {
    title: 'Unit Converter',
    description: 'Convert between different units easily',
    icon: FileType,
    href: '/converter',
    color: 'green' as const,
    stats: [
      { label: 'Conversions', value: 0 },
      { label: 'Categories', value: 3 },
    ],
  },
]

export function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="space-y-4">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
            Welcome to TechMate
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Your all-in-one toolkit for productivity. Access powerful utilities designed to make your work easier and faster.
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Tools</p>
                <p className="text-3xl font-bold mt-1">4</p>
              </div>
              <div className="rounded-lg bg-primary/10 p-3">
                <Zap className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Times Used Today</p>
                <p className="text-3xl font-bold mt-1">0</p>
              </div>
              <div className="rounded-lg bg-accent/10 p-3">
                <Clock className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Last Used</p>
                <p className="text-lg font-semibold mt-1">Never</p>
              </div>
              <Badge variant="outline">New User</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tools Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Explore Tools</h2>
            <p className="text-sm text-muted-foreground mt-1">Access all available utilities</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
          <CardDescription>Access your favorite tools quickly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-between">
              <span>View All Tools</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between">
              <span>Settings</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
