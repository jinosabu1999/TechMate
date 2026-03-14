'use client'

import Link from 'next/link'
import { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ToolCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  color?: 'blue' | 'cyan' | 'purple' | 'green' | 'orange'
  stats?: {
    label: string
    value: string | number
  }[]
}

const colorClasses = {
  blue: 'from-blue-600 to-blue-400',
  cyan: 'from-cyan-600 to-cyan-400',
  purple: 'from-purple-600 to-purple-400',
  green: 'from-green-600 to-green-400',
  orange: 'from-orange-600 to-orange-400',
}

export function ToolCard({
  title,
  description,
  icon: Icon,
  href,
  color = 'blue',
  stats = [],
}: ToolCardProps) {
  return (
    <Link href={href}>
      <Card variant="interactive" className="h-full">
        <CardHeader>
          <div className="flex items-start justify-between mb-4">
            <div className={cn('rounded-lg p-3 bg-gradient-to-br', colorClasses[color])}>
              <Icon className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="text-sm">{description}</CardDescription>
        </CardHeader>

        {stats.length > 0 && (
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-surface-light rounded-lg p-3">
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        )}

        <CardContent className="pt-4 border-t border-border/30">
          <Button asChild className="w-full">
            <Link href={href}>
              Open Tool
            </Link>
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}
