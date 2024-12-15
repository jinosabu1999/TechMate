import { Layout } from "@/components/layout"
import { ToolTabs } from "@/components/tool-tabs"
import { PasswordGenerator } from "@/components/password-generator"

export default function Home() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">Multi-Tool Kit</h1>
      <ToolTabs />
      <PasswordGenerator />
    </Layout>
  )
}


