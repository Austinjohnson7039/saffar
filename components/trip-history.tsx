"use client"

import { useState } from "react"
import { Calendar, MapPin, Star, DollarSign, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Trip {
  id: number
  destination: string
  dates: string
  status: "completed" | "upcoming" | "cancelled"
  totalCost: number
  rating?: number
  image: string
  highlights?: string[]
}

interface TripHistoryProps {
  trips?: Trip[]
  onTripSelect?: (trip: Trip) => void
}

const defaultTrips: Trip[] = [
  {
    id: 1,
    destination: "Goa, India",
    dates: "Dec 15-22, 2023",
    status: "completed",
    totalCost: 45000,
    rating: 5,
    image: "/placeholder.svg?height=200&width=300&text=Goa+Beach",
    highlights: ["Baga Beach", "Old Goa Churches", "Spice Plantations"],
  },
  {
    id: 2,
    destination: "Kerala Backwaters",
    dates: "Jan 10-17, 2024",
    status: "completed",
    totalCost: 38000,
    rating: 4,
    image: "/placeholder.svg?height=200&width=300&text=Kerala+Backwaters",
    highlights: ["Alleppey Houseboat", "Kumarakom Bird Sanctuary", "Spice Gardens"],
  },
  {
    id: 3,
    destination: "Rajasthan Heritage",
    dates: "Mar 5-15, 2024",
    status: "completed",
    totalCost: 62000,
    rating: 5,
    image: "/placeholder.svg?height=200&width=300&text=Rajasthan+Palace",
    highlights: ["Jaipur City Palace", "Udaipur Lake Palace", "Jodhpur Blue City"],
  },
  {
    id: 4,
    destination: "Himachal Pradesh",
    dates: "May 20-28, 2024",
    status: "upcoming",
    totalCost: 55000,
    image: "/placeholder.svg?height=200&width=300&text=Himachal+Mountains",
    highlights: ["Manali Adventure", "Shimla Hill Station", "Dharamshala Monasteries"],
  },
]

export function TripHistory({ trips = defaultTrips, onTripSelect }: TripHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch = trip.destination.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || trip.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "upcoming":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-600"}`} />
    ))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Trip History</h1>
            <p className="text-gray-400">Your travel memories and upcoming adventures</p>
          </div>
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">{trips.length} Total Trips</Badge>
        </div>

        {/* Search and Filter */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-white/5 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Trips</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Trip Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {trips.filter((t) => t.status === "completed").length}
              </div>
              <div className="text-sm text-gray-400">Completed</div>
            </CardContent>
          </Card>
          <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {trips.filter((t) => t.status === "upcoming").length}
              </div>
              <div className="text-sm text-gray-400">Upcoming</div>
            </CardContent>
          </Card>
          <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">
                ₹{trips.reduce((sum, trip) => sum + trip.totalCost, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Total Spent</div>
            </CardContent>
          </Card>
          <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {trips.filter((t) => t.rating).length > 0
                  ? (
                      trips.filter((t) => t.rating).reduce((sum, trip) => sum + (trip.rating || 0), 0) /
                      trips.filter((t) => t.rating).length
                    ).toFixed(1)
                  : "N/A"}
              </div>
              <div className="text-sm text-gray-400">Avg Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Trip Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => (
            <Card
              key={trip.id}
              className="backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group overflow-hidden"
              onClick={() => onTripSelect?.(trip)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={trip.image || "/placeholder.svg"}
                  alt={trip.destination}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge className={getStatusColor(trip.status)}>{trip.status}</Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {trip.destination}
                </h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">{trip.dates}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span className="text-sm">₹{trip.totalCost.toLocaleString()}</span>
                  </div>
                  {trip.highlights && (
                    <div className="flex items-center text-gray-400">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{trip.highlights[0]}</span>
                    </div>
                  )}
                  {trip.rating && (
                    <div className="flex items-center">
                      {renderStars(trip.rating)}
                      <span className="text-sm text-gray-400 ml-2">({trip.rating}/5)</span>
                    </div>
                  )}
                </div>
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  View Full Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTrips.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No trips found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
