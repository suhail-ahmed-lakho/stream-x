"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "sonner"

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/subscriptions/${id}/approve`, {
        method: "POST",
      })

      if (!response.ok) throw new Error("Failed to approve subscription")

      toast.success("Subscription approved successfully")
      // Refresh subscriptions list
    } catch (error) {
      toast.error("Failed to approve subscription")
    }
  }

  const handleReject = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/subscriptions/${id}/reject`, {
        method: "POST",
      })

      if (!response.ok) throw new Error("Failed to reject subscription")

      toast.success("Subscription rejected successfully")
      // Refresh subscriptions list
    } catch (error) {
      toast.error("Failed to reject subscription")
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Subscription Management</h1>

      <div className="rounded-lg border border-gray-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.map((sub: any) => (
              <TableRow key={sub.id}>
                <TableCell>{sub.user.email}</TableCell>
                <TableCell>{sub.plan.name}</TableCell>
                <TableCell>{sub.status}</TableCell>
                <TableCell>
                  {new Date(sub.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleApprove(sub.id)}
                      disabled={sub.status !== "PENDING"}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleReject(sub.id)}
                      disabled={sub.status !== "PENDING"}
                    >
                      Reject
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 