"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Play, Info, Filter, Star, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { fetchMoviesByCategory, getImageUrl, type MovieResult } from "@/lib/tmdb"
import { HeartButton } from "@/components/heart-button"

export default function CategoryPage() {
  const params = useParams()
  const [movies, setMovies] = useState<MovieResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState("popularity")
  const [viewStyle, setViewStyle] = useState<"grid" | "list">("grid")

  const categoryTitle = typeof params.type === 'string' 
    ? params.type.charAt(0).toUpperCase() + params.type.slice(1) 
    : ''

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true)
      try {
        const data = await fetchMoviesByCategory(params.type as string)
        setMovies(data.results)
      } catch (error) {
        console.error("Failed to fetch movies:", error)
      }
      setIsLoading(false)
    }

    fetchMovies()
  }, [params.type])

  const sortMovies = (movies: MovieResult[]) => {
    return [...movies].sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.vote_average - a.vote_average
        case "year":
          return new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
        case "title":
          return a.title.localeCompare(b.title)
        default:
          return b.popularity - a.popularity
      }
    })
  }

  const sortedMovies = sortMovies(movies)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 bg-gray-800 rounded" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="aspect-[16/9] bg-gray-800 rounded-lg" />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-20 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="text-4xl font-bold mb-2 text-steam-red">{categoryTitle} Movies</h1>
                <p className="text-gray-400">
                  Discover the best {categoryTitle.toLowerCase()} movies
                </p>
              </div>

              <div className="flex items-center gap-4 self-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Sort by
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSortBy("popularity")}>
                      Popularity
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("rating")}>
                      Rating
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("year")}>
                      Release Year
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("title")}>
                      Title
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex rounded-lg overflow-hidden">
                  <Button
                    variant={viewStyle === "grid" ? "default" : "outline"}
                    className="rounded-none"
                    onClick={() => setViewStyle("grid")}
                  >
                    Grid
                  </Button>
                  <Button
                    variant={viewStyle === "list" ? "default" : "outline"}
                    className="rounded-none"
                    onClick={() => setViewStyle("list")}
                  >
                    List
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className={`
              ${viewStyle === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                : "space-y-6"
              }
              pb-8
            `}
          >
            {sortedMovies.map((movie) => (
              <motion.div
                key={movie.id}
                variants={item}
                className={`
                  bg-gray-900/80 rounded-lg overflow-hidden transition-all duration-300 hover:bg-gray-900
                  ${viewStyle === "list" 
                    ? "flex md:h-48 hover:scale-[1.02]" 
                    : "hover:scale-[1.03]"
                  }
                `}
              >
                <div className={
                  viewStyle === "list" 
                    ? "w-[180px] md:w-[256px] flex-shrink-0" 
                    : "w-full"
                }>
                  <div className={`
                    relative ${viewStyle === "list" ? "h-full" : "aspect-[16/9]"}
                  `}>
                    <Image
                      src={
                        getImageUrl(
                          viewStyle === "list" 
                            ? (movie.poster_path || movie.backdrop_path)
                            : (movie.backdrop_path || movie.poster_path), 
                          "w500"
                        ) || "/placeholder.svg"
                      }
                      alt={movie.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
                  </div>
                </div>

                <div className={`
                  flex flex-col p-4 
                  ${viewStyle === "list" ? "flex-1 justify-between" : ""}
                `}>
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h2 className="text-lg font-semibold line-clamp-1">{movie.title}</h2>
                        <p className="text-sm text-gray-400">
                          {new Date(movie.release_date).getFullYear()} • 
                          {movie.adult ? " 18+" : " PG-13"}
                        </p>
                      </div>
                      <span className="flex items-center gap-1 bg-steam-red/90 text-white text-sm px-2 py-1 rounded-md">
                        <Star className="h-3 w-3 fill-current" />
                        {movie.vote_average.toFixed(1)}
                      </span>
                    </div>

                    <p className={`
                      text-sm text-gray-400
                      ${viewStyle === "list" ? "line-clamp-3" : "line-clamp-2"}
                    `}>
                      {movie.overview}
                    </p>
                  </div>

                  <div className={`
                    flex items-center gap-3 
                    ${viewStyle === "list" ? "mt-4" : "mt-4"}
                  `}>
                    <Link href={`/movie/${movie.id}`} className="flex-1">
                      <Button 
                        className="w-full gap-2 bg-steam-red hover:bg-steam-red/90"
                      >
                        <Play className="h-4 w-4 fill-current" />
                        Play Now
                      </Button>
                    </Link>
                    <HeartButton movie={movie} variant="icon" />
                    <Button 
                      size="icon" 
                      variant="outline"
                      className="bg-black/20 border-gray-700 hover:bg-black/40"
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 