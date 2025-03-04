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

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate registration - Replace with your actual logic
      await new Promise(resolve => setTimeout(resolve, 1000))
      localStorage.setItem("token", "dummy-token")
      localStorage.setItem("username", formData.name)
      router.push("/subscription")
    } catch (err) {
      setError("Failed to create account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
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
              <h1 className="text-3xl font-bold">Create Account</h1>
              <p className="text-gray-400">Join StreamX today</p>
            </div>

            {error && (
              <div className="p-4 text-sm bg-red-500/10 border border-red-500 rounded-lg text-red-500">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="h-12 bg-gray-900/50 border-gray-700 focus:border-steam-red"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                    className="h-12 bg-gray-900/50 border-gray-700 focus:border-steam-red"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    minLength={8}
                    className="h-12 bg-gray-900/50 border-gray-700 focus:border-steam-red"
                  />
                  <p className="text-xs text-gray-400">Must be at least 8 characters</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" required className="mt-1" />
                  <Label htmlFor="terms" className="text-sm font-normal text-gray-400">
                    I agree to the{" "}
                    <Link href="/terms" className="text-steam-red hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-steam-red hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg bg-steam-red hover:bg-steam-red/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </div>
            </form>

            <div className="text-center text-gray-400">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-white hover:text-steam-red transition-colors">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

