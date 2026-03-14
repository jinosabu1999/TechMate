import { Layout } from "@/components/layout"
import { Dashboard } from "@/components/dashboard"

export const metadata = {
  title: "Dashboard - TechMate",
  description: "Access all your tools and utilities in one place",
}

export default function DashboardPage() {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  )
}
