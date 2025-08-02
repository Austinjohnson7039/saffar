"use client"

import { useState } from "react"
import { Star, Clock, Users, CreditCard, Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { awsAPI } from "@/lib/aws-config"

interface RecommendationSelectorProps {
  tripData: any
  onBookingReady: (selections: any) => void
}

export function RecommendationSelector({ tripData, onBookingReady }: RecommendationSelectorProps) {
  const [selectedAccommodation, setSelectedAccommodation] = useState(null)
  const [selectedCuisine, setSelectedCuisine] = useState(null)
  const [selectedDish, setSelectedDish] = useState(null)
  const [selectedTransport, setSelectedTransport] = useState(null)
  const [selectedTransportOption, setSelectedTransportOption] = useState(null)

  const isBookingReady = selectedAccommodation && selectedDish && selectedTransportOption

  const handleBookNow = async () => {
    if (!isBookingReady) return

    const selections = {
      accommodation: selectedAccommodation,
      cuisine: {
        type: selectedCuisine,
        dish: selectedDish,
      },
      transport: {
        type: selectedTransport,
        option: selectedTransportOption,
      },
      tripDetails: {
        destination: tripData.destination,
        checkInDate: tripData.checkInDate,
        checkOutDate: tripData.checkOutDate,
        guests: tripData.guests,
      },
      totalCost: calculateTotalCost(),
    }

    try {
      // Save selections to AWS before proceeding to payment
      const bookingId = `booking_${Date.now()}`
      await awsAPI.saveBooking({
        id: bookingId,
        userId: localStorage.getItem("userId") || "demo-user",
        destination: tripData.destination,
        checkInDate: tripData.checkInDate,
        checkOutDate: tripData.checkOutDate,
        selectedOptions: selections,
        totalCost: selections.totalCost,
        status: "pending",
      })

      onBookingReady({ ...selections, bookingId })
    } catch (error) {
      console.error("Failed to save booking:", error)
      // Proceed anyway for demo
      onBookingReady({ ...selections, bookingId: `demo_${Date.now()}` })
    }
  }

  const calculateTotalCost = () => {
    const nights = Math.ceil(
      (new Date(tripData.checkOutDate).getTime() - new Date(tripData.checkInDate).getTime()) / (1000 * 60 * 60 * 24),
    )
    const accommodationCost = selectedAccommodation ? selectedAccommodation.price * nights : 0
    const dishCost = selectedDish ? selectedDish.price * tripData.guests : 0
    const transportCost = selectedTransportOption ? selectedTransportOption.price * 2 : 0 // Round trip
    return accommodationCost + dishCost + transportCost
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
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Choose Your Perfect Trip</h1>
          <p className="text-gray-400">Personalized recommendations based on your preferences</p>
        </div>

        <Tabs defaultValue="accommodation" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-xl border border-white/20">
            <TabsTrigger value="accommodation" className="data-[state=active]:bg-purple-500/30">
              🏨 Stay ({selectedAccommodation ? "✓" : "1/3"})
            </TabsTrigger>
            <TabsTrigger value="cuisine" className="data-[state=active]:bg-purple-500/30">
              🍽️ Dine ({selectedDish ? "✓" : "2/3"})
            </TabsTrigger>
            <TabsTrigger value="transport" className="data-[state=active]:bg-purple-500/30">
              🚗 Travel ({selectedTransportOption ? "✓" : "3/3"})
            </TabsTrigger>
          </TabsList>

          {/* Accommodation Selection */}
          <TabsContent value="accommodation" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {tripData.recommendations.accommodations.map((hotel) => (
                <Card
                  key={hotel.id}
                  className={`backdrop-blur-xl border cursor-pointer transition-all duration-300 ${
                    selectedAccommodation?.id === hotel.id
                      ? "bg-purple-500/20 border-purple-400"
                      : "bg-white/10 border-white/20 hover:bg-white/15"
                  }`}
                  onClick={() => setSelectedAccommodation(hotel)}
                >
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={hotel.image || "/placeholder.svg"}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                    {selectedAccommodation?.id === hotel.id && (
                      <div className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-white">{hotel.name}</h3>
                      <Badge className="bg-blue-500/20 text-blue-400">{hotel.type}</Badge>
                    </div>
                    <div className="flex items-center mb-3">
                      {renderStars(hotel.rating)}
                      <span className="text-white ml-2">{hotel.rating}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {hotel.amenities.map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-2xl font-bold text-white">${hotel.price}/night</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Cuisine Selection */}
          <TabsContent value="cuisine" className="space-y-6">
            <div className="space-y-8">
              {tripData.recommendations.cuisines.map((cuisine) => (
                <div key={cuisine.id}>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    {cuisine.type} Cuisine
                    {selectedCuisine === cuisine.type && <Check className="w-6 h-6 text-green-400 ml-2" />}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {cuisine.restaurants.map((restaurant, index) => (
                      <Card
                        key={index}
                        className={`backdrop-blur-xl border cursor-pointer transition-all duration-300 ${
                          selectedDish?.name === restaurant.dish
                            ? "bg-green-500/20 border-green-400"
                            : "bg-white/10 border-white/20 hover:bg-white/15"
                        }`}
                        onClick={() => {
                          setSelectedCuisine(cuisine.type)
                          setSelectedDish(restaurant)
                        }}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-semibold text-white">{restaurant.name}</h4>
                            {selectedDish?.name === restaurant.dish && (
                              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex items-center mb-3">
                            {renderStars(restaurant.rating)}
                            <span className="text-white ml-2">{restaurant.rating}</span>
                          </div>
                          <div className="text-xl font-bold text-purple-400 mb-2">{restaurant.dish}</div>
                          <div className="text-lg font-semibold text-white">${restaurant.price}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Transport Selection */}
          <TabsContent value="transport" className="space-y-6">
            <div className="space-y-8">
              {tripData.recommendations.transport.map((transport) => (
                <div key={transport.id}>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    {transport.type}
                    {selectedTransport === transport.type && <Check className="w-6 h-6 text-green-400 ml-2" />}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {transport.options.map((option, index) => (
                      <Card
                        key={index}
                        className={`backdrop-blur-xl border cursor-pointer transition-all duration-300 ${
                          selectedTransportOption?.name === option.name
                            ? "bg-cyan-500/20 border-cyan-400"
                            : "bg-white/10 border-white/20 hover:bg-white/15"
                        }`}
                        onClick={() => {
                          setSelectedTransport(transport.type)
                          setSelectedTransportOption(option)
                        }}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-white">{option.name}</h4>
                            {selectedTransportOption?.name === option.name && (
                              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center text-gray-400">
                              <Clock className="w-4 h-4 mr-2" />
                              <span>{option.time} arrival</span>
                            </div>
                            <div className="flex items-center text-gray-400">
                              <Users className="w-4 h-4 mr-2" />
                              <span>{option.capacity} capacity</span>
                            </div>
                            <div className="text-xl font-bold text-white">${option.price}</div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Booking Summary */}
        {isBookingReady && (
          <Card className="backdrop-blur-xl bg-white/10 border border-white/20 mt-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Booking Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-white/5">
                  <h4 className="text-white font-semibold mb-2">🏨 Accommodation</h4>
                  <p className="text-gray-400">{selectedAccommodation?.name}</p>
                  <p className="text-white font-bold">${selectedAccommodation?.price}/night</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <h4 className="text-white font-semibold mb-2">🍽️ Dining</h4>
                  <p className="text-gray-400">{selectedDish?.dish}</p>
                  <p className="text-white font-bold">${selectedDish?.price}/person</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <h4 className="text-white font-semibold mb-2">🚗 Transport</h4>
                  <p className="text-gray-400">{selectedTransportOption?.name}</p>
                  <p className="text-white font-bold">${selectedTransportOption?.price}/trip</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/20">
                <div className="text-2xl font-bold text-white">Total: ${calculateTotalCost()}</div>
                <Button
                  onClick={handleBookNow}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-8 py-3 text-lg"
                >
                  Book Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
