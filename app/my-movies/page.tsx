"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, Clock } from "lucide-react"
import { MovieResult } from "@/lib/tmdb"
import Image from "next/image"

interface RecentlyWatchedMovie extends MovieResult {
  watchedAt: string
}

export default function MyMoviesPage() {
  const [recentlyWatched, setRecentlyWatched] = useState<RecentlyWatchedMovie[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("recentlyWatched")
    if (stored) {
      setRecentlyWatched(JSON.parse(stored))
    }
  }, [])

  const formatWatchDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
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
            <h1 className="text-2xl font-bold">Recently Watched</h1>
            <span className="text-gray-400">
              ({recentlyWatched.length} movies)
            </span>
          </div>

          {recentlyWatched.length > 0 ? (
            <div className="space-y-6">
              {recentlyWatched.map((movie) => (
                <div
                  key={movie.id}
                  className="group relative bg-gray-900/50 rounded-lg overflow-hidden hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex gap-4 p-4">
                    <div className="relative w-32 aspect-[2/3] flex-shrink-0">
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                        {movie.overview}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center text-sm text-gray-400">
                          <Clock className="h-4 w-4 mr-1" />
                          Watched on {formatWatchDate(movie.watchedAt)}
                        </div>
                        <Button 
                          className="bg-steam-red hover:bg-steam-red/90"
                          onClick={() => window.location.href = `/movie/${movie.id}/watch`}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Watch Again
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
                No watched movies yet
              </h2>
              <p className="text-gray-400 mb-6">
                Start watching movies to build your history
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