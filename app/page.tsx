import { Layout } from "@/components/layout"
import { ToolTabs } from "@/components/tool-tabs"
import { PasswordGenerator } from "@/components/password-generator"

export default function Home() {
  return (
    <Layout>
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">
          Password Generator
        </h1>
        <p className="text-muted-foreground text-lg">
          Create strong, secure passwords instantly
        </p>
      </div>
      <ToolTabs />
      <PasswordGenerator />
    </Layout>
  )
}
