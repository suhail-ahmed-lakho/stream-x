"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WelcomeBanner } from "@/components/welcome-banner"
import { Button } from "@/components/ui/button"
import { fetchMoviesByCategory, type MovieResult } from "@/lib/tmdb"
import { 
  Film, Flame, Heart, Star, Trophy, 
  Popcorn, Clapperboard, Skull, Laugh 
} from "lucide-react"

const categories = [
  { id: "trending", name: "Trending", icon: Flame },
  { id: "top_rated", name: "Top Rated", icon: Trophy },
  { id: "popular", name: "Popular", icon: Star },
  { id: "action", name: "Action", icon: Film },
  { id: "comedy", name: "Comedy", icon: Laugh },
  { id: "horror", name: "Horror", icon: Skull },
  { id: "romance", name: "Romance", icon: Heart },
  { id: "animation", name: "Animation", icon: Popcorn },
  { id: "drama", name: "Drama", icon: Clapperboard },
]

export default function MoviesPage() {
  const [selectedCategory, setSelectedCategory] = useState("trending")
  const [movies, setMovies] = useState<MovieResult[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true)
      try {
        const data = await fetchMoviesByCategory(selectedCategory)
        setMovies(data.results)
      } catch (error) {
        console.error("Failed to fetch movies:", error)
      }
      setIsLoading(false)
    }

    fetchMovies()
  }, [selectedCategory])

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="container mx-auto px-4 pt-20 pb-12">
        {/* Welcome Banner */}
        <div className="mb-8">
          <WelcomeBanner />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Categories Sidebar */}
          <aside className="md:w-64 flex-shrink-0">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4 px-2">Categories</h2>
              <nav className="space-y-1">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <Button
                      key={category.id}
                      variant="ghost"
                      className={`w-full justify-start gap-3 ${
                        selectedCategory === category.id
                          ? "bg-steam-red text-white"
                          : "hover:bg-gray-800/50 text-gray-300 hover:text-white"
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <Icon className={`h-5 w-5 ${selectedCategory === category.id ? "text-white" : "text-gray-400"}`} />
                      {category.name}
                    </Button>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Movies Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading
                ? Array.from({ length: 12 }).map((_, i) => (
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
                          <div className="flex gap-2">
                            <Button 
                              className="flex-1 bg-steam-red hover:bg-steam-red/90"
                              onClick={() => window.location.href = `/movie/${movie.id}`}
                            >
                              <Film className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 