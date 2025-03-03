"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { searchMovies, type MovieResult, getImageUrl } from "@/lib/tmdb"
import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const [results, setResults] = useState<MovieResult[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([])
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      try {
        const data = await searchMovies(query)
        setResults(data.results)
      } catch (error) {
        console.error("Failed to search movies:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [query])

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">{query ? `Search results for "${query}"` : "Search for movies"}</h1>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="aspect-[2/3] w-full rounded-md" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {results.map((movie) => (
                <Link key={movie.id} href={`/movie/${movie.id}`} className="group">
                  <div className="relative aspect-[2/3] overflow-hidden rounded-md hover-scale">
                    <Image
                      src={getImageUrl(movie.poster_path, "w500") || "/placeholder.svg?height=750&width=500"}
                      alt={movie.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button size="icon" className="h-12 w-12 rounded-full bg-steam-red hover:bg-steam-red/90">
                        <Play className="h-6 w-6 fill-white" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <h3 className="font-semibold line-clamp-1 group-hover:text-steam-red transition-colors">
                      {movie.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {movie.release_date ? new Date(movie.release_date).getFullYear() : ""}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-12">
              <p className="text-xl">No results found for "{query}"</p>
              <p className="text-gray-400 mt-2">Try a different search term</p>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl">Enter a search term to find movies</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

