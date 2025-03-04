"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Play, X } from "lucide-react"
import { MovieResult } from "@/lib/tmdb"
import Image from "next/image"
import { toast } from "sonner"

interface ContinueWatchingItem extends MovieResult {
  progress: number
  lastWatched: string
}

export default function ContinueWatchingPage() {
  const [continueWatching, setContinueWatching] = useState<ContinueWatchingItem[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("continueWatching")
    if (stored) {
      setContinueWatching(JSON.parse(stored))
    }
  }, [])

  const removeFromList = (movieId: number) => {
    const updated = continueWatching.filter(movie => movie.id !== movieId)
    setContinueWatching(updated)
    localStorage.setItem("continueWatching", JSON.stringify(updated))
    toast.success("Removed from continue watching")
  }

  const formatLastWatched = (date: string) => {
    const days = Math.round((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24))
    if (days === 0) return "Today"
    if (days === 1) return "Yesterday"
    return `${days} days ago`
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="container mx-auto px-4 pt-20 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold">Continue Watching</h1>
            <span className="text-gray-400">
              ({continueWatching.length} titles)
            </span>
          </div>

          {continueWatching.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {continueWatching.map((movie) => (
                <div
                  key={movie.id}
                  className="group relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-900/50"
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-semibold mb-1">{movie.title}</h3>
                      <p className="text-sm text-gray-400 mb-2">
                        {formatLastWatched(movie.lastWatched)}
                      </p>
                      <Progress value={movie.progress} className="mb-3" />
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 bg-steam-red hover:bg-steam-red/90"
                          onClick={() => window.location.href = `/movie/${movie.id}/watch`}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Resume
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeFromList(movie.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2">
                No movies in progress
              </h2>
              <p className="text-gray-400 mb-6">
                Start watching a movie to see it here
              </p>
              <Button
                onClick={() => window.location.href = "/movies"}
                className="bg-steam-red hover:bg-steam-red/90"
              >
                Browse Movies
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
} 