"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState("standard")

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "$8.99",
      period: "month",
      description: "Good video quality in SD (480p). Watch on any phone, tablet, computer or TV.",
      features: [
        "Unlimited movies and TV shows",
        "Watch on 1 device at a time",
        "SD quality (480p)",
        "Download on 1 device",
      ],
    },
    {
      id: "standard",
      name: "Standard",
      price: "$13.99",
      period: "month",
      description: "Great video quality in Full HD (1080p). Watch on any phone, tablet, computer or TV.",
      features: [
        "Unlimited movies and TV shows",
        "Ad-free viewing",
        "Watch on 2 devices at a time",
        "Full HD quality (1080p)",
        "Download on 2 devices",
      ],
      popular: true,
    },
    {
      id: "premium",
      name: "Premium",
      price: "$17.99",
      period: "month",
      description: "Our best video quality in Ultra HD (4K) and HDR. Watch on any phone, tablet, computer or TV.",
      features: [
        "Unlimited movies and TV shows",
        "Ad-free viewing",
        "Watch on 4 devices at a time",
        "Ultra HD (4K) and HDR",
        "Download on 6 devices",
        "Spatial Audio",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Enjoy unlimited access to our entire library of movies and TV shows. You can change or cancel your plan
              anytime.
            </p>
          </div>

          <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div key={plan.id} className="relative">
                <RadioGroupItem value={plan.id} id={plan.id} className="sr-only" />
                <Label
                  htmlFor={plan.id}
                  className={`flex flex-col h-full p-6 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedPlan === plan.id
                      ? "border-steam-red bg-steam-red/10"
                      : "border-gray-800 bg-gray-900/50 hover:border-gray-700"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-steam-red text-white text-xs font-bold py-1 px-3 rounded-full">
                      Most Popular
                    </span>
                  )}

                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <div className="mt-2">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-gray-400">/{plan.period}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mb-4 text-center">{plan.description}</p>

                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-steam-red shrink-0 mr-2" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full mt-auto ${
                      selectedPlan === plan.id ? "bg-steam-red hover:bg-steam-red/90" : "bg-gray-800 hover:bg-gray-700"
                    }`}
                  >
                    {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                  </Button>
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="mt-12 text-center">
            <Button size="lg" className="bg-steam-red hover:bg-steam-red/90 px-8">
              Continue with {plans.find((p) => p.id === selectedPlan)?.name}
            </Button>
            <p className="mt-4 text-sm text-gray-400">
              By continuing, you agree to our Terms of Use and acknowledge our Privacy Policy.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

