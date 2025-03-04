"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Bell, Volume2, Globe, Monitor, Save } from "lucide-react"
import { toast } from "sonner"

interface Settings {
  notifications: boolean
  autoplay: boolean
  language: string
  quality: string
  volume: number
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    notifications: true,
    autoplay: true,
    language: "en",
    quality: "auto",
    volume: 100,
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const storedSettings = localStorage.getItem("userSettings")
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings))
    }
  }, [])

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      localStorage.setItem("userSettings", JSON.stringify(settings))
      toast.success("Settings saved successfully")
    } catch (error) {
      toast.error("Failed to save settings")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="container mx-auto px-4 pt-20 pb-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>

          <div className="space-y-6">
            {/* Playback Settings */}
            <div className="bg-gray-900/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Playback Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Autoplay next episode</Label>
                    <p className="text-sm text-gray-400">
                      Automatically play the next episode
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoplay}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, autoplay: checked }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Streaming Quality</Label>
                  <Select
                    value={settings.quality}
                    onValueChange={(value) => 
                      setSettings(prev => ({ ...prev, quality: value }))
                    }
                  >
                    <SelectTrigger className="bg-gray-800/50">
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="low">Low (480p)</SelectItem>
                      <SelectItem value="medium">Medium (720p)</SelectItem>
                      <SelectItem value="high">High (1080p)</SelectItem>
                      <SelectItem value="ultra">Ultra HD (4K)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-gray-900/50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Bell className="h-5 w-5 text-steam-red" />
                <h2 className="text-xl font-semibold">Notifications</h2>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-400">
                    Receive updates about new releases and recommendations
                  </p>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, notifications: checked }))
                  }
                />
              </div>
            </div>

            {/* Language */}
            <div className="bg-gray-900/50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Globe className="h-5 w-5 text-steam-red" />
                <h2 className="text-xl font-semibold">Language</h2>
              </div>
              
              <div className="space-y-2">
                <Label>Display Language</Label>
                <Select
                  value={settings.language}
                  onValueChange={(value) => 
                    setSettings(prev => ({ ...prev, language: value }))
                  }
                >
                  <SelectTrigger className="bg-gray-800/50">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="it">Italian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={handleSave}
              className="w-full bg-steam-red hover:bg-steam-red/90"
              disabled={isLoading}
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 