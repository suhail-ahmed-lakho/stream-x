"use client"

import { SubscriptionGuard } from "@/components/subscription-guard"
import { MoviePlayer } from "@/components/movie-player" // You'll need to create this

export default function WatchPage() {
  return (
    <SubscriptionGuard>
      <MoviePlayer />
    </SubscriptionGuard>
  )
} 