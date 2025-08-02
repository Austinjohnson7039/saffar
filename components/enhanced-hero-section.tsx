"use client"

import { useState, useEffect } from "react"
import { Calendar, MapPin, Sparkles, ArrowRight, Zap, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { awsAPI } from "@/lib/aws-config"

interface EnhancedHeroSectionProps {
  onTripPlanned: (data: any) => void
}

export function EnhancedHeroSection({ onTripPlanned }: EnhancedHeroSectionProps) {
  const [destination, setDestination] = useState("")
  const [checkInDate, setCheckInDate] = useState("")
  const [checkOutDate, setCheckOutDate] = useState("")
  const [guests, setGuests] = useState("2")
  const [isPlanning, setIsPlanning] = useState(false)
  const [userPreferences, setUserPreferences] = useState(null)

  useEffect(() => {
    // Load user preferences from AWS on component mount
    loadUserPreferences()
  }, [])

  const loadUserPreferences = async () => {
    try {
      const userId = localStorage.getItem("userId") || "demo-user"
      const preferences = await awsAPI.getUserPreferences(userId)
      setUserPreferences(preferences)
    } catch (error) {
      console.error("Failed to load preferences:", error)
      // Fallback to demo preferences
      setUserPreferences({
        cuisineTypes: ["Italian", "Japanese", "Mediterranean"],
        transportModes: ["Uber", "Public Transport", "Walking"],
        activityTypes: ["Museums", "Shopping", "Nature"],
        budgetRange: { min: 100, max: 500 },
        accommodationTypes: ["Hotel", "Boutique", "Luxury"],
      })
    }
  }

  const handlePlanTrip = async () => {
    if (!destination || !checkInDate || !checkOutDate) return

    setIsPlanning(true)

    try {
      // Call AWS Lambda for AI recommendations
      const recommendations = await awsAPI.getRecommendations(destination, userPreferences, {
        checkIn: checkInDate,
        checkOut: checkOutDate,
      })

      const tripData = {
        destination,
        checkInDate,
        checkOutDate,
        guests: Number.parseInt(guests),
        recommendations,
        userPreferences,
      }

      onTripPlanned(tripData)
    } catch (error) {
      console.error("Failed to get recommendations:", error)
      // Fallback to mock data
      const mockTripData = {
        destination,
        checkInDate,
        checkOutDate,
        guests: Number.parseInt(guests),
        itinerary: [
          {
            day: 1,
            date: checkInDate,
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
              {
                time: "14:00",
                type: "activity",
                title: "City Walking Tour",
                location: "Old Town",
                rating: 4.9,
              },
              {
                time: "19:00",
                type: "food",
                title: "Dinner at Rooftop Bistro",
                location: "City Center",
                rating: 4.7,
              },
            ],
          },
        ],
        budget: { total: 1200, spent: 0, remaining: 1200 },
        recommendations: {
          accommodations: [
            {
              id: 1,
              name: "Grand Plaza Hotel",
              type: "Luxury",
              price: 250,
              rating: 4.8,
              image: "/placeholder.svg?height=200&width=300&text=Grand+Plaza",
              amenities: ["Pool", "Spa", "Restaurant"],
            },
            {
              id: 2,
              name: "Boutique Central",
              type: "Boutique",
              price: 180,
              rating: 4.6,
              image: "/placeholder.svg?height=200&width=300&text=Boutique+Central",
              amenities: ["Rooftop Bar", "Gym", "WiFi"],
            },
            {
              id: 3,
              name: "City Comfort Inn",
              type: "Hotel",
              price: 120,
              rating: 4.4,
              image: "/placeholder.svg?height=200&width=300&text=City+Comfort",
              amenities: ["Breakfast", "Parking", "WiFi"],
            },
          ],
          cuisines: [
            {
              id: 1,
              type: "Italian",
              restaurants: [
                { name: "Pasta Paradise", dish: "Truffle Risotto", price: 28, rating: 4.7 },
                { name: "Roma Antica", dish: "Osso Buco", price: 32, rating: 4.8 },
                { name: "Bella Vista", dish: "Seafood Linguine", price: 26, rating: 4.6 },
              ],
            },
            {
              id: 2,
              type: "Japanese",
              restaurants: [
                { name: "Sakura Sushi", dish: "Omakase Set", price: 45, rating: 4.9 },
                { name: "Ramen House", dish: "Tonkotsu Ramen", price: 18, rating: 4.5 },
                { name: "Teppanyaki Grill", dish: "Wagyu Steak", price: 65, rating: 4.8 },
              ],
            },
          ],
          transport: [
            {
              id: 1,
              type: "Uber",
              options: [
                { name: "UberX", price: 15, time: "5 min", capacity: 4 },
                { name: "Uber Black", price: 25, time: "3 min", capacity: 4 },
                { name: "UberXL", price: 22, time: "7 min", capacity: 6 },
              ],
            },
            {
              id: 2,
              type: "Public Transport",
              options: [
                { name: "Metro Pass", price: 8, time: "15 min", capacity: "Unlimited" },
                { name: "Bus Day Pass", price: 5, time: "20 min", capacity: "Unlimited" },
              ],
            },
          ],
        },
        userPreferences,
      }
      onTripPlanned(mockTripData)
    } finally {
      setIsPlanning(false)
    }
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
            Personalized recommendations based on your preferences. AI-powered planning with AWS intelligence.
          </p>
        </div>

        {/* Enhanced Planning Interface */}
        <Card className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 mb-12 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Destination Input */}
            <div className="relative">
              <Label className="text-white mb-2 block">Where to?</Label>
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
              <Input
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="pl-12 h-14 bg-white/5 border-white/20 text-white placeholder:text-gray-400 text-lg focus:border-purple-400 focus:ring-purple-400"
              />
            </div>

            {/* Guests */}
            <div>
              <Label className="text-white mb-2 block">Guests</Label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger className="h-14 bg-white/5 border-white/20 text-white">
                  <Users className="w-5 h-5 mr-2 text-cyan-400" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Guest</SelectItem>
                  <SelectItem value="2">2 Guests</SelectItem>
                  <SelectItem value="3">3 Guests</SelectItem>
                  <SelectItem value="4">4 Guests</SelectItem>
                  <SelectItem value="5">5+ Guests</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Check-in Date */}
            <div className="relative">
              <Label className="text-white mb-2 block">Check-in Date</Label>
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
              <Input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="pl-12 h-14 bg-white/5 border-white/20 text-white text-lg focus:border-cyan-400 focus:ring-cyan-400"
              />
            </div>

            {/* Check-out Date */}
            <div className="relative">
              <Label className="text-white mb-2 block">Check-out Date</Label>
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
              <Input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="pl-12 h-14 bg-white/5 border-white/20 text-white text-lg focus:border-green-400 focus:ring-green-400"
              />
            </div>
          </div>

          {/* Plan Trip Button */}
          <Button
            onClick={handlePlanTrip}
            disabled={!destination || !checkInDate || !checkOutDate || isPlanning}
            className="w-full md:w-auto px-12 py-4 text-lg font-semibold bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            {isPlanning ? (
              <>
                <Zap className="w-5 h-5 mr-2 animate-spin" />
                AI is Planning Your Trip...
              </>
            ) : (
              <>
                Get Personalized Recommendations
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </Card>
      </div>
    </div>
  )
}
