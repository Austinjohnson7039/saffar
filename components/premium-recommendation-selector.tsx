"use client"

import { useState } from "react"
import { Star, Clock, Users, CreditCard, Check, IndianRupee, Brain } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PremiumRecommendationSelectorProps {
  tripData: any
  onBookingReady: (selections: any) => void
}

export function PremiumRecommendationSelector({ tripData, onBookingReady }: PremiumRecommendationSelectorProps) {
  const [selectedAccommodation, setSelectedAccommodation] = useState<any>(null)
  const [selectedCuisine, setSelectedCuisine] = useState<any>(null)
  const [selectedDish, setSelectedDish] = useState<any>(null)
  const [selectedTransport, setSelectedTransport] = useState<any>(null)
  const [selectedTransportOption, setSelectedTransportOption] = useState<any>(null)

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

    onBookingReady({ ...selections, bookingId: `booking_${Date.now()}` })
  }

  const calculateTotalCost = () => {
    const nights = Math.ceil(
      (new Date(tripData.checkOutDate).getTime() - new Date(tripData.checkInDate).getTime()) / (1000 * 60 * 60 * 24),
    )
    const accommodationCost = selectedAccommodation ? selectedAccommodation.price * nights : 0
    const dishCost = selectedDish ? selectedDish.price * tripData.guests : 0
    const transportCost = selectedTransportOption ? selectedTransportOption.price * 2 : 0
    return accommodationCost + dishCost + transportCost
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-500 fill-current" : "text-muted-foreground"}`}
      />
    ))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="w-6 h-6" />
            <h1 className="text-3xl font-bold">AI-Curated Recommendations</h1>
          </div>
          <p className="text-muted-foreground">
            Personalized selections for {tripData.destination} • {tripData.guests} travelers • AI Score:{" "}
            {tripData.aiScore}%
          </p>
        </div>

        <Tabs defaultValue="accommodation" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-muted">
            <TabsTrigger value="accommodation" className="data-[state=active]:bg-background">
              🏨 Stay ({selectedAccommodation ? "✓" : "1/3"})
            </TabsTrigger>
            <TabsTrigger value="cuisine" className="data-[state=active]:bg-background">
              🍽️ Dine ({selectedDish ? "✓" : "2/3"})
            </TabsTrigger>
            <TabsTrigger value="transport" className="data-[state=active]:bg-background">
              🚗 Travel ({selectedTransportOption ? "✓" : "3/3"})
            </TabsTrigger>
          </TabsList>

          {/* Accommodation Selection */}
          <TabsContent value="accommodation" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {tripData.recommendations?.accommodations?.map((hotel: any) => (
                <Card
                  key={hotel.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedAccommodation?.id === hotel.id ? "ring-2 ring-foreground" : "hover:shadow-md"
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
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-blue-500/90 text-white">AI Score: {hotel.aiScore}%</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold">{hotel.name}</h3>
                      <Badge variant="secondary">{hotel.type}</Badge>
                    </div>
                    <div className="flex items-center mb-3">
                      {renderStars(hotel.rating)}
                      <span className="ml-2 text-sm text-muted-foreground">{hotel.rating}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {hotel.amenities?.map((amenity: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center text-2xl font-bold mb-2">
                      <IndianRupee className="w-5 h-5 mr-1" />
                      {hotel.price?.toLocaleString()}/night
                    </div>
                    {hotel.intelligentFeatures && (
                      <div className="flex flex-wrap gap-1">
                        {hotel.intelligentFeatures.map((feature: string, idx: number) => (
                          <Badge key={idx} variant="secondary" className="text-xs bg-green-500/20 text-green-700">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Cuisine Selection */}
          <TabsContent value="cuisine" className="space-y-8">
            {tripData.recommendations?.cuisines?.map((cuisine: any) => (
              <div key={cuisine.id}>
                <div className="flex items-center space-x-3 mb-6">
                  <h3 className="text-2xl font-bold">{cuisine.type} Cuisine</h3>
                  <Badge className="bg-purple-500/20 text-purple-700">
                    AI Popularity: {cuisine.aiPopularityScore}%
                  </Badge>
                  {selectedCuisine === cuisine.type && <Check className="w-6 h-6 text-green-500" />}
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {cuisine.restaurants?.map((restaurant: any, index: number) => (
                    <Card
                      key={index}
                      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        selectedDish?.name === restaurant.dish ? "ring-2 ring-foreground" : "hover:shadow-md"
                      }`}
                      onClick={() => {
                        setSelectedCuisine(cuisine.type)
                        setSelectedDish(restaurant)
                      }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-semibold">{restaurant.name}</h4>
                          {selectedDish?.name === restaurant.dish && (
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex items-center mb-3">
                          {renderStars(restaurant.rating)}
                          <span className="ml-2 text-sm text-muted-foreground">{restaurant.rating}</span>
                        </div>
                        <div className="text-xl font-bold text-foreground mb-2">{restaurant.dish}</div>
                        <div className="flex items-center text-lg font-semibold mb-3">
                          <IndianRupee className="w-4 h-4 mr-1" />
                          {restaurant.price?.toLocaleString()}
                        </div>
                        {restaurant.aiReason && (
                          <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                            <Brain className="w-3 h-3 inline mr-1" />
                            {restaurant.aiReason}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          {/* Transport Selection */}
          <TabsContent value="transport" className="space-y-8">
            {tripData.recommendations?.transport?.map((transport: any) => (
              <div key={transport.id}>
                <div className="flex items-center space-x-3 mb-6">
                  <h3 className="text-2xl font-bold">{transport.type}</h3>
                  <Badge className="bg-cyan-500/20 text-cyan-700">AI Efficiency: {transport.aiEfficiencyScore}%</Badge>
                  {selectedTransport === transport.type && <Check className="w-6 h-6 text-green-500" />}
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {transport.options?.map((option: any, index: number) => (
                    <Card
                      key={index}
                      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        selectedTransportOption?.name === option.name ? "ring-2 ring-foreground" : "hover:shadow-md"
                      }`}
                      onClick={() => {
                        setSelectedTransport(transport.type)
                        setSelectedTransportOption(option)
                      }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold">{option.name}</h4>
                          {selectedTransportOption?.name === option.name && (
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>{option.time} arrival</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Users className="w-4 h-4 mr-2" />
                            <span>{option.capacity} capacity</span>
                          </div>
                          <div className="flex items-center text-xl font-bold">
                            <IndianRupee className="w-5 h-5 mr-1" />
                            {option.price?.toLocaleString()}
                          </div>
                        </div>
                        {option.aiFeatures && (
                          <div className="flex flex-wrap gap-1">
                            {option.aiFeatures.map((feature: string, idx: number) => (
                              <Badge key={idx} variant="secondary" className="text-xs bg-blue-500/20 text-blue-700">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        {/* Booking Summary */}
        {isBookingReady && (
          <Card className="mt-8 shadow-lg border-2 border-green-500/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Intelligent Booking Summary
                <Badge className="ml-2 bg-green-500/20 text-green-700">Ready to Book</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-muted">
                  <h4 className="font-semibold mb-2 flex items-center">
                    🏨 Accommodation
                    <Badge className="ml-2 text-xs">AI: {selectedAccommodation?.aiScore}%</Badge>
                  </h4>
                  <p className="text-muted-foreground">{selectedAccommodation?.name}</p>
                  <p className="font-bold flex items-center">
                    <IndianRupee className="w-4 h-4 mr-1" />
                    {selectedAccommodation?.price?.toLocaleString()}/night
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <h4 className="font-semibold mb-2">🍽️ Dining</h4>
                  <p className="text-muted-foreground">{selectedDish?.dish}</p>
                  <p className="font-bold flex items-center">
                    <IndianRupee className="w-4 h-4 mr-1" />
                    {selectedDish?.price?.toLocaleString()}/person
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <h4 className="font-semibold mb-2">🚗 Transport</h4>
                  <p className="text-muted-foreground">{selectedTransportOption?.name}</p>
                  <p className="font-bold flex items-center">
                    <IndianRupee className="w-4 h-4 mr-1" />
                    {selectedTransportOption?.price?.toLocaleString()}/trip
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-border">
                <div className="text-2xl font-bold flex items-center">
                  Total: <IndianRupee className="w-6 h-6 mx-1" />
                  {calculateTotalCost()?.toLocaleString()}
                </div>
                <Button onClick={handleBookNow} size="lg" className="px-8 py-3 text-lg font-semibold">
                  <Brain className="w-4 h-4 mr-2" />
                  Proceed to Smart Payment
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
