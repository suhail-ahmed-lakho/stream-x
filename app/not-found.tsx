"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  const handleGoBack = () => {
    window.history.back()
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        <div className="animate-fade-in">
          <h1 className="text-9xl font-bold text-steam-red">404</h1>
          <div className="mt-4 space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold">Page Not Found</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              Oops! The page you're looking for seems to have vanished into the digital abyss.
              Let's get you back to watching amazing content.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button 
              size="lg"
              className="bg-steam-red hover:bg-steam-red/90 gap-2"
            >
              <Home className="h-5 w-5" />
              Back to Home
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="border-gray-700 hover:bg-gray-800 gap-2"
            onClick={handleGoBack}
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </Button>
        </div>

        <div className="text-sm text-gray-500">
          Error Code: 404 | Page Not Found
        </div>
      </div>
    </div>
  )
} 