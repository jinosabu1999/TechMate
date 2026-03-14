import { Layout } from "@/components/layout"
import { ToolLayout } from "@/components/tool-layout"
import { PasswordGenerator } from "@/components/password-generator"
import { KeyRound } from "lucide-react"

export const metadata = {
  title: "Password Generator - TechMate",
  description: "Create strong, secure passwords with customizable options",
}

export default function Home() {
  return (
    <Layout>
      <ToolLayout
        title="Password Generator"
        description="Create strong, secure passwords instantly. Customize the length and character types to match your security requirements."
        icon={KeyRound}
        breadcrumbs={[{ label: "Tools" }, { label: "Password Generator" }]}
      >
        <PasswordGenerator />
      </ToolLayout>
    </Layout>
  )
}


