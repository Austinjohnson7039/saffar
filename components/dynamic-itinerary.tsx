"use client"

import { useState, useEffect } from "react"
import { Brain, Zap, Cloud, Navigation, IndianRupee, Clock, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface DynamicItineraryProps {
  tripData?: any
  onItineraryUpdate: (updatedItinerary: any) => void
}

export function DynamicItinerary({ tripData, onItineraryUpdate }: DynamicItineraryProps) {
  const [isAdapting, setIsAdapting] = useState(false)
  const [adaptationInsights, setAdaptationInsights] = useState<string[]>([])
  const [liveConditions, setLiveConditions] = useState({
    weather: { condition: "Sunny", temp: "28°C", impact: "positive" },
    traffic: { level: "Light", delay: "0 min", impact: "positive" },
    events: { count: 2, type: "Cultural Festival", impact: "opportunity" },
    crowdLevel: { status: "Low", percentage: "23%", impact: "positive" },
  })

  useEffect(() => {
    // Simulate real-time condition monitoring
    const interval = setInterval(() => {
      simulateConditionChanges()
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const simulateConditionChanges = () => {
    const conditions = [
      {
        weather: { condition: "Light Rain", temp: "25°C", impact: "neutral" },
        traffic: { level: "Moderate", delay: "15 min", impact: "negative" },
        events: { count: 1, type: "Street Market", impact: "opportunity" },
        crowdLevel: { status: "Medium", percentage: "45%", impact: "neutral" },
      },
      {
        weather: { condition: "Cloudy", temp: "26°C", impact: "positive" },
        traffic: { level: "Heavy", delay: "25 min", impact: "negative" },
        events: { count: 3, type: "Food Festival", impact: "opportunity" },
        crowdLevel: { status: "High", percentage: "78%", impact: "negative" },
      },
    ]

    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)]
    setLiveConditions(randomCondition)
  }

  const handleAdaptPlan = async () => {
    setIsAdapting(true)

    const insights = [
      "🌧️ Detected weather change - adjusting outdoor activities",
      "🚗 Traffic spike detected - optimizing route timing",
      "🎉 Local festival discovered - adding cultural experience",
      "💰 Price drop alert - upgrading restaurant reservation",
      "⏰ Crowd analysis - shifting museum visit to off-peak hours",
      "✨ Finalizing optimized itinerary with ₹1,200 savings",
    ]

    let currentInsight = 0
    const insightInterval = setInterval(() => {
      if (currentInsight < insights.length) {
        setAdaptationInsights((prev) => [...prev, insights[currentInsight]])
        currentInsight++
      } else {
        clearInterval(insightInterval)
      }
    }, 600)

    setTimeout(() => {
      setIsAdapting(false)
      setAdaptationInsights([])
      // Trigger itinerary update
      onItineraryUpdate({
        adapted: true,
        savings: 1200,
        improvements: 4,
        timestamp: new Date().toISOString(),
      })
    }, 4000)
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "positive":
        return "text-green-600 bg-green-500/20"
      case "negative":
        return "text-red-600 bg-red-500/20"
      case "opportunity":
        return "text-blue-600 bg-blue-500/20"
      default:
        return "text-yellow-600 bg-yellow-500/20"
    }
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "positive":
        return "✅"
      case "negative":
        return "⚠️"
      case "opportunity":
        return "🎯"
      default:
        return "ℹ️"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="w-6 h-6" />
            <h1 className="text-3xl font-bold">Dynamic Itinerary Intelligence</h1>
          </div>
          <p className="text-muted-foreground">
            Real-time adaptation based on live conditions, weather, and local events
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Live Conditions Monitor */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Live Conditions Monitor
                  <Badge className="ml-2 bg-green-500/20 text-green-600 animate-pulse">Live</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Cloud className="w-4 h-4" />
                        <span className="font-medium">Weather</span>
                      </div>
                      <Badge className={getImpactColor(liveConditions.weather.impact)}>
                        {getImpactIcon(liveConditions.weather.impact)} {liveConditions.weather.impact}
                      </Badge>
                    </div>
                    <div className="text-lg font-semibold">{liveConditions.weather.condition}</div>
                    <div className="text-sm text-muted-foreground">{liveConditions.weather.temp}</div>
                  </div>

                  <div className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Navigation className="w-4 h-4" />
                        <span className="font-medium">Traffic</span>
                      </div>
                      <Badge className={getImpactColor(liveConditions.traffic.impact)}>
                        {getImpactIcon(liveConditions.traffic.impact)} {liveConditions.traffic.impact}
                      </Badge>
                    </div>
                    <div className="text-lg font-semibold">{liveConditions.traffic.level}</div>
                    <div className="text-sm text-muted-foreground">+{liveConditions.traffic.delay} delay</div>
                  </div>

                  <div className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">🎉</span>
                        <span className="font-medium">Local Events</span>
                      </div>
                      <Badge className={getImpactColor(liveConditions.events.impact)}>
                        {getImpactIcon(liveConditions.events.impact)} {liveConditions.events.impact}
                      </Badge>
                    </div>
                    <div className="text-lg font-semibold">{liveConditions.events.count} Active</div>
                    <div className="text-sm text-muted-foreground">{liveConditions.events.type}</div>
                  </div>

                  <div className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">👥</span>
                        <span className="font-medium">Crowd Level</span>
                      </div>
                      <Badge className={getImpactColor(liveConditions.crowdLevel.impact)}>
                        {getImpactIcon(liveConditions.crowdLevel.impact)} {liveConditions.crowdLevel.impact}
                      </Badge>
                    </div>
                    <div className="text-lg font-semibold">{liveConditions.crowdLevel.status}</div>
                    <div className="text-sm text-muted-foreground">{liveConditions.crowdLevel.percentage} capacity</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Adaptation Process */}
            {isAdapting && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="w-5 h-5 mr-2 animate-pulse" />
                    AI is Adapting Your Plan...
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {adaptationInsights.map((insight, index) => (
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
            )}

            {/* Sample Itinerary */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Intelligent Itinerary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-lg">☕</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold">Morning Coffee at Blue Tokai</h4>
                        <Badge variant="outline">9:00 AM</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        AI Reason: Perfect timing to avoid crowds, matches your coffee preference
                      </p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="flex items-center">
                          <IndianRupee className="w-3 h-3 mr-1" />
                          350
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          30 min
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                      <span className="text-lg">🏛️</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold">Red Fort Heritage Tour</h4>
                        <Badge variant="outline">11:00 AM</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        AI Adaptation: Moved from 2 PM due to weather forecast
                      </p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="flex items-center">
                          <IndianRupee className="w-3 h-3 mr-1" />
                          500
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />2 hours
                        </span>
                        <Badge className="bg-green-500/20 text-green-700 text-xs">Optimized</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30">
                    <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <span className="text-lg">🍽️</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold">Lunch at Karim's</h4>
                        <Badge variant="outline">1:30 PM</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        AI Upgrade: Better table available due to cancellation
                      </p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="flex items-center">
                          <IndianRupee className="w-3 h-3 mr-1" />
                          1200
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />1 hour
                        </span>
                        <Badge className="bg-blue-500/20 text-blue-700 text-xs">Upgraded</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Control Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  AI Control Panel
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={handleAdaptPlan}
                  disabled={isAdapting}
                  className="w-full bg-foreground text-background hover:bg-foreground/90"
                >
                  {isAdapting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-2" />
                      Adapting Plan...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Adapt to Live Conditions
                    </>
                  )}
                </Button>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span>AI Confidence</span>
                    <Badge className="bg-green-500/20 text-green-700">94%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Potential Savings</span>
                    <span className="font-medium flex items-center">
                      <IndianRupee className="w-3 h-3 mr-1" />
                      1,200
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Time Optimized</span>
                    <span className="font-medium">45 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Experience Score</span>
                    <Badge className="bg-purple-500/20 text-purple-700">9.2/10</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Smart Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-blue-600">🎉</span>
                    <span className="text-sm font-medium">New Opportunity</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Cultural festival nearby - add to itinerary for authentic experience
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-green-600">💰</span>
                    <span className="text-sm font-medium">Price Drop Alert</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Restaurant prices dropped 20% - upgrade your dinner reservation
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-yellow-600">⚠️</span>
                    <span className="text-sm font-medium">Traffic Warning</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Heavy traffic expected at 5 PM - consider leaving earlier
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
