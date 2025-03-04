"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  CreditCard, ArrowLeft, Lock, Check 
} from "lucide-react"
import { PaypalIcon, ApplePayIcon, GooglePayIcon } from "@/components/icons"
import { toast } from "sonner"

const PAYMENT_METHODS = [
  {
    id: "card",
    name: "Credit / Debit Card",
    icon: CreditCard,
    fields: ["cardNumber", "expiry", "cvc", "name"]
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: PaypalIcon,
    fields: ["email"]
  },
  {
    id: "apple-pay",
    name: "Apple Pay",
    icon: ApplePayIcon,
    fields: []
  },
  {
    id: "google-pay",
    name: "Google Pay",
    icon: GooglePayIcon,
    fields: []
  }
]

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const planId = searchParams.get("plan")
  const [selectedMethod, setSelectedMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: "",
    email: ""
  })

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      localStorage.setItem("subscriptionStatus", "active")
      localStorage.setItem("paymentMethod", selectedMethod)
      
      toast.success("Payment successful! Subscription activated.")
      router.push("/browse")
    } catch (error) {
      toast.error("Payment failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="container mx-auto px-4 pt-20 pb-12">
        <div className="max-w-md mx-auto">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Plans
          </Button>

          <div className="bg-gray-900/50 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
            
            <RadioGroup
              value={selectedMethod}
              onValueChange={setSelectedMethod}
              className="space-y-4"
            >
              {PAYMENT_METHODS.map((method) => {
                const Icon = method.icon
                return (
                  <div key={method.id} className="relative">
                    <RadioGroupItem
                      value={method.id}
                      id={method.id}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={method.id}
                      className="flex items-center gap-4 p-4 rounded-lg border-2 border-gray-800 cursor-pointer transition-all peer-checked:border-steam-red"
                    >
                      <Icon className="h-6 w-6" />
                      <span className="font-medium">{method.name}</span>
                      {selectedMethod === method.id && (
                        <Check className="h-4 w-4 text-steam-red ml-auto" />
                      )}
                    </Label>
                  </div>
                )
              })}
            </RadioGroup>
          </div>

          <form onSubmit={handlePayment} className="space-y-6">
            {selectedMethod === "card" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input
                    id="cardName"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="bg-gray-800/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, cardNumber: e.target.value }))}
                    required
                    maxLength={19}
                    className="bg-gray-800/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={(e) => setFormData(prev => ({ ...prev, expiry: e.target.value }))}
                      required
                      maxLength={5}
                      className="bg-gray-800/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      value={formData.cvc}
                      onChange={(e) => setFormData(prev => ({ ...prev, cvc: e.target.value }))}
                      required
                      maxLength={3}
                      className="bg-gray-800/50"
                    />
                  </div>
                </div>
              </>
            )}

            {selectedMethod === "paypal" && (
              <div className="space-y-2">
                <Label htmlFor="email">PayPal Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="bg-gray-800/50"
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-steam-red hover:bg-steam-red/90"
              disabled={isProcessing}
            >
              <Lock className="h-4 w-4 mr-2" />
              {isProcessing ? "Processing..." : "Complete Payment"}
            </Button>
          </form>

          <p className="text-sm text-gray-400 text-center mt-6">
            Your payment information is secure and encrypted
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
} 