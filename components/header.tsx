"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Search, Bell, Menu, X, Film, Home, TrendingUp, User, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Check authentication and subscription status
    const token = localStorage.getItem("token")
    const subscriptionStatus = localStorage.getItem("subscriptionStatus")
    setIsLoggedIn(!!token)
    setIsSubscribed(subscriptionStatus === "active")
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/movies", label: "Movies", icon: Film },
    { href: "/trending", label: "Trending", icon: TrendingUp },
    { href: "/search", label: "Search", icon: Search },
  ]

  const handleAuthClick = () => {
    if (!isLoggedIn) {
      router.push("/auth/signup")
    } else {
      router.push("/profile")
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Play className="h-8 w-8 text-steam-red fill-steam-red" />
            <span className="text-2xl font-bold tracking-tight">
              Stream<span className="text-steam-red">X</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 transition-colors hover:text-steam-red ${
                    isActive ? "text-steam-red" : "text-gray-300"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                {!isSubscribed && (
                  <Button 
                    variant="default" 
                    className="bg-steam-red hover:bg-steam-red/90"
                    onClick={() => router.push("/subscription")}
                  >
                    Upgrade
                  </Button>
                )}
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  onClick={() => router.push("/profile")}
                >
                  <User className="h-5 w-5" />
                  Profile
                </Button>
              </div>
            ) : (
              <Button 
                className="bg-steam-red hover:bg-steam-red/90"
                onClick={handleAuthClick}
              >
                Get Started
              </Button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="md:hidden py-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 transition-colors hover:text-steam-red ${
                      isActive ? "text-steam-red" : "text-gray-300"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

