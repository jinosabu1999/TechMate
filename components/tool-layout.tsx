import Link from 'next/link'
import { ArrowLeft, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'

interface ToolLayoutProps {
  title: string
  description: string
  icon?: LucideIcon
  breadcrumbs?: Array<{ label: string; href?: string }>
  children: React.ReactNode
}

export function ToolLayout({
  title,
  description,
  icon: Icon,
  breadcrumbs,
  children,
}: ToolLayoutProps) {
  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {breadcrumbs.map((crumb, index) => (
              <BreadcrumbItem key={crumb.label}>
                {crumb.href ? (
                  <>
                    <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                  </>
                ) : (
                  <>
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  </>
                )}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          {Icon && (
            <div className="rounded-lg bg-gradient-to-r from-primary to-accent p-3">
              <Icon className="h-6 w-6 text-primary-foreground" />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{title}</h1>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl">{description}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div>{children}</div>
    </div>
  )
}
