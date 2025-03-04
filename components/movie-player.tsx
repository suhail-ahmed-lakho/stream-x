"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { fetchMovieVideos } from "@/lib/tmdb"

export function MoviePlayer() {
  const params = useParams()
  const [videoKey, setVideoKey] = useState("")

  useEffect(() => {
    const getMovieVideo = async () => {
      try {
        const data = await fetchMovieVideos(parseInt(params.id as string, 10))
        const trailer = data.results.find((video: any) => 
          video.type === "Trailer" || video.type === "Teaser"
        )
        setVideoKey(trailer?.key || "")
      } catch (error) {
        console.error("Failed to fetch video:", error)
      }
    }

    getMovieVideo()
  }, [params.id])

  if (!videoKey) return <div>Loading...</div>

  return (
    <div className="aspect-video w-full">
      <iframe
        src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  )
} 