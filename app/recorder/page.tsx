import { Layout } from "@/components/layout"
import { ToolTabs } from "@/components/tool-tabs"
import { Recorder } from "@/components/recorder"

export default function RecorderPage() {
  return (
    <Layout>
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">
          Voice Recorder
        </h1>
        <p className="text-muted-foreground text-lg">
          Transcribe your voice to text in real-time
        </p>
      </div>
      <ToolTabs />
      <Recorder />
    </Layout>
  )
}
