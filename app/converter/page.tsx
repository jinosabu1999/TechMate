import { Layout } from "@/components/layout"
import { ToolTabs } from "@/components/tool-tabs"
import { Converter } from "@/components/converter"

export default function ConverterPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Unit Converter</h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto">Convert between different units instantly. Supports length, weight, and temperature conversions with precision.</p>
        </div>
        <ToolTabs />
        <Converter />
      </div>
    </Layout>
  )
}


