import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { planId, userId, paymentDetails } = body

    // Create subscription request in database
    const subscription = await db.subscription.create({
      data: {
        planId,
        userId,
        status: "PENDING",
        paymentDetails: JSON.stringify(paymentDetails),
      },
    })

    return NextResponse.json({ success: true, subscription })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 }
    )
  }
} 