import { db } from "@/lib/db"
import { cookies } from "next/headers"

export async function getCurrentUser() {
  try {
    const sessionToken = cookies().get("session")?.value

    if (!sessionToken) {
      return null
    }

    // Get user from database based on session token
    const user = await db.user.findFirst({
      where: {
        // You might want to add a sessions table and proper session handling
        // This is a simplified version
        id: sessionToken
      },
      select: {
        id: true,
        email: true,
        name: true,
        isAdmin: true
      }
    })

    return user
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
} 