"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Bell, Menu, X } from "lucide-react"
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
  const [isScrolled, setIsScrolled] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled ? "bg-black/90 backdrop-blur-sm" : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-steam-red">
                STEAM<span className="text-white">X</span>
              </span>
            </Link>

            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-sm font-medium text-white hover:text-steam-red transition-colors">
                Home
              </Link>
              <Link href="/movies" className="text-sm font-medium text-white hover:text-steam-red transition-colors">
                Movies
              </Link>
              <Link href="/tv-shows" className="text-sm font-medium text-white hover:text-steam-red transition-colors">
                TV Shows
              </Link>
              <Link href="/my-list" className="text-sm font-medium text-white hover:text-steam-red transition-colors">
                My List
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {showSearch ? (
              <div className="animate-fade-in relative">
                <form onSubmit={handleSearch}>
                  <Input
                    type="search"
                    placeholder="Titles, people, genres"
                    className="w-[200px] md:w-[300px] bg-black/60 border-gray-700 text-white focus:border-steam-red"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 text-white hover:bg-transparent"
                    onClick={() => setShowSearch(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-black/20"
                onClick={() => setShowSearch(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}

            <ThemeToggle />

            <Button variant="ghost" size="icon" className="text-white hover:bg-black/20">
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8 border border-steam-red">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">user@example.com</p>
                    <p className="text-xs leading-none text-muted-foreground">Premium Plan</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profile" className="w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/account" className="w-full">
                    Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/subscription" className="w-full">
                    Subscription
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/auth/login" className="w-full">
                    Log out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-black/20"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="md:hidden py-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-sm font-medium text-white hover:text-steam-red transition-colors">
                Home
              </Link>
              <Link href="/movies" className="text-sm font-medium text-white hover:text-steam-red transition-colors">
                Movies
              </Link>
              <Link href="/tv-shows" className="text-sm font-medium text-white hover:text-steam-red transition-colors">
                TV Shows
              </Link>
              <Link href="/my-list" className="text-sm font-medium text-white hover:text-steam-red transition-colors">
                My List
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

