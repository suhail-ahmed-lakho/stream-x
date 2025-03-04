"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, Info, ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeartButton } from "@/components/heart-button"
import { getImageUrl, type MovieResult } from "@/lib/tmdb"
import { motion, AnimatePresence } from "framer-motion"

interface HeroSectionProps {
  movies?: MovieResult[]
}

export function HeroSection({ movies = [] }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (movies.length === 0 || isHovering) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [movies, isHovering])

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length)
  }

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)
  }

  if (!movies.length) {
    return (
      <div className="relative w-full h-[85vh] bg-black/90 flex items-center justify-center">
        <div className="animate-pulse text-white text-xl">Loading amazing content...</div>
      </div>
    )
  }

  const currentMovie = movies[currentIndex]
  const releaseYear = currentMovie?.release_date ? new Date(currentMovie.release_date).getFullYear() : ""
  const rating = Math.round(currentMovie?.vote_average * 10)

  return (
    <div 
      className="relative w-full h-[85vh] overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 bg-black"
        >
          <Image
            src={getImageUrl(currentMovie?.backdrop_path, "original") || "/placeholder.svg"}
            alt={currentMovie?.title || "Movie poster"}
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-4 md:px-8">
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full bg-black/20 hover:bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300"
          onClick={handlePrevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full bg-black/20 hover:bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300"
          onClick={handleNextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl space-y-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-wide">
            <span className="text-steam-red">{currentMovie?.title}</span>
          </h1>

          <div className="flex items-center gap-4 text-sm md:text-base">
            <span className="text-green-500 font-semibold">{rating}% Match</span>
            <span>{releaseYear}</span>
            <span className="border border-gray-600 px-2 py-0.5 rounded">
              {currentMovie?.adult ? "18+" : "PG-13"}
            </span>
            <span className="border border-gray-600 px-2 py-0.5 rounded">HD</span>
          </div>

          <p className="text-lg text-gray-200 line-clamp-3 md:w-4/5">
            {currentMovie?.overview}
          </p>

          <div className="flex items-center gap-4 pt-4">
            <Link href={`/movie/${currentMovie?.id}`}>
              <Button 
                size="lg"
                className="bg-white text-black hover:bg-white/90 gap-2 px-8"
              >
                <Play className="h-5 w-5 fill-black" />
                Play Now
              </Button>
            </Link>
            <HeartButton movie={currentMovie} />
            <Button
              size="lg"
              variant="outline"
              className="bg-gray-700/60 text-white border-gray-600 hover:bg-gray-700/80 gap-2 px-6"
            >
              <Info className="h-5 w-5" />
              More Info
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
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
        {movies.slice(0, 5).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex 
                ? "w-8 h-1.5 bg-steam-red" 
                : "w-2 h-1.5 bg-gray-600 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

