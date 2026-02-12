import { Layout } from "@/components/layout"
import { ToolTabs } from "@/components/tool-tabs"
import { PasswordGenerator } from "@/components/password-generator"

export default function Home() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Password Generator</h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto">Create strong, secure passwords instantly. Customize the length and character types to match your security requirements.</p>
        </div>
        <ToolTabs />
        <PasswordGenerator />
      </div>
    </Layout>
  )
}


