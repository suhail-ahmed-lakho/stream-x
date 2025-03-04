"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Play, Info, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { HeartButton } from "@/components/heart-button"
import { getImageUrl, type MovieResult } from "@/lib/tmdb"
import { motion, AnimatePresence } from "framer-motion"

interface ContentRowProps {
  title: string
  movies?: MovieResult[]
  isLoading?: boolean
}

export function ContentRow({ title, movies = [], isLoading = false }: ContentRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState(false)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [isHovering, setIsHovering] = useState(false)

  const handleClick = (direction: "left" | "right") => {
    setIsMoved(true)

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current
      const scrollTo = direction === "left" ? scrollLeft - clientWidth * 0.75 : scrollLeft + clientWidth * 0.75

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
    }
  }

  // Generate skeleton items for loading state
  const skeletonItems = Array.from({ length: 10 }, (_, i) => i)

  return (
    <div className="space-y-2 md:space-y-4">
      <Link href={`/category/${title.toLowerCase().replace(/\s+/g, '-')}`} className="group">
        <h2 className="text-xl font-semibold transition duration-200 group-hover:text-steam-red pl-4 flex items-center gap-2">
          {title}
          <ChevronRight className="h-4 w-4 text-steam-red group-hover:translate-x-1 transition-transform" />
        </h2>
      </Link>

      <div 
        className="group relative md:px-4"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Button
          variant="outline"
          size="icon"
          className={`absolute left-0 top-0 bottom-0 z-40 m-auto h-12 w-12 translate-x-[-50%] bg-black/50 border-gray-600 text-white hover:bg-black/70 rounded-full opacity-0 transition-all duration-200 ${
            isMoved ? "group-hover:opacity-100" : ""
          }`}
          onClick={() => handleClick("left")}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div
          ref={rowRef}
          className="flex items-center space-x-4 overflow-x-scroll scrollbar-hide md:p-4"
          style={{ 
            scrollbarWidth: "none", 
            msOverflowStyle: "none",
            scrollBehavior: "smooth"
          }}
        >
          {isLoading
            ? skeletonItems.map((index) => (
                <div 
                  key={index} 
                  className="relative flex-none w-[200px] md:w-[280px] animate-pulse"
                >
                  <div className="aspect-[16/9] overflow-hidden rounded-lg">
                    <Skeleton className="h-full w-full" />
                  </div>
                </div>
              ))
            : movies.map((movie) => (
                <motion.div
                  key={movie.id}
                  className="relative flex-none w-[200px] md:w-[280px] cursor-pointer"
                  onHoverStart={() => setHoveredId(movie.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  animate={{
                    scale: hoveredId === movie.id ? 1.1 : 1,
                    zIndex: hoveredId === movie.id ? 10 : 0,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
                    <Image
                      src={
                        getImageUrl(movie.backdrop_path || movie.poster_path, "w500") ||
                        "/placeholder.svg?height=400&width=600"
                      }
                      alt={movie.title}
                      fill
                      className="object-cover transition-all duration-300"
                      priority={isHovering}
                    />
                    
                    <AnimatePresence>
                      {hoveredId === movie.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.2 }}
                          className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4 flex flex-col justify-between"
                        >
                          <div className="flex justify-end">
                            <span className="bg-steam-red/90 text-white text-sm px-2 py-1 rounded-md flex items-center gap-1">
                              <Star className="h-3 w-3 fill-current" />
                              {movie.vote_average.toFixed(1)}
                            </span>
                          </div>
                          
                          <div className="space-y-4">
                            <h3 className="text-lg font-bold line-clamp-1">{movie.title}</h3>
                            
                            <div className="flex items-center gap-2">
                              <Link href={`/movie/${movie.id}`}>
                                <Button
                                  size="sm"
                                  className="bg-white text-black hover:bg-white/90 gap-1"
                                >
                                  <Play className="h-4 w-4 fill-black" />
                                  Play
                                </Button>
                              </Link>
                              <HeartButton movie={movie} variant="icon" />
                              <Button
                                size="icon"
                                variant="outline"
                                className="bg-black/60 border-white/40 hover:bg-black/80"
                              >
                                <Info className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="text-sm space-y-1">
                              <p className="line-clamp-2 text-gray-200">{movie.overview}</p>
                              <p className="text-gray-400">
                                {new Date(movie.release_date).getFullYear()} • 
                                {movie.adult ? " 18+" : " PG-13"}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-0 bottom-0 z-40 m-auto h-12 w-12 translate-x-[50%] bg-black/50 border-gray-600 text-white hover:bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
          onClick={() => handleClick("right")}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}

