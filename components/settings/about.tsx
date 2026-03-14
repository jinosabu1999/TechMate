'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

export function AboutSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>About TechMate</CardTitle>
          <CardDescription>
            Information about this application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <Label className="text-base font-semibold">Version</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  The current installed version
                </p>
              </div>
              <Badge>v1.0.0</Badge>
            </div>
          </div>

          <div className="space-y-2 pt-6 border-t border-border">
            <Label className="text-base font-semibold">What&apos;s New</Label>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                TechMate v1.0 brings a modern redesign with:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Beautiful dashboard interface</li>
                <li>Improved navigation with sidebar</li>
                <li>Enhanced responsive design</li>
                <li>Settings page for preferences</li>
                <li>Better accessibility support</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-border">
            <Label className="text-base font-semibold">Help & Support</Label>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Documentation
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Github className="h-4 w-4 mr-2" />
                View on GitHub
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Technologies</CardTitle>
          <CardDescription>
            Built with modern web technologies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Framework</span>
              <Badge variant="secondary">Next.js 14</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Styling</span>
              <Badge variant="secondary">Tailwind CSS</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Components</span>
              <Badge variant="secondary">Radix UI</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Animations</span>
              <Badge variant="secondary">Framer Motion</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Label({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return <label className={`text-sm font-medium ${className}`}>{children}</label>
}
