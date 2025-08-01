"use client"

import { useState } from "react"
import { Calendar, MapPin, Sparkles, ArrowRight, Zap, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface HeroSectionProps {
  onTripPlanned: (data: any) => void
}

export function HeroSection({ onTripPlanned }: HeroSectionProps) {
  const [destination, setDestination] = useState("")
  const [dates, setDates] = useState("")
  const [isPlanning, setIsPlanning] = useState(false)

  const handlePlanTrip = async () => {
    if (!destination || !dates) return

    setIsPlanning(true)

    // Simulate AI planning process
    setTimeout(() => {
      const mockTripData = {
        destination,
        dates,
        itinerary: [
          {
            day: 1,
            date: "2024-03-15",
            activities: [
              {
                time: "09:00",
                type: "hotel",
                title: "Check-in at Grand Plaza Hotel",
                location: "Downtown",
                rating: 4.8,
              },
              {
                time: "11:00",
                type: "food",
                title: "Local Breakfast at Café Luna",
                location: "Historic District",
                rating: 4.6,
              },
              { time: "14:00", type: "activity", title: "City Walking Tour", location: "Old Town", rating: 4.9 },
              { time: "19:00", type: "food", title: "Dinner at Rooftop Bistro", location: "City Center", rating: 4.7 },
            ],
          },
        ],
        budget: { total: 1200, spent: 0, remaining: 1200 },
      }

      onTripPlanned(mockTripData)
      setIsPlanning(false)
    }, 3000)
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Title */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Your AI Travel
            <br />
            <span className="relative">
              Companion
              <Sparkles className="absolute -top-2 -right-8 w-8 h-8 text-yellow-400 animate-spin" />
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Just tell me where and when. I'll craft the perfect personalized journey using your preferences, budget, and
            real-time insights.
          </p>
        </div>

        {/* Planning Interface */}
        <Card className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 mb-12 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Destination Input */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
              <Input
                placeholder="Where do you want to go?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="pl-12 h-14 bg-white/5 border-white/20 text-white placeholder:text-gray-400 text-lg focus:border-purple-400 focus:ring-purple-400"
              />
            </div>

            {/* Date Input */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
              <Input
                type="date"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                className="pl-12 h-14 bg-white/5 border-white/20 text-white text-lg focus:border-cyan-400 focus:ring-cyan-400"
              />
            </div>
          </div>

          {/* Plan Trip Button */}
          <Button
            onClick={handlePlanTrip}
            disabled={!destination || !dates || isPlanning}
            className="w-full md:w-auto px-12 py-4 text-lg font-semibold bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            {isPlanning ? (
              <>
                <Zap className="w-5 h-5 mr-2 animate-spin" />
                AI is Planning Your Trip...
              </>
            ) : (
              <>
                Plan My Perfect Trip
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </Card>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 group">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">AI-Powered</h3>
            <p className="text-gray-400">Smart recommendations based on your preferences and real-time data</p>
          </Card>

          <Card className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 group">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Optimized Routes</h3>
            <p className="text-gray-400">Intelligent routing that saves time and maximizes experiences</p>
          </Card>

          <Card className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 group">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Real-time Updates</h3>
            <p className="text-gray-400">Live adjustments for weather, events, and local conditions</p>
          </Card>
        </div>

        {/* Trending Destinations Quick Preview */}
        <Card className="backdrop-blur-xl bg-white/10 border border-white/20 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
              Trending Now
            </h3>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 animate-pulse">Live</Badge>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div>
                <div className="text-white font-medium">Santorini, Greece</div>
                <div className="text-sm text-green-400">+45% searches</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div>
                <div className="text-white font-medium">Iceland</div>
                <div className="text-sm text-blue-400">+52% interest</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <div>
                <div className="text-white font-medium">Kyoto, Japan</div>
                <div className="text-sm text-purple-400">+38% viral content</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
