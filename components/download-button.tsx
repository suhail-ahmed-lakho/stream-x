"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Download, Check, X } from "lucide-react"
import { toast } from "sonner"
import { MovieResult } from "@/lib/tmdb"

interface DownloadButtonProps {
  movie: MovieResult
}

interface DownloadedMovie extends MovieResult {
  downloadedAt: string
  quality: string
  size: string
}

export function DownloadButton({ movie }: DownloadButtonProps) {
  const [downloading, setDownloading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isDownloaded, setIsDownloaded] = useState(() => {
    const downloads = JSON.parse(localStorage.getItem("downloads") || "[]")
    return downloads.some((m: DownloadedMovie) => m.id === movie.id)
  })

  const handleDownload = async () => {
    if (!isDownloaded) {
      setDownloading(true)
      
      // Simulate download progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 500))
        setProgress(i)
      }

      const downloadedMovie: DownloadedMovie = {
        ...movie,
        downloadedAt: new Date().toISOString(),
        quality: "1080p",
        size: "2.1 GB"
      }

      const downloads = JSON.parse(localStorage.getItem("downloads") || "[]")
      localStorage.setItem("downloads", JSON.stringify([...downloads, downloadedMovie]))
      
      setIsDownloaded(true)
      setDownloading(false)
      toast.success("Download completed")
    } else {
      // Remove from downloads
      const downloads = JSON.parse(localStorage.getItem("downloads") || "[]")
      localStorage.setItem(
        "downloads",
        JSON.stringify(downloads.filter((m: DownloadedMovie) => m.id !== movie.id))
      )
      setIsDownloaded(false)
      toast.success("Removed from downloads")
    }
  }

  if (downloading) {
    return (
      <div className="space-y-2">
        <Progress value={progress} className="w-full" />
        <p className="text-sm text-gray-400">Downloading... {progress}%</p>
      </div>
    )
  }

  return (
    <Button
      variant={isDownloaded ? "secondary" : "default"}
      className={isDownloaded ? "bg-gray-800" : "bg-steam-red hover:bg-steam-red/90"}
      onClick={handleDownload}
    >
      {isDownloaded ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          Downloaded
        </>
      ) : (
        <>
          <Download className="h-4 w-4 mr-2" />
          Download
        </>
      )}
    </Button>
  )
} 