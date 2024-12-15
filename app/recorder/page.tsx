import { Layout } from "@/components/layout"
import { ToolTabs } from "@/components/tool-tabs"
import { Recorder } from "@/components/recorder"

export default function RecorderPage() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center mb-6">Multi-Tool Kit</h1>
      <ToolTabs />
      <Recorder />
    </Layout>
  )
}


