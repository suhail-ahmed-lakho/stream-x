"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SubscriptionGuardProps {
  children: React.ReactNode
}

export function SubscriptionGuard({ children }: SubscriptionGuardProps) {
  const router = useRouter()
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkSubscription = () => {
      const token = localStorage.getItem("token")
      const subscriptionStatus = localStorage.getItem("subscriptionStatus")
      
      if (!token) {
        router.push("/auth/login")
        return
      }
      
      setIsSubscribed(subscriptionStatus === "active")
      setIsLoading(false)
    }

    checkSubscription()
  }, [router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isSubscribed) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center p-4">
        <Lock className="h-16 w-16 text-steam-red" />
        <h1 className="text-2xl font-bold">Premium Content</h1>
        <p className="text-gray-400 max-w-md">
          Subscribe to StreamX to unlock this content and enjoy unlimited access to our entire library.
        </p>
        <Button 
          className="bg-steam-red hover:bg-steam-red/90"
          onClick={() => router.push("/subscription")}
        >
          View Plans
        </Button>
      </div>
    )
  }

  return children
} 