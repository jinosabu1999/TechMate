import { Layout } from "@/components/layout"
import { ToolTabs } from "@/components/tool-tabs"
import { Colors } from "@/components/colors"
import { Converter } from "@/components/converter"

export default function ColorsPage() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">Multi-Tool Kit</h1>
      <ToolTabs />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Colors />
        <Converter />
      </div>
    </Layout>
  )
}


