import { Layout } from "@/components/layout"
import { ToolTabs } from "@/components/tool-tabs"
import { Colors } from "@/components/colors"

export default function ColorsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Color Palette Generator</h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto">Generate beautiful color palettes instantly. Perfect for design inspiration, web projects, and creative work.</p>
        </div>
        <ToolTabs />
        <Colors />
      </div>
    </Layout>
  )
}


