import { Card } from "@/components/ui/card"
import { db } from "@/lib/db"
import {
  Users,
  Film,
  CreditCard,
  TrendingUp,
} from "lucide-react"

export default async function AdminDashboard() {
  // Fetch stats from your database
  const stats = await Promise.all([
    db.user.count(),
    db.subscription.count(),
    db.subscription.count({ where: { status: "PENDING" } }),
  ])

  const cards = [
    {
      title: "Total Users",
      value: stats[0],
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Active Subscriptions",
      value: stats[1],
      icon: CreditCard,
      color: "bg-green-500",
    },
    {
      title: "Pending Approvals",
      value: stats[2],
      icon: TrendingUp,
      color: "bg-yellow-500",
    },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Card
              key={card.title}
              className="p-6 bg-gray-900/50 border-gray-800"
            >
              <div className="flex items-center gap-4">
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{card.title}</p>
                  <h3 className="text-2xl font-bold">{card.value}</h3>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Add more dashboard content here */}
    </div>
  )
} 