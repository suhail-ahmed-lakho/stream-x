"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Settings, LogOut, Heart, Clock, 
  Film, Shield, CreditCard, Edit 
} from "lucide-react"

const AVATAR_OPTIONS = [
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
  "/avatars/avatar4.png",
  "/avatars/avatar5.png",
]

export default function ProfilePage() {
  const [username, setUsername] = useState<string>("")
  const [selectedAvatar, setSelectedAvatar] = useState<string>("")
  const [isEditingAvatar, setIsEditingAvatar] = useState(false)
  const [subscriptionTier, setSubscriptionTier] = useState<string>("")

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "User"
    const storedAvatar = localStorage.getItem("userAvatar") || AVATAR_OPTIONS[0]
    const storedTier = localStorage.getItem("subscriptionTier") || "Basic"
    setUsername(storedUsername)
    setSelectedAvatar(storedAvatar)
    setSubscriptionTier(storedTier)
  }, [])

  const handleAvatarChange = (avatar: string) => {
    setSelectedAvatar(avatar)
    localStorage.setItem("userAvatar", avatar)
    setIsEditingAvatar(false)
  }

  const menuItems = [
    { 
      icon: Heart, 
      label: "My List", 
      href: "/watchlist",
      count: localStorage.getItem("watchlist") ? 
        JSON.parse(localStorage.getItem("watchlist") || "[]").length : 0
    },
    { 
      icon: Clock, 
      label: "Continue Watching", 
      href: "/continue-watching",
      count: localStorage.getItem("continueWatching") ? 
        JSON.parse(localStorage.getItem("continueWatching") || "[]").length : 0
    },
    { 
      icon: Film, 
      label: "Recently Watched", 
      href: "/my-movies",
      count: localStorage.getItem("recentlyWatched") ? 
        JSON.parse(localStorage.getItem("recentlyWatched") || "[]").length : 0
    },
    { icon: Shield, label: "Privacy", href: "/privacy" },
    { icon: Settings, label: "Settings", href: "/settings" },
    { 
      icon: CreditCard, 
      label: "Subscription", 
      href: "/subscription",
      badge: subscriptionTier
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="container mx-auto px-4 pt-20 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg p-8 mb-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-2 border-steam-red cursor-pointer"
                       onClick={() => setIsEditingAvatar(true)}>
                  <AvatarImage src={selectedAvatar} />
                  <AvatarFallback>
                    {username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute -bottom-2 -right-2 rounded-full bg-steam-red hover:bg-steam-red/90"
                  onClick={() => setIsEditingAvatar(true)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{username}</h1>
                <p className="text-gray-400">
                  {subscriptionTier} Plan
                </p>
              </div>
              <Button 
                variant="outline" 
                className="ml-auto"
                onClick={() => {
                  localStorage.clear()
                  window.location.href = "/auth/login"
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Avatar Selection Modal */}
          {isEditingAvatar && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
              <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Choose Avatar</h2>
                <div className="grid grid-cols-5 gap-4 mb-6">
                  {AVATAR_OPTIONS.map((avatar) => (
                    <Avatar
                      key={avatar}
                      className={`cursor-pointer transition-transform hover:scale-110 ${
                        selectedAvatar === avatar ? "ring-2 ring-steam-red" : ""
                      }`}
                      onClick={() => handleAvatarChange(avatar)}
                    >
                      <AvatarImage src={avatar} />
                    </Avatar>
                  ))}
                </div>
                <Button 
                  className="w-full"
                  onClick={() => setIsEditingAvatar(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.label}
                  variant="outline"
                  className="h-auto p-6 flex items-center gap-4 bg-gray-900/30 border-gray-800 hover:border-steam-red"
                  onClick={() => window.location.href = item.href}
                >
                  <div className="h-12 w-12 rounded-full bg-gray-800 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-steam-red" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-semibold">{item.label}</h3>
                    <p className="text-sm text-gray-400">
                      {item.count !== undefined && `${item.count} items`}
                      {item.badge && item.badge}
                    </p>
                  </div>
                </Button>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 