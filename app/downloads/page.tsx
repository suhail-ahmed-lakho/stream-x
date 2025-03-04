"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trash2, Play, HardDrive } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import { MovieResult } from "@/lib/tmdb"

interface DownloadedMovie extends MovieResult {
  downloadedAt: string
  quality: string
  size: string
}

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState<DownloadedMovie[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("downloads")
    if (stored) {
      setDownloads(JSON.parse(stored))
    }
  }, [])

  const removeDownload = (movieId: number) => {
    const updated = downloads.filter(movie => movie.id !== movieId)
    setDownloads(updated)
    localStorage.setItem("downloads", JSON.stringify(updated))
    toast.success("Download removed")
  }

  const formatDownloadDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="container mx-auto px-4 pt-20 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold">Downloads</h1>
            <span className="text-gray-400">({downloads.length} items)</span>
          </div>

          {downloads.length > 0 ? (
            <div className="space-y-4">
              {downloads.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-gray-900/50 rounded-lg p-4"
                >
                  <div className="flex gap-4">
                    <div className="relative w-32 aspect-[2/3] flex-shrink-0">
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                            <span>{movie.quality}</span>
                            <span>{movie.size}</span>
                            <span>Downloaded {formatDownloadDate(movie.downloadedAt)}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeDownload(movie.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          className="bg-steam-red hover:bg-steam-red/90"
                          onClick={() => window.location.href = `/movie/${movie.id}/watch`}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Play
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <HardDrive className="h-12 w-12 mx-auto mb-4 text-gray-500" />
              <h2 className="text-xl font-semibold mb-2">No downloads yet</h2>
              <p className="text-gray-400 mb-6">
                Download movies to watch them offline
              </p>
              <Button
                onClick={() => window.location.href = "/movies"}
                className="bg-steam-red hover:bg-steam-red/90"
              >
                Browse Movies
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
} 