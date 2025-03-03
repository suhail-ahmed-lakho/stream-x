"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Play, Info, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getImageUrl, type MovieResult } from "@/lib/tmdb"

interface HeroSectionProps {
  movies?: MovieResult[]
}

export function HeroSection({ movies = [] }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto scroll effect
  useEffect(() => {
    if (movies.length === 0) return // Don't set up timer if no movies

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)
    }, 6000) // Change slide every 6 seconds

    return () => clearInterval(timer)
  }, [movies])

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length)
  }

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)
  }

  // If no movies, return early with a loading state or placeholder
  if (!movies.length) {
    return (
      <div className="relative w-full h-[80vh] bg-black/90 flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    )
  }

  const currentMovie = movies[currentIndex]
  const releaseYear = currentMovie?.release_date ? new Date(currentMovie.release_date).getFullYear() : ""
  const rating = Math.round(currentMovie?.vote_average * 10)

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {/* Image Background */}
      <div className="absolute inset-0 bg-black transition-opacity duration-700">
        <Image
          src={getImageUrl(currentMovie?.backdrop_path, "original") || "/placeholder.svg?height=1080&width=1920"}
          alt={currentMovie?.title || "Movie poster"}
          fill
          className="object-cover opacity-70 transition-transform duration-700 scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-black/50 border-gray-600 text-white hover:bg-black/70"
        onClick={handlePrevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-black/50 border-gray-600 text-white hover:bg-black/70"
        onClick={handleNextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            <span className="text-steam-red">{currentMovie?.title}</span>
          </h1>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-green-500 font-semibold">{rating}% Match</span>
            <span className="text-white">{releaseYear}</span>
            <span className="border border-gray-600 px-1 text-xs text-white">PG-13</span>
            <span className="border border-gray-600 px-1 text-xs text-white">HD</span>
          </div>

          <p className="text-lg text-gray-200 mb-8 line-clamp-3">{currentMovie?.overview}</p>

          <div className="flex flex-wrap gap-4">
            <Button className="bg-white text-black hover:bg-white/90 gap-2 px-8 py-6">
              <Play className="h-5 w-5 fill-black" />
              Play
            </Button>
            <Button
              variant="outline"
              className="bg-gray-700/60 text-white border-gray-600 hover:bg-gray-700 gap-2 px-8 py-6"
            >
              <Info className="h-5 w-5" />
              More Info
            </Button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-6 bg-steam-red" : "w-2 bg-gray-600"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}

