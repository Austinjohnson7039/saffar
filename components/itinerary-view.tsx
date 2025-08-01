"use client"

import { useState } from "react"
import { MapPin, Clock, Star, DollarSign, Navigation, Hotel, Utensils, Camera, MessageCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface ItineraryViewProps {
  tripData: any
  onActivitySelect?: (activity: any) => void
  onBooking?: (booking: any) => void
}

export function ItineraryView({ tripData, onActivitySelect, onBooking }: ItineraryViewProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "hotel":
        return <Hotel className="w-5 h-5" />
      case "food":
        return <Utensils className="w-5 h-5" />
      case "activity":
        return <Camera className="w-5 h-5" />
      default:
        return <MapPin className="w-5 h-5" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "hotel":
        return "from-blue-500 to-cyan-500"
      case "food":
        return "from-orange-500 to-red-500"
      case "activity":
        return "from-green-500 to-teal-500"
      default:
        return "from-purple-500 to-pink-500"
    }
  }

  const handleActivityClick = (activity: any) => {
    if (onActivitySelect) {
      onActivitySelect(activity)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Trip Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{tripData.destination}</h1>
            <p className="text-gray-400 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {tripData.dates}
            </p>
          </div>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">AI Optimized</Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-xl border border-white/20">
          <TabsTrigger value="overview" className="data-[state=active]:bg-purple-500/30">
            Overview
          </TabsTrigger>
          <TabsTrigger value="route" className="data-[state=active]:bg-purple-500/30">
            Route
          </TabsTrigger>
          <TabsTrigger value="budget" className="data-[state=active]:bg-purple-500/30">
            Budget
          </TabsTrigger>
          <TabsTrigger value="preferences" className="data-[state=active]:bg-purple-500/30">
            Preferences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Daily Itinerary */}
          {tripData.itinerary.map((day: any, dayIndex: number) => (
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
                {day.activities.map((activity: any, activityIndex: number) => (
                  <div
                    key={activityIndex}
                    className="flex items-start space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer"
                    onClick={() => handleActivityClick(activity)}
                  >
                    <div className="flex-shrink-0">
                      <div
                        className={`w-10 h-10 bg-gradient-to-r ${getActivityColor(activity.type)} rounded-lg flex items-center justify-center`}
                      >
                        {getActivityIcon(activity.type)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-semibold">{activity.title}</h4>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Handle "Why this?" functionality
                            }}
                          >
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Why this?
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-purple-400 hover:text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleActivityClick(activity)
                            }}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {activity.time}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {activity.location}
                        </span>
                        <span className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-400" />
                          {activity.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="route" className="space-y-6">
          <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Navigation className="w-5 h-5 mr-2" />
                Optimized Route Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <p className="text-white text-lg font-semibold mb-2">Interactive Route Map</p>
                  <p className="text-gray-400">AI-optimized path connecting all your destinations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Budget Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Spent</span>
                    <span className="text-white">${tripData.budget.spent}</span>
                  </div>
                  <Progress value={(tripData.budget.spent / tripData.budget.total) * 100} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Remaining</span>
                    <span className="text-green-400">${tripData.budget.remaining}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Expense Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Accommodation</span>
                  <span className="text-white">$480</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Food & Dining</span>
                  <span className="text-white">$320</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Activities</span>
                  <span className="text-white">$240</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Transportation</span>
                  <span className="text-white">$160</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Your Travel Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-3">Preferences</h4>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                      Luxury Hotels
                    </Badge>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                      Local Cuisine
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                      Walking Tours
                    </Badge>
                    <Badge variant="secondary" className="bg-orange-500/20 text-orange-300">
                      Photography
                    </Badge>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-3">Past Trips</h4>
                  <div className="space-y-2 text-gray-400">
                    <p>• Tokyo, Japan (2023)</p>
                    <p>• Barcelona, Spain (2023)</p>
                    <p>• New York, USA (2022)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
