"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Play } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate auth - Replace with your actual auth logic
      await new Promise(resolve => setTimeout(resolve, 1000))
      localStorage.setItem("token", "dummy-token")
      localStorage.setItem("username", email.split("@")[0])
      router.push("/browse")
    } catch (err) {
      setError("Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative bg-black">
      {/* Background Image */}
      <Image
        src="/auth-background.jpg" // Add your background image
        alt="Background"
        fill
        className="object-cover opacity-40"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />

      {/* Header */}
      <header className="relative z-10 p-4 md:p-6">
        <Link href="/" className="flex items-center gap-2">
          <Play className="h-8 w-8 text-steam-red fill-steam-red" />
          <span className="text-2xl font-bold tracking-tight">
            Stream<span className="text-steam-red">X</span>
          </span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center p-4 min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md p-8 md:p-10 rounded-lg bg-black/80 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Sign In</h1>
              <p className="text-gray-400">Welcome back to StreamX</p>
            </div>

            {error && (
              <div className="p-4 text-sm bg-red-500/10 border border-red-500 rounded-lg text-red-500">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 bg-gray-900/50 border-gray-700 focus:border-steam-red"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/auth/forgot-password" className="text-sm text-steam-red hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 bg-gray-900/50 border-gray-700 focus:border-steam-red"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal text-gray-400">
                  Remember me
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-lg bg-steam-red hover:bg-steam-red/90"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-800"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black text-gray-400">New to StreamX?</span>
                </div>
              </div>

              <div className="text-center">
                <Link 
                  href="/auth/signup" 
                  className="text-white hover:text-steam-red transition-colors"
                >
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

