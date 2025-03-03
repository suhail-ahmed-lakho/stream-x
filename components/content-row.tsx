"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Play, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { getImageUrl, type MovieResult } from "@/lib/tmdb"

interface ContentRowProps {
  title: string
  movies?: MovieResult[]
  isLoading?: boolean
}

export function ContentRow({ title, movies = [], isLoading = false }: ContentRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState(false)

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
      <h2 className="text-xl font-semibold transition duration-200 hover:text-steam-red pl-4">{title}</h2>

      <div className="group relative md:px-4">
        <Button
          variant="outline"
          size="icon"
          className={`absolute left-0 top-0 bottom-0 z-40 m-auto h-9 w-9 translate-x-[-50%] bg-black/50 border-gray-600 text-white hover:bg-black/70 rounded-full opacity-0 transition-opacity duration-200 ${
            isMoved ? "group-hover:opacity-100" : ""
          }`}
          onClick={() => handleClick("left")}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div
          ref={rowRef}
          className="flex items-center space-x-4 overflow-x-scroll scrollbar-hide md:p-2"
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
                  className="relative flex-none w-[200px] md:w-[240px] animate-pulse"
                >
                  <div className="aspect-video overflow-hidden rounded-md">
                    <Skeleton className="h-full w-full" />
                  </div>
                </div>
              ))
            : movies.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movie/${movie.id}`}
                  className="relative flex-none w-[200px] md:w-[240px] cursor-pointer"
                >
                  <div className="group/item relative aspect-video overflow-hidden rounded-md">
                    <Image
                      src={
                        getImageUrl(movie.backdrop_path || movie.poster_path, "w500") ||
                        "/placeholder.svg?height=400&width=600"
                      }
                      alt={movie.title}
                      fill
                      className="object-cover transition-all duration-300 group-hover/item:brightness-75 group-hover/item:scale-110"
                    />
                  
                    <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover/item:opacity-100 transition-all duration-300">
                      <p className="text-sm font-semibold line-clamp-1 mb-2">{movie.title}</p>
                      <div className="flex items-center gap-2 translate-y-4 group-hover/item:translate-y-0 transition-transform duration-300">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 rounded-full bg-white text-black hover:bg-white/90 p-0 hover:scale-110 transition"
                        >
                          <Play className="h-4 w-4 fill-black" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 rounded-full bg-black/60 border border-white/40 hover:bg-black/80 p-0 hover:scale-110 transition"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-0 bottom-0 z-40 m-auto h-9 w-9 translate-x-[50%] bg-black/50 border-gray-600 text-white hover:bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={() => handleClick("right")}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

