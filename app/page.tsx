"use client"

import { useState } from "react"
import { PremiumHeroSection } from "@/components/premium-hero-section"
import { PremiumHeader } from "@/components/premium-header"
import { PremiumRecommendationSelector } from "@/components/premium-recommendation-selector"
import { IntelligentRouteOptimizer } from "@/components/intelligent-route-optimizer"
import { DynamicItinerary } from "@/components/dynamic-itinerary"

export default function SafarApp() {
  const [currentView, setCurrentView] = useState("home")
  const [tripData, setTripData] = useState<any>(null)
  const [bookingData, setBookingData] = useState<any>(null)

  const userLocation = { lat: 28.6139, lng: 77.209 } // Delhi coordinates

  const handleNavigation = (view: string) => {
    setCurrentView(view)
  }

  const handleTripPlanned = (data: any) => {
    setTripData(data)
    setCurrentView("recommendations")
  }

  const handleBookingReady = (selections: any) => {
    setBookingData(selections)
    setCurrentView("route")
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "home":
        return <PremiumHeroSection onTripPlanned={handleTripPlanned} />
      case "recommendations":
        return tripData ? (
          <PremiumRecommendationSelector tripData={tripData} onBookingReady={handleBookingReady} />
        ) : (
          <PremiumHeroSection onTripPlanned={handleTripPlanned} />
        )
      case "route":
        return bookingData ? (
          <IntelligentRouteOptimizer bookingData={bookingData} userLocation={userLocation} />
        ) : (
          <div className="container mx-auto px-4 py-8 text-center">
            <h2 className="text-2xl font-bold mb-4">No booking data available</h2>
            <p className="text-muted-foreground">Please complete a trip booking first.</p>
          </div>
        )
      case "dynamic":
        return tripData ? (
          <DynamicItinerary tripData={tripData} onItineraryUpdate={() => {}} />
        ) : (
          <div className="container mx-auto px-4 py-8 text-center">
            <h2 className="text-2xl font-bold mb-4">No trip data available</h2>
            <p className="text-muted-foreground">Please plan a trip first to see dynamic itinerary.</p>
          </div>
        )
      case "history":
        return (
          <div className="container mx-auto px-4 py-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Trip History</h2>
            <p className="text-muted-foreground">Your past intelligent journeys will appear here.</p>
          </div>
        )
      case "settings":
        return (
          <div className="container mx-auto px-4 py-8 text-center">
            <h2 className="text-2xl font-bold mb-4">AI Settings</h2>
            <p className="text-muted-foreground">Customize your AI travel preferences.</p>
          </div>
        )
      default:
        return <PremiumHeroSection onTripPlanned={handleTripPlanned} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <PremiumHeader currentView={currentView} onNavigate={handleNavigation} />
      {renderCurrentView()}
    </div>
  )
}
