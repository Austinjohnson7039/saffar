"use client"

import { useState, useEffect } from "react"
import { Navigation, MapPin, Clock, Star, Coffee, ShoppingBag, Camera } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { awsAPI } from "@/lib/aws-config"

interface OptimizedRouteMapProps {
  bookingData: any
  userLocation: { lat: number; lng: number }
}

export function OptimizedRouteMap({ bookingData, userLocation }: OptimizedRouteMapProps) {
  const [routeData, setRouteData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedStop, setSelectedStop] = useState(null)

  useEffect(() => {
    loadOptimizedRoute()
  }, [])

  const loadOptimizedRoute = async () => {
    try {
      const userId = localStorage.getItem("userId") || "demo-user"
      const route = await awsAPI.getOptimizedRoute(
        userId,
        bookingData.tripDetails.destination,
        bookingData.accommodation,
      )
      setRouteData(route)
    } catch (error) {
      console.error("Failed to load route:", error)
      // Fallback to demo route data
      setRouteData({
        totalDistance: "12.5 km",
        estimatedTime: "35 minutes",
        stops: [
          {
            id: 1,
            name: "Current Location",
            type: "start",
            coordinates: userLocation,
            estimatedTime: "0 min",
            icon: "📍",
          },
          {
            id: 2,
            name: "Central Mall",
            type: "preference",
            reason: "You love shopping - 85% match",
            coordinates: { lat: userLocation.lat + 0.01, lng: userLocation.lng + 0.01 },
            estimatedTime: "8 min",
            icon: "🛍️",
            details: "Premium shopping center with 200+ stores",
          },
          {
            id: 3,
            name: "Artisan Coffee House",
            type: "preference",
            reason: "Matches your coffee preference",
            coordinates: { lat: userLocation.lat + 0.02, lng: userLocation.lng + 0.015 },
            estimatedTime: "15 min",
            icon: "☕",
            details: "Highly rated local coffee shop",
          },
          {
            id: 4,
            name: "Scenic Viewpoint",
            type: "preference",
            reason: "Perfect for photography",
            coordinates: { lat: userLocation.lat + 0.025, lng: userLocation.lng + 0.02 },
            estimatedTime: "22 min",
            icon: "📸",
            details: "Instagram-worthy city views",
          },
          {
            id: 5,
            name: bookingData.accommodation.name,
            type: "destination",
            coordinates: { lat: userLocation.lat + 0.03, lng: userLocation.lng + 0.025 },
            estimatedTime: "35 min",
            icon: "🏨",
            details: "Your booked accommodation",
          },
        ],
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getStopIcon = (type: string) => {
    switch (type) {
      case "start":
        return <MapPin className="w-5 h-5 text-green-400" />
      case "preference":
        return <Star className="w-5 h-5 text-purple-400" />
      case "destination":
        return <Navigation className="w-5 h-5 text-blue-400" />
      default:
        return <MapPin className="w-5 h-5 text-gray-400" />
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-white mb-2">Optimizing Your Route</h2>
            <p className="text-gray-400">AI is analyzing your preferences to create the perfect path...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Your Optimized Route</h1>
          <p className="text-gray-400">Personalized path based on your preferences</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Navigation className="w-5 h-5 mr-2" />
                  Interactive Route Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg relative overflow-hidden border border-white/10">
                  {/* Simulated Map with Route */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Navigation className="w-16 h-16 text-purple-400 mx-auto mb-4 animate-pulse" />
                      <p className="text-white text-lg font-semibold mb-2">AI-Optimized Route</p>
                      <p className="text-gray-400">
                        {routeData.totalDistance} • {routeData.estimatedTime}
                      </p>
                    </div>
                  </div>

                  {/* Route Visualization */}
                  <svg className="absolute inset-0 w-full h-full">
                    <defs>
                      <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#06B6D4" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 50 350 Q 150 250 250 200 Q 350 150 450 100"
                      stroke="url(#routeGradient)"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray="10,5"
                      className="animate-pulse"
                    />
                  </svg>

                  {/* Stop Markers */}
                  {routeData.stops.map((stop, index) => (
                    <div
                      key={stop.id}
                      className={`absolute w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                        selectedStop?.id === stop.id ? "scale-125" : "hover:scale-110"
                      }`}
                      style={{
                        left: `${20 + index * 15}%`,
                        top: `${80 - index * 15}%`,
                        backgroundColor:
                          stop.type === "start" ? "#10B981" : stop.type === "destination" ? "#3B82F6" : "#8B5CF6",
                      }}
                      onClick={() => setSelectedStop(stop)}
                    >
                      <span className="text-white text-sm">{stop.icon}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Route Summary */}
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20 mt-6">
              <CardHeader>
                <CardTitle className="text-white">Route Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{routeData.totalDistance}</div>
                    <div className="text-sm text-gray-400">Total Distance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{routeData.estimatedTime}</div>
                    <div className="text-sm text-gray-400">Estimated Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{routeData.stops.length - 2}</div>
                    <div className="text-sm text-gray-400">Preference Stops</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Route Details */}
          <div className="space-y-6">
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Route Stops</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {routeData.stops.map((stop, index) => (
                  <div
                    key={stop.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedStop?.id === stop.id
                        ? "bg-purple-500/20 border border-purple-400"
                        : "bg-white/5 hover:bg-white/10"
                    }`}
                    onClick={() => setSelectedStop(stop)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">{getStopIcon(stop.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-white font-semibold">{stop.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {stop.estimatedTime}
                          </Badge>
                        </div>
                        {stop.reason && <p className="text-purple-400 text-sm mb-1">{stop.reason}</p>}
                        {stop.details && <p className="text-gray-400 text-sm">{stop.details}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Navigation Actions */}
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
              <CardContent className="p-4 space-y-3">
                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                  <Navigation className="w-4 h-4 mr-2" />
                  Start Navigation
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Schedule for Later
                </Button>
              </CardContent>
            </Card>

            {/* Preference Insights */}
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Why This Route?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-400 text-sm">85% shopping preference match</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Coffee className="w-4 h-4 text-orange-400" />
                  <span className="text-gray-400 text-sm">Coffee stops based on past visits</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Camera className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-400 text-sm">Photo opportunities included</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
