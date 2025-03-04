"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Check, CreditCard, ArrowRight, Crown, Tv, Smartphone, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth"

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "7.99",
    quality: "Good",
    resolution: "720p",
    icon: Tv,
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
    features: [
      "Watch on your laptop and TV",
      "Movies and TV shows",
      "Cancel anytime",
      "First month free"
    ]
  },
  {
    id: "standard",
    name: "Standard",
    price: "12.99",
    quality: "Better",
    resolution: "1080p",
    icon: Smartphone,
    color: "bg-gradient-to-br from-purple-500 to-purple-600",
    features: [
      "Watch on your laptop and TV",
      "Movies and TV shows",
      "Download titles to watch offline",
      "Cancel anytime",
      "First month free"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    price: "18.99",
    quality: "Best",
    resolution: "4K+HDR",
    icon: Crown,
    color: "bg-gradient-to-br from-steam-red to-red-600",
    features: [
      "Watch on your laptop and TV",
      "Movies and TV shows in Ultra HD",
      "Download titles to watch offline",
      "Watch on 4 screens at once",
      "Cancel anytime",
      "First month free"
    ]
  }
]

export default function SubscriptionPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState(plans[1].id)
  const [step, setStep] = useState<"plan" | "payment" | "waiting">("plan")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: ""
  })

  const handleContinue = () => {
    if (!user) {
      // Redirect to register with return URL
      router.push(`/register?redirect=/subscription?plan=${selectedPlan}`)
      return
    }
    setStep("payment")
  }

  const handlePayment = async (paymentDetails: any) => {
    try {
      // Call your API to process payment and create subscription request
      const response = await fetch("/api/subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId: selectedPlan,
          userId: user?.id,
          paymentDetails,
        }),
      })

      if (!response.ok) throw new Error("Payment failed")

      setStep("waiting")
      toast.success("Payment processed successfully!")
    } catch (error) {
      toast.error("Payment failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="container mx-auto px-4 pt-20 pb-12">
        <div className="max-w-4xl mx-auto">
          {step === "plan" ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
                <p className="text-gray-400">
                  Flexible plans for every viewer. Cancel anytime.
                </p>
              </div>

              <RadioGroup
                value={selectedPlan}
                onValueChange={setSelectedPlan}
                className="grid md:grid-cols-3 gap-6 mb-8"
              >
                {plans.map((plan) => {
                  const Icon = plan.icon
                  return (
                    <motion.div
                      key={plan.id}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="relative"
                    >
                      <RadioGroupItem
                        value={plan.id}
                        id={plan.id}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={plan.id}
                        className="block p-6 bg-gray-900/50 rounded-lg border-2 border-gray-800 cursor-pointer transition-all hover:bg-gray-900/70 peer-checked:border-steam-red"
                      >
                        <div className={`${plan.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                        <div className="text-3xl font-bold mb-4">
                          ${plan.price}
                          <span className="text-sm font-normal text-gray-400">/month</span>
                        </div>
                        <div className="space-y-2 mb-4 text-gray-400">
                          <p className="text-sm">Video quality: {plan.quality}</p>
                          <p className="text-sm">Resolution: {plan.resolution}</p>
                        </div>
                        <ul className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-2 text-sm"
                            >
                              <Check className="h-4 w-4 text-steam-red flex-shrink-0 mt-0.5" />
                              <span className="text-gray-300">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </Label>
                      {selectedPlan === plan.id && (
                        <motion.div
                          layoutId="selectedPlan"
                          className="absolute -inset-px border-2 border-steam-red rounded-lg"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  )
                })}
              </RadioGroup>

              <Button
                className="w-full bg-steam-red hover:bg-steam-red/90"
                onClick={handleContinue}
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </motion.div>
          ) : step === "payment" ? (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
              <PaymentForm onSubmit={handlePayment} planDetails={plans.find(p => p.id === selectedPlan)} />
            </div>
          ) : (
            <div className="text-center space-y-4 animate-fade-in">
              <div className="w-20 h-20 mx-auto bg-steam-red/20 rounded-full flex items-center justify-center">
                <Clock className="h-10 w-10 text-steam-red animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold">Subscription Pending Approval</h2>
              <p className="text-gray-400 max-w-md mx-auto">
                Your subscription request has been received and is pending approval from our admin team.
                We'll notify you once it's approved.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => router.push("/")}
              >
                Return to Home
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

