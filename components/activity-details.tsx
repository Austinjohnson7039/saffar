"use client"

import { useState } from "react"
import { ArrowLeft, Star, Clock, MapPin, Calendar, Camera, Heart, Share } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

interface ActivityDetailsProps {
  activity: any
  onBack: () => void
  onBooking: (booking: any) => void
}

export function ActivityDetails({ activity, onBack, onBooking }: ActivityDetailsProps) {
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedTickets, setSelectedTickets] = useState(1)

  const activityData = {
    id: 1,
    title: "Tokyo Skytree Observatory Experience",
    location: "Tokyo Skytree, Sumida City, Tokyo",
    rating: 4.8,
    reviews: 12847,
    price: 45,
    duration: "2-3 hours",
    category: "Observation Deck",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    description:
      "Experience breathtaking 360-degree views of Tokyo from the world's second-tallest structure. The Tokyo Skytree offers unparalleled panoramic views of the sprawling metropolis, Mount Fuji on clear days, and stunning sunset vistas.",
    highlights: [
      "360-degree panoramic views from 350m and 450m observation decks",
      "Interactive digital displays about Tokyo's landmarks",
      "Glass floor sections for thrilling downward views",
      "Souvenir shop with exclusive Skytree merchandise",
      "Café with spectacular views",
    ],
    included: [
      "Access to Tembo Deck (350m)",
      "Access to Tembo Galleria (450m)",
      "Digital guide in multiple languages",
      "Free WiFi throughout the tower",
    ],
    timeSlots: [
      { time: "09:00", available: true, price: 45 },
      { time: "11:00", available: true, price: 45 },
      { time: "13:00", available: false, price: 45 },
      { time: "15:00", available: true, price: 45 },
      { time: "17:00", available: true, price: 55 },
      { time: "19:00", available: true, price: 55 },
    ],
    reviews: [
      {
        name: "Sarah M.",
        rating: 5,
        date: "2024-01-15",
        comment:
          "Absolutely stunning views! The sunset from the observation deck was magical. Highly recommend booking the evening slot.",
      },
      {
        name: "David L.",
        rating: 4,
        date: "2024-01-10",
        comment:
          "Great experience overall. The glass floor was a bit scary but exciting. Can get crowded during peak hours.",
      },
      {
        name: "Yuki T.",
        rating: 5,
        date: "2024-01-08",
        comment:
          "Perfect weather allowed us to see Mount Fuji clearly. The interactive displays were very informative.",
      },
    ],
  }

  const handleBooking = () => {
    if (selectedTime) {
      const booking = {
        activity: activityData,
        time: selectedTime,
        tickets: selectedTickets,
        totalPrice: activityData.price * selectedTickets,
        date: "2024-03-15",
      }
      onBooking(booking)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-600"}`}
      />
    ))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Button variant="ghost" onClick={onBack} className="mb-6 text-white hover:bg-white/10">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Itinerary
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20 overflow-hidden">
              <div className="relative h-96">
                <img
                  src={activityData.images[0] || "/placeholder.svg"}
                  alt={activityData.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm">
                    <Share className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm">
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                    {activityData.category}
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Activity Info */}
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl text-white mb-2">{activityData.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-gray-400">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{activityData.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-sm">{activityData.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center mb-1">
                      {renderStars(activityData.rating)}
                      <span className="text-white ml-2 font-semibold">{activityData.rating}</span>
                    </div>
                    <div className="text-sm text-gray-400">({activityData.reviews.toLocaleString()} reviews)</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-3 bg-white/10">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="included">What's Included</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <p className="text-gray-300 leading-relaxed">{activityData.description}</p>
                    <div>
                      <h3 className="text-white font-semibold mb-3">Highlights</h3>
                      <ul className="space-y-2">
                        {activityData.highlights.map((highlight, index) => (
                          <li key={index} className="text-gray-300 flex items-start">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="included" className="space-y-4">
                    <h3 className="text-white font-semibold">What's Included</h3>
                    <ul className="space-y-2">
                      {activityData.included.map((item, index) => (
                        <li key={index} className="text-gray-300 flex items-start">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </TabsContent>

                  <TabsContent value="reviews" className="space-y-4">
                    {activityData.reviews.map((review, index) => (
                      <div key={index} className="p-4 rounded-lg bg-white/5">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-semibold">{review.name}</span>
                            <div className="flex items-center">{renderStars(review.rating)}</div>
                          </div>
                          <span className="text-sm text-gray-400">{review.date}</span>
                        </div>
                        <p className="text-gray-300">{review.comment}</p>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-6">
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20 sticky top-8">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  Book This Experience
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">${activityData.price}</div>
                    <div className="text-sm text-gray-400">per person</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Date Selection */}
                <div>
                  <label className="text-white font-medium mb-2 block">Select Date</label>
                  <div className="flex items-center p-3 rounded-lg bg-white/5 border border-white/20">
                    <Calendar className="w-5 h-5 text-purple-400 mr-2" />
                    <span className="text-white">March 15, 2024</span>
                  </div>
                </div>

                {/* Time Selection */}
                <div>
                  <label className="text-white font-medium mb-2 block">Select Time</label>
                  <div className="grid grid-cols-2 gap-2">
                    {activityData.timeSlots.map((slot) => (
                      <Button
                        key={slot.time}
                        variant={selectedTime === slot.time ? "default" : "outline"}
                        disabled={!slot.available}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`${
                          selectedTime === slot.time
                            ? "bg-purple-500 hover:bg-purple-600"
                            : "border-white/20 text-white hover:bg-white/10"
                        } ${!slot.available ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <div className="text-center">
                          <div>{slot.time}</div>
                          <div className="text-xs">${slot.price}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Ticket Quantity */}
                <div>
                  <label className="text-white font-medium mb-2 block">Number of Tickets</label>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedTickets(Math.max(1, selectedTickets - 1))}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      -
                    </Button>
                    <span className="text-white font-semibold w-8 text-center">{selectedTickets}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedTickets(selectedTickets + 1)}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      +
                    </Button>
                  </div>
                </div>

                <Separator className="bg-white/20" />

                {/* Total */}
                <div className="flex items-center justify-between text-lg">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-white font-bold">${activityData.price * selectedTickets}</span>
                </div>

                {/* Book Button */}
                <Button
                  onClick={handleBooking}
                  disabled={!selectedTime}
                  className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-semibold py-3"
                >
                  Book Now
                </Button>

                <div className="text-center">
                  <p className="text-xs text-gray-400">Free cancellation up to 24 hours before</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Duration</span>
                  <span className="text-white">{activityData.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Group Size</span>
                  <span className="text-white">Up to 20 people</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Languages</span>
                  <span className="text-white">EN, JP, CN</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Accessibility</span>
                  <span className="text-white">Wheelchair accessible</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
