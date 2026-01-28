import { Layout } from "@/components/layout"
import { ToolTabs } from "@/components/tool-tabs"
import { Converter } from "@/components/converter"

export default function ConverterPage() {
  return (
    <Layout>
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">
          Unit Converter
        </h1>
        <p className="text-muted-foreground text-lg">
          Convert between different units of measurement
        </p>
      </div>
      <ToolTabs />
      <Converter />
    </Layout>
  )
}
