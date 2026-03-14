import { Layout } from "@/components/layout"
import { ToolLayout } from "@/components/tool-layout"
import { Recorder } from "@/components/recorder"
import { Mic } from "lucide-react"

export const metadata = {
  title: "Voice Recorder & Transcriber - TechMate",
  description: "Record audio and get instant transcriptions",
}

export default function RecorderPage() {
  return (
    <Layout>
      <ToolLayout
        title="Voice Recorder & Transcriber"
        description="Record audio and get instant transcriptions. Save and manage your transcripts with ease."
        icon={Mic}
        breadcrumbs={[{ label: "Tools" }, { label: "Recorder" }]}
      >
        <Recorder />
      </ToolLayout>
    </Layout>
  )
}


