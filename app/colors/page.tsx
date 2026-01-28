import { Layout } from "@/components/layout"
import { ToolTabs } from "@/components/tool-tabs"
import { Colors } from "@/components/colors"

export default function ColorsPage() {
  return (
    <Layout>
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">
          Color Palette
        </h1>
        <p className="text-muted-foreground text-lg">
          Generate beautiful color combinations instantly
        </p>
      </div>
      <ToolTabs />
      <Colors />
    </Layout>
  )
}
