"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FeaturedContent() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const featuredContent = [
    {
      id: 1,
      title: "The Witcher",
      description:
        "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
      image: "/placeholder.svg?height=600&width=1200",
      category: "Fantasy",
    },
    {
      id: 2,
      title: "Stranger Things",
      description:
        "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
      image: "/placeholder.svg?height=600&width=1200",
      category: "Sci-Fi",
    },
    {
      id: 3,
      title: "Breaking Bad",
      description:
        "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
      image: "/placeholder.svg?height=600&width=1200",
      category: "Drama",
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredContent.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + featuredContent.length) % featuredContent.length)
  }

  return (
    <div className="relative py-8 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Featured Today</h2>

        <div className="relative">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {featuredContent.map((item) => (
              <div key={item.id} className="w-full flex-shrink-0 px-2">
                <div className="relative rounded-lg overflow-hidden group">
                  <div className="aspect-[21/9] relative">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  </div>

                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <span className="inline-block px-2 py-1 bg-steam-red text-white text-xs rounded mb-2">
                      {item.category}
                    </span>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-steam-red transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 line-clamp-2 mb-4">{item.description}</p>
                    <Button className="bg-white text-black hover:bg-white/90">Watch Now</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 border-gray-600 text-white hover:bg-black/70 rounded-full h-10 w-10 z-10"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 border-gray-600 text-white hover:bg-black/70 rounded-full h-10 w-10 z-10"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div className="flex justify-center mt-4 gap-2">
            {featuredContent.map((_, index) => (
              <button
                key={index}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex ? "w-6 bg-steam-red" : "w-2 bg-gray-600"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

