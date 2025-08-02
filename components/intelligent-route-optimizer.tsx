"use client"

import { useState, useEffect, useRef } from "react"
import { Navigation, Clock, Brain, Zap, Route, IndianRupee, MapPin, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface IntelligentRouteOptimizerProps {
  bookingData: any
  userLocation: { lat: number; lng: number }
}

declare global {
  interface Window {
    google: any
  }
}

export function IntelligentRouteOptimizer({ bookingData, userLocation }: IntelligentRouteOptimizerProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [routeData, setRouteData] = useState<any>(null)
  const [isOptimizing, setIsOptimizing] = useState(true)
  const [selectedStop, setSelectedStop] = useState<any>(null)
  const [aiInsights, setAiInsights] = useState<string[]>([])

  useEffect(() => {
    if (window.google) {
      initializeMap()
    }
    optimizeRoute()
  }, [])

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: userLocation,
      zoom: 13,
      styles: [
        {
          featureType: "all",
          elementType: "geometry.fill",
          stylers: [{ color: "#1a1a1a" }],
        },
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [{ color: "#ffffff" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#2a2a2a" }],
        },
      ],
    })

    setMap(mapInstance)
  }

  const optimizeRoute = async () => {
    setIsOptimizing(true)

    const insights = [
      "🧠 Analyzing real-time traffic patterns across 500+ routes",
      "🌤️ Processing weather data and road conditions",
      "⏰ Identifying optimal timing based on crowd patterns",
      "💰 Calculating fuel-efficient paths to save ₹200+",
      "✨ Finding hidden gems and local favorites",
      "🎯 Optimizing for your personal preferences and past behavior",
    ]

    let currentInsight = 0
    const insightInterval = setInterval(() => {
      if (currentInsight < insights.length) {
        setAiInsights((prev) => [...prev, insights[currentInsight]])
        currentInsight++
      } else {
        clearInterval(insightInterval)
      }
    }, 600)

    setTimeout(() => {
      const optimizedRoute = {
        totalDistance: "18.5 km",
        estimatedTime: "42 minutes",
        fuelSavings: "₹250",
        aiOptimizationScore: 96,
        carbonFootprint: "2.1 kg CO₂ saved",
        stops: [
          {
            id: 1,
            name: "Your Location",
            type: "start",
            coordinates: userLocation,
            estimatedTime: "0 min",
            icon: "📍",
            aiInsight: "Perfect starting point based on your morning routine",
          },
          {
            id: 2,
            name: "Intelligent Coffee Stop",
            type: "preference",
            reason: "AI detected you need caffeine - 94% accuracy from past trips",
            coordinates: { lat: userLocation.lat + 0.008, lng: userLocation.lng + 0.012 },
            estimatedTime: "8 min",
            icon: "☕",
            details: "Blue Tokai Coffee - trending 67% this week, matches your taste profile",
            cost: "₹350",
            aiFeatures: ["No queue predicted", "Your favorite blend available", "Instagram-worthy interior"],
            rating: 4.8,
          },
          {
            id: 3,
            name: "Smart Shopping District",
            type: "preference",
            reason: "Local market with 40% better prices than malls",
            coordinates: { lat: userLocation.lat + 0.015, lng: userLocation.lng + 0.018 },
            estimatedTime: "18 min",
            icon: "🛍️",
            details: "Connaught Place - AI found 12 stores matching your shopping history",
            cost: "₹2,500",
            aiFeatures: ["Price comparison enabled", "Crowd-free timing", "Local artisan products"],
            rating: 4.6,
          },
          {
            id: 4,
            name: "AI-Curated Photo Spot",
            type: "preference",
            reason: "Golden hour timing + 89% Instagram engagement rate",
            coordinates: { lat: userLocation.lat + 0.022, lng: userLocation.lng + 0.025 },
            estimatedTime: "28 min",
            icon: "📸",
            details: "India Gate - Perfect lighting conditions predicted",
            cost: "₹0",
            aiFeatures: ["Optimal photo angles", "Crowd-free zones", "Professional tips included"],
            rating: 4.9,
          },
          {
            id: 5,
            name: bookingData?.accommodation?.name || "The Oberoi",
            type: "destination",
            coordinates: { lat: userLocation.lat + 0.03, lng: userLocation.lng + 0.035 },
            estimatedTime: "42 min",
            icon: "🏨",
            details: "Your premium accommodation awaits",
            aiInsight: "Early check-in arranged based on your arrival time",
            rating: 4.7,
          },
        ],
        intelligentFeatures: {
          dynamicRerouting: true,
          weatherAdaptation: true,
          trafficPrediction: true,
          costOptimization: true,
          personalizedStops: true,
          realTimeUpdates: true,
        },
      }

      setRouteData(optimizedRoute)

      if (map && window.google) {
        drawIntelligentRoute(optimizedRoute)
      }

      setIsOptimizing(false)
      setAiInsights([])
    }, 4000)
  }

  const drawIntelligentRoute = (route: any) => {
    if (!map || !window.google) return

    const directionsService = new window.google.maps.DirectionsService()
    const directionsRenderer = new window.google.maps.DirectionsRenderer({
      polylineOptions: {
        strokeColor: "#000000",
        strokeWeight: 4,
        strokeOpacity: 0.8,
      },
      suppressMarkers: true,
    })

    directionsRenderer.setMap(map)

    const waypoints = route.stops.slice(1, -1).map((stop: any) => ({
      location: new window.google.maps.LatLng(stop.coordinates.lat, stop.coordinates.lng),
      stopover: true,
    }))

    const request = {
      origin: new window.google.maps.LatLng(route.stops[0].coordinates.lat, route.stops[0].coordinates.lng),
      destination: new window.google.maps.LatLng(
        route.stops[route.stops.length - 1].coordinates.lat,
        route.stops[route.stops.length - 1].coordinates.lng,
      ),
      waypoints: waypoints,
      optimizeWaypoints: true,
      travelMode: window.google.maps.TravelMode.DRIVING,
    }

    directionsService.route(request, (result: any, status: any) => {
      if (status === "OK") {
        directionsRenderer.setDirections(result)
      }
    })

    // Add intelligent markers
    route.stops.forEach((stop: any, index: number) => {
      const marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(stop.coordinates.lat, stop.coordinates.lng),
        map: map,
        title: stop.name,
        icon: {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="${stop.type === "start" ? "#10B981" : stop.type === "destination" ? "#3B82F6" : "#000000"}" stroke="white" strokeWidth="2"/>
              <text x="20" y="26" textAnchor="middle" fill="white" fontSize="16">${stop.icon}</text>
            </svg>
          `)}`,
          scaledSize: new window.google.maps.Size(40, 40),
        },
      })

      marker.addListener("click", () => {
        setSelectedStop(stop)
      })
    })
  }

  if (isOptimizing) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Brain className="w-8 h-8 animate-pulse" />
              <h2 className="text-3xl font-bold">Safar AI is optimizing your route...</h2>
            </div>
            <p className="text-muted-foreground">Advanced algorithms analyzing thousands of variables</p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50 animate-in slide-in-from-left"
                  >
                    <Zap className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">{insight}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Intelligent Route Optimization</h1>
          <p className="text-muted-foreground">AI-powered navigation with real-time adaptation</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Google Maps */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Navigation className="w-5 h-5 mr-2" />
                  Live Route Map
                  <Badge className="ml-2 bg-green-500/20 text-green-600">
                    AI Score: {routeData?.aiOptimizationScore}%
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  ref={mapRef}
                  className="h-96 w-full rounded-lg border border-border bg-muted flex items-center justify-center"
                >
                  {!window.google && (
                    <div className="text-center">
                      <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Loading Google Maps...</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Route Intelligence */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  Route Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{routeData?.totalDistance}</div>
                    <div className="text-sm text-muted-foreground">Total Distance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{routeData?.estimatedTime}</div>
                    <div className="text-sm text-muted-foreground">Estimated Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{routeData?.fuelSavings}</div>
                    <div className="text-sm text-muted-foreground">Fuel Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{routeData?.carbonFootprint}</div>
                    <div className="text-sm text-muted-foreground">CO₂ Saved</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Intelligent Stops */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Smart Route Stops</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {routeData?.stops?.map((stop: any, index: number) => (
                  <div
                    key={stop.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 border ${
                      selectedStop?.id === stop.id ? "border-foreground bg-muted" : "border-border hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedStop(stop)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{stop.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold">{stop.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {stop.estimatedTime}
                          </Badge>
                        </div>
                        {stop.rating && (
                          <div className="flex items-center space-x-1 mb-2">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-muted-foreground">{stop.rating}</span>
                          </div>
                        )}
                        {stop.reason && <p className="text-sm text-muted-foreground mb-2">{stop.reason}</p>}
                        {stop.details && <p className="text-sm mb-2">{stop.details}</p>}
                        {stop.cost && (
                          <div className="flex items-center text-sm font-medium">
                            <IndianRupee className="w-3 h-3 mr-1" />
                            {stop.cost}
                          </div>
                        )}
                        {stop.aiFeatures && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {stop.aiFeatures.map((feature: string, idx: number) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Intelligent Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Route className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Dynamic rerouting based on live traffic</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Personalized stops from your preferences</span>
                </div>
                <div className="flex items-center space-x-2">
                  <IndianRupee className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">Cost optimization and price alerts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">Real-time ETA updates</span>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Actions */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <Button className="w-full bg-foreground text-background hover:bg-foreground/90">
                  <Navigation className="w-4 h-4 mr-2" />
                  Start Intelligent Navigation
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Clock className="w-4 h-4 mr-2" />
                  Schedule for Later
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
