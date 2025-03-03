"use client"

import Link from "next/link"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Play, Plus, ThumbsUp, Share, Download, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContentRow } from "@/components/content-row"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchMovieDetails, fetchMovieVideos, fetchMoviesByCategory, getImageUrl } from "@/lib/tmdb"
import ReactPlayer from "react-player/lazy"

export default function MoviePage({ params }: { params: { id: string } }) {
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [movie, setMovie] = useState<any>(null)
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null)
  const [similarMovies, setSimilarMovies] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieId = Number.parseInt(params.id)
        const movieData = await fetchMovieDetails(movieId)
        setMovie(movieData)

        // Get similar movies based on the first genre
        if (movieData.genres && movieData.genres.length > 0) {
          const genre = movieData.genres[0].name.toLowerCase()
          const similar = await fetchMoviesByCategory(genre)
          setSimilarMovies(similar.results.filter((m: any) => m.id !== movieId))
        }

        // Get trailer
        const videos = await fetchMovieVideos(movieId)
        const trailer = videos.results.find(
          (video: any) => video.type === "Trailer" || video.type === "Teaser" || video.official === true,
        )

        if (trailer) {
          setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`)
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch movie:", error)
        setIsLoading(false)
      }
    }

    fetchMovie()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main>
          <div className="relative w-full h-[70vh]">
            <Skeleton className="w-full h-full" />
          </div>
          <div className="container mx-auto px-4 py-8">
            <Skeleton className="h-12 w-1/3 mb-4" />
            <Skeleton className="h-6 w-1/4 mb-8" />
            <Skeleton className="h-24 w-full mb-8" />
            <div className="grid md:grid-cols-3 gap-8">
              <Skeleton className="h-64 col-span-2" />
              <Skeleton className="h-64" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Movie not found</p>
      </div>
    )
  }

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : ""
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : ""
  const director = movie.credits?.crew.find((person: any) => person.job === "Director")
  const cast = movie.credits?.cast.slice(0, 5) || []
  const genres = movie.genres?.map((genre: any) => genre.name).join(", ") || ""

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main>
        {/* Hero Section with Video/Image */}
        <div className="relative w-full h-[70vh]">
          {isPlaying && trailerUrl ? (
            <div className="absolute inset-0 bg-black">
              <ReactPlayer
                url={trailerUrl}
                width="100%"
                height="100%"
                playing={true}
                muted={isMuted}
                controls={true}
                style={{ position: "absolute", top: 0, left: 0 }}
              />
            </div>
          ) : (
            <>
              <div className="absolute inset-0 bg-black">
                <Image
                  src={getImageUrl(movie.backdrop_path, "original") || "/placeholder.svg?height=1080&width=1920"}
                  alt={movie.title}
                  fill
                  className="object-cover opacity-70"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>

              <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
                <div className="max-w-2xl animate-slide-up">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                    <span className="text-steam-red">{movie.title}</span>
                  </h1>

                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-green-500 font-semibold">{Math.round(movie.vote_average * 10)}% Match</span>
                    <span>{releaseYear}</span>
                    <span className="border border-gray-600 px-1 text-xs">{movie.adult ? "R" : "PG-13"}</span>
                    <span>{runtime}</span>
                    <span className="border border-gray-600 px-1 text-xs">HD</span>
                  </div>

                  <p className="text-lg text-gray-200 mb-8 line-clamp-3">{movie.overview}</p>

                  <div className="flex flex-wrap gap-4">
                    <Button
                      className="bg-white text-black hover:bg-white/90 gap-2 px-8 py-6"
                      onClick={() => trailerUrl && setIsPlaying(true)}
                      disabled={!trailerUrl}
                    >
                      <Play className="h-5 w-5 fill-black" />
                      {trailerUrl ? "Play Trailer" : "No Trailer Available"}
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-gray-700/60 text-white border-gray-600 hover:bg-gray-700 gap-2 px-6 py-6"
                    >
                      <Plus className="h-5 w-5" />
                      My List
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-gray-700/60 border-gray-600 hover:bg-gray-700 h-12 w-12 rounded-full"
                    >
                      <ThumbsUp className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-gray-700/60 border-gray-600 hover:bg-gray-700 h-12 w-12 rounded-full"
                    >
                      <Share className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="ml-auto bg-black/40 border-gray-500 text-white hover:bg-black/60 rounded-full h-12 w-12"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Movie Details */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="trailers">Trailers & More</TabsTrigger>
                  <TabsTrigger value="similar">Similar</TabsTrigger>
                </TabsList>
                <TabsContent value="about" className="space-y-6">
                  <div>
                    <p className="text-lg">{movie.overview}</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-gray-400 mb-2">Cast</h3>
                      <p>{cast.map((person: any) => person.name).join(", ")}</p>
                    </div>
                    <div>
                      <h3 className="text-gray-400 mb-2">Genres</h3>
                      <p>{genres}</p>
                    </div>
                    <div>
                      <h3 className="text-gray-400 mb-2">Director</h3>
                      <p>{director?.name || "Unknown"}</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="trailers" className="space-y-6">
                  {trailerUrl ? (
                    <div className="aspect-video w-full">
                      <ReactPlayer url={trailerUrl} width="100%" height="100%" controls={true} />
                    </div>
                  ) : (
                    <p>No trailers available for this movie.</p>
                  )}
                </TabsContent>
                <TabsContent value="similar">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {similarMovies.slice(0, 8).map((movie) => (
                      <Link
                        key={movie.id}
                        href={`/movie/${movie.id}`}
                        className="relative aspect-video rounded-md overflow-hidden hover:scale-105 transition duration-200"
                      >
                        <Image
                          src={
                            getImageUrl(movie.backdrop_path || movie.poster_path, "w500") ||
                            "/placeholder.svg?height=720&width=1280"
                          }
                          alt={movie.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-0 left-0 p-4">
                            <p className="font-semibold line-clamp-1">{movie.title}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <div className="bg-gray-900 rounded-lg p-6 space-y-4">
                <h3 className="text-xl font-semibold">Available to Download</h3>
                <p className="text-gray-400">Watch offline on the Steam X app when you download this title.</p>
                <Button className="w-full gap-2 bg-steam-red hover:bg-steam-red/90">
                  <Download className="h-5 w-5" />
                  Download
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <ContentRow title="More Like This" movies={similarMovies} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

