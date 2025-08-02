"use client"

import { useState } from "react"
import { Calendar, MapPin, Sparkles, ArrowRight, Users, IndianRupee, Brain, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PremiumHeroSectionProps {
  onTripPlanned: (data: any) => void
}

export function PremiumHeroSection({ onTripPlanned }: PremiumHeroSectionProps) {
  const [destination, setDestination] = useState("")
  const [checkInDate, setCheckInDate] = useState("")
  const [checkOutDate, setCheckOutDate] = useState("")
  const [guests, setGuests] = useState("2")
  const [isPlanning, setIsPlanning] = useState(false)
  const [aiInsights, setAiInsights] = useState<string[]>([])

  const handlePlanTrip = async () => {
    if (!destination || !checkInDate || !checkOutDate) return

    setIsPlanning(true)

    // Simulate intelligent AI analysis
    const insights = [
      "🧠 Analyzing 50,000+ traveler reviews for " + destination,
      "🌤️ Checking real-time weather patterns and seasonal trends",
      "🚗 Optimizing routes based on traffic and local events",
      "✨ Matching your preferences with 10,000+ local experiences",
      "💰 Calculating best value accommodations and dining",
      "🎯 Finalizing your intelligent itinerary...",
    ]

    let currentInsight = 0
    const insightInterval = setInterval(() => {
      if (currentInsight < insights.length) {
        setAiInsights((prev) => [...prev, insights[currentInsight]])
        currentInsight++
      } else {
        clearInterval(insightInterval)
      }
    }, 500)

    setTimeout(() => {
      const mockTripData = {
        destination,
        checkInDate,
        checkOutDate,
        guests: Number.parseInt(guests),
        aiScore: 94,
        intelligentFeatures: {
          weatherOptimized: true,
          trafficAware: true,
          budgetOptimized: true,
          localInsights: true,
          realTimeUpdates: true,
        },
        itinerary: [
          {
            day: 1,
            date: checkInDate,
            aiRecommendationScore: 96,
            activities: [
              {
                time: "09:00",
                type: "hotel",
                title: "Check-in at The Oberoi",
                location: "Downtown",
                rating: 4.8,
                cost: 15000,
                aiReason: "Selected based on your luxury preference and proximity to 80% of planned activities",
                intelligentFeatures: ["Price drop alert", "Weather-proof location", "High satisfaction rate"],
              },
              {
                time: "11:00",
                type: "food",
                title: "Breakfast at Café Mocha",
                location: "Historic District",
                rating: 4.6,
                cost: 800,
                aiReason: "Trending 40% this week, matches your coffee preference from past trips",
                intelligentFeatures: ["Local favorite", "Instagram-worthy", "Quick service"],
              },
              {
                time: "14:00",
                type: "activity",
                title: "AI-Curated Heritage Walking Tour",
                location: "Old City",
                rating: 4.9,
                cost: 1200,
                aiReason: "Personalized route avoiding crowds, includes 3 hidden gems not in guidebooks",
                intelligentFeatures: ["Crowd-optimized timing", "Photo opportunities", "Local guide"],
              },
              {
                time: "19:00",
                type: "food",
                title: "Dinner at Skyline Restaurant",
                location: "City Center",
                rating: 4.7,
                cost: 2500,
                aiReason: "Perfect sunset timing, cuisine matches 95% of your taste profile",
                intelligentFeatures: ["Sunset views", "Dietary preferences", "Reservation confirmed"],
              },
            ],
          },
        ],
        budget: { total: 75000, spent: 0, remaining: 75000 },
        recommendations: {
          accommodations: [
            {
              id: 1,
              name: "The Oberoi",
              type: "Luxury",
              price: 15000,
              rating: 4.8,
              image: "/placeholder.svg?height=200&width=300&text=The+Oberoi",
              amenities: ["Pool", "Spa", "Restaurant"],
              aiScore: 96,
              intelligentFeatures: ["Dynamic pricing", "Weather-proof", "Concierge AI"],
            },
            {
              id: 2,
              name: "ITC Grand Central",
              type: "Premium",
              price: 12000,
              rating: 4.6,
              image: "/placeholder.svg?height=200&width=300&text=ITC+Grand",
              amenities: ["Rooftop Bar", "Gym", "WiFi"],
              aiScore: 89,
              intelligentFeatures: ["Smart room controls", "Local insights", "24/7 support"],
            },
            {
              id: 3,
              name: "Hotel Comfort Inn",
              type: "Business",
              price: 8000,
              rating: 4.4,
              image: "/placeholder.svg?height=200&width=300&text=Comfort+Inn",
              amenities: ["Breakfast", "Parking", "WiFi"],
              aiScore: 82,
              intelligentFeatures: ["Budget optimized", "Central location", "Quick check-in"],
            },
          ],
          cuisines: [
            {
              id: 1,
              type: "North Indian",
              aiPopularityScore: 94,
              restaurants: [
                {
                  name: "Bukhara",
                  dish: "Dal Bukhara",
                  price: 1800,
                  rating: 4.7,
                  aiReason: "Michelin recommended, matches your spice tolerance",
                },
                {
                  name: "Karim's",
                  dish: "Mutton Korma",
                  price: 1200,
                  rating: 4.8,
                  aiReason: "Historic recipe, 200+ years old, trending 60% this month",
                },
                {
                  name: "Paranthe Wali Gali",
                  dish: "Aloo Paratha",
                  price: 300,
                  rating: 4.6,
                  aiReason: "Authentic street food, safe for tourists, Instagram viral",
                },
              ],
            },
            {
              id: 2,
              type: "South Indian",
              aiPopularityScore: 87,
              restaurants: [
                {
                  name: "Saravana Bhavan",
                  dish: "Masala Dosa",
                  price: 250,
                  rating: 4.9,
                  aiReason: "Global chain, consistent quality, dietary preferences matched",
                },
                {
                  name: "Murugan Idli",
                  dish: "Idli Sambar",
                  price: 180,
                  rating: 4.5,
                  aiReason: "Local favorite, healthy option, quick service",
                },
                {
                  name: "Dakshin",
                  dish: "Hyderabadi Biryani",
                  price: 800,
                  rating: 4.8,
                  aiReason: "Award-winning chef, perfect portion size for your group",
                },
              ],
            },
          ],
          transport: [
            {
              id: 1,
              type: "Smart Cab",
              aiEfficiencyScore: 92,
              options: [
                {
                  name: "Ola Prime",
                  price: 300,
                  time: "5 min",
                  capacity: 4,
                  aiFeatures: ["Real-time tracking", "Driver rating 4.8+", "AC guaranteed"],
                },
                {
                  name: "Uber Black",
                  price: 500,
                  time: "3 min",
                  capacity: 4,
                  aiFeatures: ["Premium vehicles", "Professional drivers", "Complimentary water"],
                },
                {
                  name: "Ola Share",
                  price: 150,
                  time: "7 min",
                  capacity: 6,
                  aiFeatures: ["Eco-friendly", "Cost optimized", "Route optimized"],
                },
              ],
            },
            {
              id: 2,
              type: "Public Transport",
              aiEfficiencyScore: 78,
              options: [
                {
                  name: "Metro Day Pass",
                  price: 200,
                  time: "15 min",
                  capacity: "Unlimited",
                  aiFeatures: ["Crowd predictions", "Real-time delays", "Station navigation"],
                },
                {
                  name: "Bus Day Pass",
                  price: 100,
                  time: "20 min",
                  capacity: "Unlimited",
                  aiFeatures: ["Route optimization", "Live tracking", "Seat availability"],
                },
              ],
            },
          ],
        },
      }
      onTripPlanned(mockTripData)
      setIsPlanning(false)
      setAiInsights([])
    }, 4000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Title */}
        <div className="mb-12">
          <div className="inline-flex items-center justify-center p-2 mb-6">
            <Brain className="w-8 h-8 text-foreground float-animation mr-2" />
            <Sparkles className="w-8 h-8 text-foreground float-animation" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground leading-tight tracking-tight">
            No More Suffer
            <br />
            <span className="text-muted-foreground">with Safar</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            India's most intelligent travel companion. AI that thinks ahead, adapts in real-time, and ensures every
            journey is perfectly crafted for you.
          </p>
        </div>

        {/* Planning Interface */}
        <Card className="bg-card border border-border shadow-2xl">
          <CardContent className="p-8 md:p-12">
            {!isPlanning ? (
              <>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Destination Input */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      Destination
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        placeholder="Where would you like to explore?"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="pl-12 h-14 text-lg border-border bg-background"
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      Travelers
                    </Label>
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger className="h-14 border-border bg-background">
                        <div className="flex items-center">
                          <Users className="w-5 h-5 mr-3 text-muted-foreground" />
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Solo Traveler</SelectItem>
                        <SelectItem value="2">Couple</SelectItem>
                        <SelectItem value="3">Small Group (3)</SelectItem>
                        <SelectItem value="4">Family (4)</SelectItem>
                        <SelectItem value="5">Large Group (5+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-10">
                  {/* Check-in Date */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      Journey Starts
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="pl-12 h-14 text-lg border-border bg-background"
                      />
                    </div>
                  </div>

                  {/* Check-out Date */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      Journey Ends
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className="pl-12 h-14 text-lg border-border bg-background"
                      />
                    </div>
                  </div>
                </div>

                {/* Plan Trip Button */}
                <Button
                  onClick={handlePlanTrip}
                  disabled={!destination || !checkInDate || !checkOutDate}
                  className="w-full md:w-auto px-12 py-4 text-lg font-semibold bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 group min-w-[300px]"
                >
                  <Brain className="w-5 h-5 mr-3" />
                  Create My Intelligent Journey
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <Brain className="w-8 h-8 text-foreground animate-pulse" />
                  <h3 className="text-2xl font-bold">Safar AI is crafting your perfect journey...</h3>
                </div>

                <div className="space-y-3 max-w-2xl mx-auto">
                  {aiInsights.map((insight, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50 animate-in slide-in-from-left"
                    >
                      <Zap className="w-4 h-4 text-foreground flex-shrink-0" />
                      <span className="text-sm">{insight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Intelligent Features Preview */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-foreground text-background rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Intelligence</h3>
            <p className="text-muted-foreground">
              Advanced algorithms analyze millions of data points to craft your perfect journey
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-foreground text-background rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Adaptation</h3>
            <p className="text-muted-foreground">
              Dynamic itinerary updates based on weather, traffic, and live conditions
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-foreground text-background rounded-full flex items-center justify-center mx-auto mb-4">
              <IndianRupee className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Budget Optimization</h3>
            <p className="text-muted-foreground">
              Intelligent pricing analysis ensures maximum value for every rupee spent
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
