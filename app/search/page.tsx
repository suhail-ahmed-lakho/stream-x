"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { searchMovies, type MovieResult } from "@/lib/tmdb"
import { Search as SearchIcon, Film, Star } from "lucide-react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const [query, setQuery] = useState(initialQuery)
  const [movies, setMovies] = useState<MovieResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery)

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 500)

    return () => clearTimeout(timer)
  }, [query])

  // Fetch results when debounced query changes
  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery.trim()) {
        setMovies([])
        return
      }

      setIsLoading(true)
      try {
        const data = await searchMovies(debouncedQuery)
        setMovies(data.results)
      } catch (error) {
        console.error("Failed to search movies:", error)
      }
      setIsLoading(false)
    }

    fetchResults()
  }, [debouncedQuery])

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="container mx-auto px-4 pt-20 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="relative mb-8">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search for movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 bg-gray-900/50 border-gray-800 focus:border-steam-red text-white placeholder:text-gray-400"
            />
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[2/3] rounded-lg bg-gray-800/50 animate-pulse"
                />
              ))}
            </div>
          ) : movies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {movies.map((movie) => (
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
          ) : query ? (
            <div className="text-center text-gray-400">
              No results found for "{query}"
            </div>
          ) : (
            <div className="text-center text-gray-400">
              Start typing to search for movies
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

