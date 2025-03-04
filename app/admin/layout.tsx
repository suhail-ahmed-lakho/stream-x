import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"
import { getCurrentUser } from "@/lib/session"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user?.isAdmin) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
} 