"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WelcomeBanner } from "@/components/welcome-banner"
import { Button } from "@/components/ui/button"
import { fetchTrending, type MovieResult } from "@/lib/tmdb"
import { Film, Calendar, Star } from "lucide-react"

const timeWindows = [
  { id: "day", label: "Today" },
  { id: "week", label: "This Week" },
]

export default function TrendingPage() {
  const [timeWindow, setTimeWindow] = useState("day")
  const [movies, setMovies] = useState<MovieResult[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true)
      try {
        const data = await fetchTrendingMovies(timeWindow)
        setMovies(data.results)
      } catch (error) {
        console.error("Failed to fetch trending movies:", error)
      }
      setIsLoading(false)
    }

    fetchMovies()
  }, [timeWindow])

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="container mx-auto px-4 pt-20 pb-12">
        <div className="mb-8">
          <WelcomeBanner />
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Trending Movies</h1>
          <div className="flex gap-2 bg-gray-900/50 rounded-lg p-1">
            {timeWindows.map((tw) => (
              <Button
                key={tw.id}
                variant={timeWindow === tw.id ? "default" : "ghost"}
                className={timeWindow === tw.id ? "bg-steam-red hover:bg-steam-red/90" : ""}
                onClick={() => setTimeWindow(tw.id)}
              >
                {tw.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[2/3] rounded-lg bg-gray-800/50 animate-pulse"
                />
              ))
            : movies.map((movie) => (
                <div
                  key={movie.id}
                  className="group relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-900/50"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-semibold mb-1">{movie.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="flex items-center gap-1 bg-steam-red/90 text-white text-sm px-2 py-0.5 rounded">
                          <Star className="h-3 w-3 fill-current" />
                          {movie.vote_average.toFixed(1)}
                        </span>
                        <span className="text-sm text-gray-300">
                          {new Date(movie.release_date).getFullYear()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 line-clamp-2 mb-4">
                        {movie.overview}
                      </p>
                      <Button 
                        className="w-full bg-steam-red hover:bg-steam-red/90"
                        onClick={() => window.location.href = `/movie/${movie.id}`}
                      >
                        <Film className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </main>
      <Footer />
    </div>
  )
} 