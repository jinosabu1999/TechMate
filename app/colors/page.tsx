import { Layout } from "@/components/layout"
import { ToolLayout } from "@/components/tool-layout"
import { Colors } from "@/components/colors"
import { Palette } from "lucide-react"

export const metadata = {
  title: "Color Palette Generator - TechMate",
  description: "Generate beautiful color palettes for design inspiration",
}

export default function ColorsPage() {
  return (
    <Layout>
      <ToolLayout
        title="Color Palette Generator"
        description="Generate beautiful color palettes instantly. Perfect for design inspiration, web projects, and creative work."
        icon={Palette}
        breadcrumbs={[{ label: "Tools" }, { label: "Color Palette" }]}
      >
        <Colors />
      </ToolLayout>
    </Layout>
  )
}


