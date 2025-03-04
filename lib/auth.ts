"use client"

import { createContext, useContext, useState, useEffect } from "react"
import React from "react"

interface User {
  id: string
  email: string
  name?: string
  isAdmin: boolean
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const defaultContext: AuthContextType = {
  user: null,
  isLoading: true,
  signIn: async () => {},
  signOut: async () => {}
}

const AuthContext = createContext<AuthContextType>(defaultContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const signIn = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      
      if (!res.ok) throw new Error("Invalid credentials")
      
      const data = await res.json()
      setUser(data.user)
    } catch (error) {
      throw error
    }
  }

  const signOut = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setUser(null)
    } catch (error) {
      console.error("Failed to sign out:", error)
    }
  }

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user)
      })
      .finally(() => setIsLoading(false))
  }, [])

  return React.createElement(AuthContext.Provider, 
    { value: { user, isLoading, signIn, signOut } },
    children
  )
}

export function useAuth() {
  return useContext(AuthContext)
} 