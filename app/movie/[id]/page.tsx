"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Play, Plus, Star, Clock, Calendar, Film, ThumbsUp } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContentRow } from "@/components/content-row"
import { fetchMovieDetails, fetchSimilarMovies, getImageUrl } from "@/lib/tmdb"

export default function MoviePage() {
  const params = useParams()
  const [movie, setMovie] = useState<any>(null)
  const [similarMovies, setSimilarMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const movieData = await fetchMovieDetails(params.id as string)
        const similarData = await fetchSimilarMovies(params.id as string)
        setMovie(movieData)
        setSimilarMovies(similarData.results)
      } catch (error) {
        console.error("Failed to fetch movie details:", error)
      }
      setIsLoading(false)
    }

    fetchData()
  }, [params.id])

  if (isLoading || !movie) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <main className="pt-20">
          <div className="animate-pulse">
            <div className="w-full h-[60vh] bg-gray-800" />
            <div className="container mx-auto px-4 py-8">
              <div className="h-8 w-64 bg-gray-800 rounded mb-4" />
              <div className="h-4 w-full bg-gray-800 rounded mb-2" />
              <div className="h-4 w-2/3 bg-gray-800 rounded" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const releaseYear = new Date(movie.release_date).getFullYear()
  const runtime = `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <div className="relative">
          {/* Backdrop Image */}
          <div className="relative h-[70vh] w-full">
            <Image
              src={getImageUrl(movie.backdrop_path || movie.poster_path, "original") || "/placeholder.svg"}
              alt={movie.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>

          {/* Movie Info Overlay */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="flex gap-8">
                {/* Movie Poster */}
                <div className="hidden md:block relative h-[400px] w-[300px] flex-shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={getImageUrl(movie.poster_path || movie.backdrop_path, "w500") || "/placeholder.svg"}
                    alt={`${movie.title} poster`}
                    fill
                    className="object-cover"
                    sizes="300px"
                    quality={85}
                  />
                </div>

                {/* Movie Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="max-w-3xl space-y-6"
                >
                  <h1 className="text-4xl md:text-6xl font-bold">
                    {movie.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                    <span className="flex items-center gap-1 bg-steam-red px-2 py-1 rounded">
                      <Star className="h-4 w-4 fill-current" />
                      {movie.vote_average.toFixed(1)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {releaseYear}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {runtime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Film className="h-4 w-4" />
                      {movie.genres.map((g: any) => g.name).join(", ")}
                    </span>
                  </div>

                  <p className="text-lg text-gray-200 max-w-2xl line-clamp-4">
                    {movie.overview}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Button size="lg" className="gap-2 bg-steam-red hover:bg-steam-red/90">
                      <Play className="h-5 w-5 fill-current" />
                      Play Now
                    </Button>
                    <Button size="lg" variant="outline" className="gap-2">
                      <Plus className="h-5 w-5" />
                      Add to List
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">About the Movie</h2>
                <p className="text-gray-300">{movie.overview}</p>
              </section>

              {movie.credits?.cast && movie.credits.cast.length > 0 && (
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Cast</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {movie.credits.cast.slice(0, 10).map((person) => (
                      <div key={person.id} className="space-y-2">
                        <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                          <Image
                            src={getImageUrl(person.profile_path, "w500") || "/placeholder-avatar.png"}
                            alt={person.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 20vw"
                          />
                        </div>
                        <div className="space-y-1">
                          <p className="font-semibold line-clamp-1">{person.name}</p>
                          <p className="text-sm text-gray-400 line-clamp-1">{person.character}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-gray-900/50 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Status</span>
                  <span>{movie.status}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Budget</span>
                  <span>${(movie.budget / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Revenue</span>
                  <span>${(movie.revenue / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Popularity</span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    {movie.popularity.toFixed(1)}
                  </span>
                </div>
              </div>

              {movie.production_companies?.length > 0 && (
                <div className="bg-gray-900/50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Production Companies</h3>
                  <div className="space-y-4">
                    {movie.production_companies.map((company) => (
                      <div key={company.id} className="text-sm text-gray-300">
                        {company.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Movies Section */}
        {similarMovies.length > 0 && (
          <div className="py-8">
            <ContentRow
              title="Similar Movies"
              movies={similarMovies}
              isLoading={false}
            />
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

