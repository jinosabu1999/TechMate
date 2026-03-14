import { Layout } from "@/components/layout"
import { ToolLayout } from "@/components/tool-layout"
import { Converter } from "@/components/converter"
import { FileType } from "lucide-react"

export const metadata = {
  title: "Unit Converter - TechMate",
  description: "Convert between different units instantly",
}

export default function ConverterPage() {
  return (
    <Layout>
      <ToolLayout
        title="Unit Converter"
        description="Convert between different units instantly. Supports length, weight, and temperature conversions with precision."
        icon={FileType}
        breadcrumbs={[{ label: "Tools" }, { label: "Converter" }]}
      >
        <Converter />
      </ToolLayout>
    </Layout>
  )
}


