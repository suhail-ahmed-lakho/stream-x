"use client"

import Image from "next/image"
import { HeartButton } from "@/components/heart-button"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MovieResult } from "@/lib/tmdb"

interface MovieCardProps {
  movie: MovieResult
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="group relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-900/50">
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-2 right-2">
          <HeartButton movie={movie} variant="icon" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
          <Button 
            className="w-full bg-steam-red hover:bg-steam-red/90"
            onClick={() => window.location.href = `/movie/${movie.id}`}
          >
            <Play className="h-4 w-4 mr-2" />
            Play
          </Button>
        </div>
      </div>
    </div>
  )
} 