"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export function WelcomeBanner() {
  const [username, setUsername] = useState<string>("")
  const [timeOfDay, setTimeOfDay] = useState<string>("")

  useEffect(() => {
    // Get username from localStorage
    const storedUsername = localStorage.getItem("username")
    setUsername(storedUsername || "")

    // Set time of day greeting
    const hour = new Date().getHours()
    if (hour < 12) setTimeOfDay("morning")
    else if (hour < 18) setTimeOfDay("afternoon")
    else setTimeOfDay("evening")
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-steam-red/80 to-purple-600/80 p-8 md:p-12"
    >
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-yellow-300" />
          <span className="text-sm font-medium text-white/90">
            {username ? "Personal Recommendations" : "Featured Content"}
          </span>
        </div>
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
          Good {timeOfDay}{username ? `, ${username}` : ""}!
        </h1>
        <p className="text-white/90 max-w-2xl">
          {username
            ? "We've curated some amazing content just for you. Explore your personalized recommendations below."
            : "Discover the best movies and shows. Sign up to get personalized recommendations."}
        </p>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-steam-red/30 blur-3xl" />
    </motion.div>
  )
} 