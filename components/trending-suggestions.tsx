"use client"

import { TrendingUp, Heart, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function TrendingSuggestions() {
  const trivandrumDestinations = [
    {
      name: "Kovalam Beach",
      trend: "+45%",
      reason: "Perfect lighthouse views and Ayurvedic spas",
      price: "₹8,500",
      image: "/placeholder.svg?height=150&width=200&text=Kovalam+Beach",
    },
    {
      name: "Padmanabhaswamy Temple",
      trend: "+38%",
      reason: "Ancient architecture and spiritual significance",
      price: "₹2,200",
      image: "/placeholder.svg?height=150&width=200&text=Padmanabhaswamy+Temple",
    },
    {
      name: "Varkala Cliffs",
      trend: "+52%",
      reason: "Dramatic clifftop views and pristine beaches",
      price: "₹6,800",
      image: "/placeholder.svg?height=150&width=200&text=Varkala+Cliffs",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-green-400" />
              Trending in Trivandrum
            </h1>
            <p className="text-gray-400">Popular destinations and experiences near you</p>
          </div>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 animate-pulse">Live Updates</Badge>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {trivandrumDestinations.map((destination, index) => (
            <Card
              key={index}
              className="backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/15 transition-all duration-300 group overflow-hidden"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 animate-pulse">
                    {destination.trend}
                  </Badge>
                </div>
                <div className="absolute top-4 left-4">
                  <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{destination.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{destination.reason}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-400">
                    <DollarSign className="w-4 h-4 mr-1" />
                    <span className="text-sm">From {destination.price}</span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
                  >
                    Plan Trip
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Local Trends */}
        <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              What's Popular in Kerala
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div>
                    <span className="text-white">Ayurvedic Treatments</span>
                    <p className="text-xs text-gray-400">Traditional wellness experiences</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">+67% bookings</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div>
                    <span className="text-white">Backwater Cruises</span>
                    <p className="text-xs text-gray-400">Peaceful houseboat journeys</p>
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-400">+43% interest</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div>
                    <span className="text-white">Spice Plantation Tours</span>
                    <p className="text-xs text-gray-400">Authentic Kerala flavors</p>
                  </div>
                  <Badge className="bg-orange-500/20 text-orange-400">+38% searches</Badge>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div>
                    <span className="text-white">Beach Resorts</span>
                    <p className="text-xs text-gray-400">Luxury coastal stays</p>
                  </div>
                  <Badge className="bg-purple-500/20 text-purple-400">+52% bookings</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div>
                    <span className="text-white">Cultural Festivals</span>
                    <p className="text-xs text-gray-400">Traditional celebrations</p>
                  </div>
                  <Badge className="bg-pink-500/20 text-pink-400">+29% participation</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div>
                    <span className="text-white">Wildlife Sanctuaries</span>
                    <p className="text-xs text-gray-400">Nature and wildlife tours</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">+41% visits</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
