"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { ContentRow } from "@/components/content-row"
import { fetchTrending, fetchMoviesByCategory, type MovieResult } from "@/lib/tmdb"

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState<MovieResult[]>([])
  const [actionMovies, setActionMovies] = useState<MovieResult[]>([])
  const [comedyMovies, setComedyMovies] = useState<MovieResult[]>([])
  const [horrorMovies, setHorrorMovies] = useState<MovieResult[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const trending = await fetchTrending()
        setTrendingMovies(trending.results)

        const action = await fetchMoviesByCategory("action")
        setActionMovies(action.results)

        const comedy = await fetchMoviesByCategory("comedy")
        setComedyMovies(comedy.results)

        const horror = await fetchMoviesByCategory("horror")
        setHorrorMovies(horror.results)

        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch movies:", error)
        setIsLoading(false)
      }
    }

    fetchMovies()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white dark:bg-black">
      <Header />
      <main>
        <HeroSection movies={trendingMovies} />

        <div className="container mx-auto px-4 py-8 space-y-12">
          <ContentRow title="Trending Now" movies={trendingMovies} isLoading={isLoading} />
          <ContentRow title="Action Movies" movies={actionMovies} isLoading={isLoading} />
          <ContentRow title="Comedy Movies" movies={comedyMovies} isLoading={isLoading} />
          <ContentRow title="Horror Movies" movies={horrorMovies} isLoading={isLoading} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

