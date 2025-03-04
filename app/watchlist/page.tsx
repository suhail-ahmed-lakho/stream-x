"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, X } from "lucide-react"
import { MovieResult } from "@/lib/tmdb"
import Image from "next/image"
import { toast } from "sonner"

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<MovieResult[]>([])

  useEffect(() => {
    const storedWatchlist = localStorage.getItem("watchlist")
    if (storedWatchlist) {
      setWatchlist(JSON.parse(storedWatchlist))
    }
  }, [])

  const removeFromWatchlist = (movieId: number) => {
    const updatedWatchlist = watchlist.filter(movie => movie.id !== movieId)
    setWatchlist(updatedWatchlist)
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist))
    toast.success("Removed from watchlist")
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
            <h1 className="text-2xl font-bold">My List</h1>
            <span className="text-gray-400">({watchlist.length} titles)</span>
          </div>

          {watchlist.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {watchlist.map((movie) => (
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
                      <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 bg-steam-red hover:bg-steam-red/90"
                          onClick={() => window.location.href = `/movie/${movie.id}`}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Play
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeFromWatchlist(movie.id)}
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
              <h2 className="text-xl font-semibold mb-2">Your watchlist is empty</h2>
              <p className="text-gray-400 mb-6">
                Add movies and TV shows to your list to watch them later
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