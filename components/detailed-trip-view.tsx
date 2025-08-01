"use client"

import { useState } from "react"
import { ArrowLeft, Star, Calendar, DollarSign, MapPin, Camera, Heart, Share, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

interface DetailedTripViewProps {
  trip: any
  onBack: () => void
}

export function DetailedTripView({ trip, onBack }: DetailedTripViewProps) {
  const [selectedPhoto, setSelectedPhoto] = useState(0)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-600"}`} />
    ))
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "hotel":
        return "🏨"
      case "food":
        return "🍽️"
      case "activity":
        return "🎯"
      default:
        return "📍"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Button variant="ghost" onClick={onBack} className="mb-6 text-white hover:bg-white/10">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Trip History
        </Button>

        {/* Trip Header */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="relative h-96 rounded-xl overflow-hidden mb-6">
              <img
                src={trip.photos?.[selectedPhoto] || trip.image}
                alt={trip.destination}
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
                <Badge
                  className={`${trip.status === "completed" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-blue-500/20 text-blue-400 border-blue-500/30"}`}
                >
                  {trip.status}
                </Badge>
              </div>
            </div>

            {/* Photo Gallery */}
            {trip.photos && (
              <div className="flex space-x-2 mb-6">
                {trip.photos.map((photo, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPhoto(index)}
                    className={`w-20 h-16 rounded-lg overflow-hidden border-2 ${
                      selectedPhoto === index ? "border-purple-400" : "border-white/20"
                    }`}
                  >
                    <img
                      src={photo || "/placeholder.svg"}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{trip.destination}</h1>
                <div className="flex items-center space-x-4 text-gray-400">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{trip.dates}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    <span>${trip.totalCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              {trip.rating && (
                <div className="text-right">
                  <div className="flex items-center mb-1">
                    {renderStars(trip.rating)}
                    <span className="text-white ml-2 font-semibold">{trip.rating}</span>
                  </div>
                  <div className="text-sm text-gray-400">Overall Experience</div>
                </div>
              )}
            </div>

            {/* Trip Highlights */}
            {trip.highlights && (
              <Card className="backdrop-blur-xl bg-white/10 border border-white/20 mb-6">
                <CardHeader>
                  <CardTitle className="text-white">Trip Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {trip.highlights.map((highlight, index) => (
                      <Badge key={index} variant="secondary" className="bg-purple-500/20 text-purple-300">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Trip Summary Sidebar */}
          <div className="space-y-6">
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Trip Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration</span>
                  <span className="text-white">{trip.itinerary ? `${trip.itinerary.length} days` : "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Cost</span>
                  <span className="text-white">${trip.totalCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <Badge
                    className={`${trip.status === "completed" ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"}`}
                  >
                    {trip.status}
                  </Badge>
                </div>
                {trip.budget && (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Budget Used</span>
                        <span className="text-white">
                          {((trip.budget.spent / trip.budget.total) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={(trip.budget.spent / trip.budget.total) * 100} className="h-2" />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Activities</span>
                  <span className="text-white">
                    {trip.itinerary ? trip.itinerary.reduce((total, day) => total + day.activities.length, 0) : 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg per Day</span>
                  <span className="text-white">
                    ${trip.itinerary ? Math.round(trip.totalCost / trip.itinerary.length) : 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Photos</span>
                  <span className="text-white">{trip.photos ? trip.photos.length : 0}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Itinerary */}
        <Tabs defaultValue="itinerary" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-xl border border-white/20">
            <TabsTrigger value="itinerary" className="data-[state=active]:bg-purple-500/30">
              Daily Itinerary
            </TabsTrigger>
            <TabsTrigger value="expenses" className="data-[state=active]:bg-purple-500/30">
              Expenses
            </TabsTrigger>
            <TabsTrigger value="memories" className="data-[state=active]:bg-purple-500/30">
              Memories
            </TabsTrigger>
          </TabsList>

          <TabsContent value="itinerary" className="space-y-6">
            {trip.itinerary?.map((day, dayIndex) => (
              <Card key={dayIndex} className="backdrop-blur-xl bg-white/10 border border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                      {day.day}
                    </div>
                    Day {day.day} - {day.date}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {day.activities.map((activity, activityIndex) => (
                    <div key={activityIndex} className="flex items-start space-x-4 p-4 rounded-lg bg-white/5">
                      <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-semibold">{activity.title}</h4>
                          <div className="flex items-center space-x-2">
                            {activity.cost && (
                              <Badge variant="outline" className="text-green-400 border-green-400/30">
                                ${activity.cost}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {activity.time}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {activity.location}
                          </span>
                          {activity.rating && (
                            <span className="flex items-center">
                              <Star className="w-4 h-4 mr-1 text-yellow-400" />
                              {activity.rating}
                            </span>
                          )}
                        </div>
                        {activity.notes && <p className="text-gray-300 text-sm italic">"{activity.notes}"</p>}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Expense Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                {trip.budget && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-white">${trip.budget.total.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">Total Budget</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-400">${trip.budget.spent.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">Spent</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-400">
                          ${trip.budget.remaining.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-400">Remaining</div>
                      </div>
                    </div>

                    {trip.itinerary && (
                      <div className="space-y-3">
                        <h4 className="text-white font-semibold">Daily Expenses</h4>
                        {trip.itinerary.map((day, index) => {
                          const dayTotal = day.activities.reduce((sum, activity) => sum + (activity.cost || 0), 0)
                          return (
                            <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                              <span className="text-white">Day {day.day}</span>
                              <span className="text-white font-semibold">${dayTotal}</span>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="memories" className="space-y-6">
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Trip Memories</CardTitle>
              </CardHeader>
              <CardContent>
                {trip.photos ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {trip.photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={photo || "/placeholder.svg"}
                          alt={`Memory ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Camera className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Camera className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                    <p className="text-gray-400">No photos available for this trip</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
