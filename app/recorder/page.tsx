import { Layout } from "@/components/layout"
import { ToolTabs } from "@/components/tool-tabs"
import { Recorder } from "@/components/recorder"

export default function RecorderPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Voice Recorder & Transcriber</h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto">Record audio and get instant transcriptions. Save and manage your transcripts with ease.</p>
        </div>
        <ToolTabs />
        <Recorder />
      </div>
    </Layout>
  )
}


