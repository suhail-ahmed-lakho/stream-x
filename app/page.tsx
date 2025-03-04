"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WelcomeBanner } from "@/components/welcome-banner"
import { ContentRow } from "@/components/content-row"
import { HeartButton } from "@/components/heart-button"
import { Button } from "@/components/ui/button"
import { fetchTrending, fetchPopularMovies, fetchTopRatedMovies, fetchMoviesByCategory } from "@/lib/tmdb"
import { Film, Star } from "lucide-react"
import { HeroSection } from "@/components/hero-section"

export default async function HomePage() {
  // Fetch initial data for hero section
  const trendingData = await fetchTrending()
  const heroMovies = trendingData.results.slice(0, 5)

  // Fetch data for content rows
  const [popularData, topRatedData, actionData, comedyData] = await Promise.all([
    fetchPopularMovies(),
    fetchTopRatedMovies(),
    fetchMoviesByCategory("action"),
    fetchMoviesByCategory("comedy")
  ])

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="min-h-screen bg-black overflow-x-hidden">
        <HeroSection movies={heroMovies} />
        
        <div className="container mx-auto relative z-10 space-y-12 pb-12 px-2 md:px-4">
          <ContentRow title="Trending Now" movies={trendingData.results} />
          <ContentRow title="Popular" movies={popularData.results} />
          <ContentRow title="Top Rated" movies={topRatedData.results} />
          <ContentRow title="Action Movies" movies={actionData.results} />
          <ContentRow title="Comedy Movies" movies={comedyData.results} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

