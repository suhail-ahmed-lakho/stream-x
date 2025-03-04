"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { toast } from "sonner"
import { MovieResult } from "@/lib/tmdb"

interface HeartButtonProps {
  movie: MovieResult
  variant?: "default" | "icon"
}

export function HeartButton({ movie, variant = "default" }: HeartButtonProps) {
  const [isInWatchlist, setIsInWatchlist] = useState(false)

  useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]")
    setIsInWatchlist(watchlist.some((m: MovieResult) => m.id === movie.id))
  }, [movie.id])

  const toggleWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]")
    
    if (isInWatchlist) {
      const updatedWatchlist = watchlist.filter((m: MovieResult) => m.id !== movie.id)
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist))
      setIsInWatchlist(false)
      toast.success("Removed from My List")
    } else {
      localStorage.setItem("watchlist", JSON.stringify([...watchlist, movie]))
      setIsInWatchlist(true)
      toast.success("Added to My List")
    }
  }

  if (variant === "icon") {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-white/10"
        onClick={toggleWatchlist}
      >
        <Heart
          className={`h-6 w-6 ${
            isInWatchlist ? "fill-steam-red text-steam-red" : "text-white"
          }`}
        />
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      className={`${
        isInWatchlist 
          ? "bg-steam-red hover:bg-steam-red/90 border-none" 
          : "hover:bg-white/10"
      }`}
      onClick={toggleWatchlist}
    >
      <Heart
        className={`h-4 w-4 mr-2 ${
          isInWatchlist ? "fill-white" : "text-white"
        }`}
      />
      {isInWatchlist ? "Added to List" : "Add to List"}
    </Button>
  )
} 