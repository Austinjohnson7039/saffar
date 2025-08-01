"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ItineraryView } from "@/components/itinerary-view"
import { SettingsPanel } from "@/components/settings-panel"
import { AIChat } from "@/components/ai-chat"
import { MobileNav } from "@/components/mobile-nav"
import { TripHistory } from "@/components/trip-history"
import { ExpenseTracker } from "@/components/expense-tracker"
import { EmergencyInfo } from "@/components/emergency-info"
import { ActivityDetails } from "@/components/activity-details"
import { BookingConfirmation } from "@/components/booking-confirmation"
import { DetailedTripView } from "@/components/detailed-trip-view"
import { FloatingAIButton } from "@/components/floating-ai-button"

export default function TravelPlannerApp() {
  const [currentView, setCurrentView] = useState<
    "home" | "itinerary" | "settings" | "history" | "expenses" | "emergency" | "activity" | "booking" | "trip-details"
  >("home")
  const [showChat, setShowChat] = useState(false)
  const [tripData, setTripData] = useState(null)
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [bookingData, setBookingData] = useState(null)
  const [expenses, setExpenses] = useState([])
  const [tripHistory, setTripHistory] = useState([
    {
      id: 1,
      destination: "Tokyo, Japan",
      dates: "March 15-22, 2024",
      status: "completed",
      totalCost: 2800,
      rating: 5,
      image: "/placeholder.svg?height=200&width=300&text=Tokyo+Skyline",
      itinerary: [
        {
          day: 1,
          date: "2024-03-15",
          activities: [
            {
              time: "09:00",
              type: "hotel",
              title: "Check-in at Park Hyatt Tokyo",
              location: "Shinjuku",
              rating: 4.9,
              cost: 450,
              notes: "Stunning city views, excellent service",
            },
            {
              time: "14:00",
              type: "food",
              title: "Sushi at Tsukiji Outer Market",
              location: "Tsukiji",
              rating: 4.7,
              cost: 85,
              notes: "Fresh tuna sashimi was incredible",
            },
            {
              time: "16:30",
              type: "activity",
              title: "Tokyo Skytree Observatory",
              location: "Sumida",
              rating: 4.8,
              cost: 45,
              notes: "Clear view of Mt. Fuji!",
            },
            {
              time: "19:00",
              type: "food",
              title: "Dinner at Robot Restaurant",
              location: "Shinjuku",
              rating: 4.2,
              cost: 120,
              notes: "Quirky experience, great for photos",
            },
          ],
        },
        {
          day: 2,
          date: "2024-03-16",
          activities: [
            {
              time: "08:00",
              type: "activity",
              title: "Senso-ji Temple Visit",
              location: "Asakusa",
              rating: 4.6,
              cost: 0,
              notes: "Beautiful traditional architecture",
            },
            {
              time: "11:00",
              type: "food",
              title: "Ramen at Ichiran",
              location: "Shibuya",
              rating: 4.5,
              cost: 25,
              notes: "Perfect tonkotsu broth",
            },
            {
              time: "15:00",
              type: "activity",
              title: "Shibuya Crossing Experience",
              location: "Shibuya",
              rating: 4.4,
              cost: 0,
              notes: "Iconic Tokyo moment",
            },
            {
              time: "18:00",
              type: "food",
              title: "Kaiseki at Kikunoi",
              location: "Higashiyama",
              rating: 4.9,
              cost: 280,
              notes: "Michelin 3-star experience",
            },
          ],
        },
      ],
      budget: { total: 2800, spent: 2650, remaining: 150 },
      highlights: ["Mt. Fuji view from Skytree", "Michelin star dining", "Cherry blossom season"],
      photos: [
        "/placeholder.svg?height=300&width=400&text=Tokyo+Skytree",
        "/placeholder.svg?height=300&width=400&text=Sushi+Tsukiji",
        "/placeholder.svg?height=300&width=400&text=Shibuya+Crossing",
      ],
    },
    {
      id: 2,
      destination: "Barcelona, Spain",
      dates: "June 10-17, 2024",
      status: "completed",
      totalCost: 1900,
      rating: 4,
      image: "/placeholder.svg?height=200&width=300&text=Barcelona+Sagrada+Familia",
      itinerary: [
        {
          day: 1,
          date: "2024-06-10",
          activities: [
            {
              time: "10:00",
              type: "hotel",
              title: "Check-in at Hotel Casa Fuster",
              location: "Gracia",
              rating: 4.7,
              cost: 320,
              notes: "Beautiful modernist building",
            },
            {
              time: "15:00",
              type: "activity",
              title: "Sagrada Familia Tour",
              location: "Eixample",
              rating: 4.9,
              cost: 35,
              notes: "Gaudi's masterpiece, breathtaking",
            },
            {
              time: "19:00",
              type: "food",
              title: "Tapas at Cal Pep",
              location: "Born",
              rating: 4.6,
              cost: 65,
              notes: "Authentic local atmosphere",
            },
          ],
        },
        {
          day: 2,
          date: "2024-06-11",
          activities: [
            {
              time: "09:00",
              type: "activity",
              title: "Park Güell Morning Walk",
              location: "Gracia",
              rating: 4.5,
              cost: 15,
              notes: "Colorful mosaics and city views",
            },
            {
              time: "13:00",
              type: "food",
              title: "Paella at Xiringuito Escribà",
              location: "Barceloneta Beach",
              rating: 4.4,
              cost: 45,
              notes: "Beachfront dining perfection",
            },
            {
              time: "16:00",
              type: "activity",
              title: "Gothic Quarter Walking Tour",
              location: "Ciutat Vella",
              rating: 4.7,
              cost: 25,
              notes: "Medieval streets and history",
            },
          ],
        },
      ],
      budget: { total: 1900, spent: 1850, remaining: 50 },
      highlights: ["Gaudi architecture", "Mediterranean cuisine", "Beach relaxation"],
      photos: [
        "/placeholder.svg?height=300&width=400&text=Sagrada+Familia",
        "/placeholder.svg?height=300&width=400&text=Park+Guell",
        "/placeholder.svg?height=300&width=400&text=Gothic+Quarter",
      ],
    },
    {
      id: 3,
      destination: "New York, USA",
      dates: "September 5-12, 2024",
      status: "upcoming",
      totalCost: 2200,
      rating: null,
      image: "/placeholder.svg?height=200&width=300&text=NYC+Skyline",
      itinerary: [
        {
          day: 1,
          date: "2024-09-05",
          activities: [
            {
              time: "14:00",
              type: "hotel",
              title: "Check-in at The High Line Hotel",
              location: "Chelsea",
              rating: 4.6,
              cost: 380,
              notes: "Boutique hotel near High Line",
            },
            {
              time: "17:00",
              type: "activity",
              title: "High Line Park Walk",
              location: "Chelsea",
              rating: 4.5,
              cost: 0,
              notes: "Elevated park with city views",
            },
            {
              time: "19:30",
              type: "food",
              title: "Dinner at Eleven Madison Park",
              location: "Flatiron",
              rating: 4.8,
              cost: 295,
              notes: "Plant-based fine dining",
            },
          ],
        },
        {
          day: 2,
          date: "2024-09-06",
          activities: [
            {
              time: "09:00",
              type: "activity",
              title: "Central Park Morning Jog",
              location: "Central Park",
              rating: 4.7,
              cost: 0,
              notes: "Peaceful start to the day",
            },
            {
              time: "11:00",
              type: "activity",
              title: "Metropolitan Museum of Art",
              location: "Upper East Side",
              rating: 4.8,
              cost: 30,
              notes: "World-class art collection",
            },
            {
              time: "14:00",
              type: "food",
              title: "Lunch at Katz's Delicatessen",
              location: "Lower East Side",
              rating: 4.3,
              cost: 25,
              notes: "Famous pastrami sandwich",
            },
          ],
        },
      ],
      budget: { total: 2200, spent: 0, remaining: 2200 },
      highlights: ["Broadway shows", "World-class museums", "Diverse food scene"],
      photos: [
        "/placeholder.svg?height=300&width=400&text=High+Line+NYC",
        "/placeholder.svg?height=300&width=400&text=Central+Park",
        "/placeholder.svg?height=300&width=400&text=Brooklyn+Bridge",
      ],
    },
    {
      id: 4,
      destination: "Paris, France",
      dates: "April 20-27, 2023",
      status: "completed",
      totalCost: 2400,
      rating: 5,
      image: "/placeholder.svg?height=200&width=300&text=Eiffel+Tower+Paris",
      itinerary: [
        {
          day: 1,
          date: "2023-04-20",
          activities: [
            {
              time: "11:00",
              type: "hotel",
              title: "Check-in at Le Meurice",
              location: "1st Arrondissement",
              rating: 4.9,
              cost: 520,
              notes: "Luxury palace hotel, impeccable service",
            },
            {
              time: "15:00",
              type: "activity",
              title: "Louvre Museum Private Tour",
              location: "1st Arrondissement",
              rating: 4.8,
              cost: 85,
              notes: "Mona Lisa and Venus de Milo",
            },
            {
              time: "19:00",
              type: "food",
              title: "Dinner at L'Ambroisie",
              location: "4th Arrondissement",
              rating: 4.9,
              cost: 350,
              notes: "3 Michelin stars, unforgettable",
            },
          ],
        },
      ],
      budget: { total: 2400, spent: 2380, remaining: 20 },
      highlights: ["Eiffel Tower at sunset", "Seine river cruise", "Montmartre artists"],
      photos: [
        "/placeholder.svg?height=300&width=400&text=Louvre+Museum",
        "/placeholder.svg?height=300&width=400&text=Seine+River",
        "/placeholder.svg?height=300&width=400&text=Montmartre",
      ],
    },
    {
      id: 5,
      destination: "Bali, Indonesia",
      dates: "December 15-22, 2023",
      status: "completed",
      totalCost: 1600,
      rating: 4,
      image: "/placeholder.svg?height=200&width=300&text=Bali+Rice+Terraces",
      itinerary: [
        {
          day: 1,
          date: "2023-12-15",
          activities: [
            {
              time: "12:00",
              type: "hotel",
              title: "Check-in at COMO Shambhala Estate",
              location: "Ubud",
              rating: 4.8,
              cost: 280,
              notes: "Wellness retreat in jungle setting",
            },
            {
              time: "16:00",
              type: "activity",
              title: "Tegallalang Rice Terraces",
              location: "Ubud",
              rating: 4.6,
              cost: 10,
              notes: "Stunning terraced landscapes",
            },
            {
              time: "19:00",
              type: "food",
              title: "Traditional Balinese Dinner",
              location: "Ubud",
              rating: 4.5,
              cost: 35,
              notes: "Authentic local flavors",
            },
          ],
        },
      ],
      budget: { total: 1600, spent: 1580, remaining: 20 },
      highlights: ["Sunrise at Mount Batur", "Traditional spa treatments", "Temple ceremonies"],
      photos: [
        "/placeholder.svg?height=300&width=400&text=Mount+Batur+Sunrise",
        "/placeholder.svg?height=300&width=400&text=Ubud+Temples",
        "/placeholder.svg?height=300&width=400&text=Bali+Beaches",
      ],
    },
  ])

  const [selectedTripDetails, setSelectedTripDetails] = useState(null)

  const handleTripPlanned = (data: any) => {
    setTripData(data)
    setCurrentView("itinerary")
  }

  const handleActivitySelect = (activity: any) => {
    setSelectedActivity(activity)
    setCurrentView("activity")
  }

  const handleBooking = (booking: any) => {
    setBookingData(booking)
    setCurrentView("booking")
  }

  const addExpense = (expense: any) => {
    setExpenses((prev) => [...prev, { ...expense, id: Date.now() }])
  }

  const handleTripSelect = (trip) => {
    setSelectedTripDetails(trip)
    setCurrentView("trip-details")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        <Header currentView={currentView} setCurrentView={setCurrentView} setShowChat={setShowChat} />

        <main className="pb-20 md:pb-0">
          {currentView === "home" && <HeroSection onTripPlanned={handleTripPlanned} />}
          {currentView === "itinerary" && tripData && (
            <ItineraryView tripData={tripData} onActivitySelect={handleActivitySelect} onBooking={handleBooking} />
          )}
          {currentView === "settings" && <SettingsPanel />}
          {currentView === "history" && <TripHistory trips={tripHistory} onTripSelect={handleTripSelect} />}
          {currentView === "expenses" && (
            <ExpenseTracker expenses={expenses} onAddExpense={addExpense} tripData={tripData} />
          )}
          {currentView === "emergency" && <EmergencyInfo />}
          {currentView === "activity" && selectedActivity && (
            <ActivityDetails
              activity={selectedActivity}
              onBack={() => setCurrentView("itinerary")}
              onBooking={handleBooking}
            />
          )}
          {currentView === "booking" && bookingData && (
            <BookingConfirmation booking={bookingData} onConfirm={() => setCurrentView("itinerary")} />
          )}
          {currentView === "trip-details" && selectedTripDetails && (
            <DetailedTripView trip={selectedTripDetails} onBack={() => setCurrentView("history")} />
          )}
        </main>

        <MobileNav
          currentView={currentView}
          setCurrentView={setCurrentView}
          onChatToggle={() => setShowChat(!showChat)}
        />

        <FloatingAIButton onClick={() => setShowChat(!showChat)} />

        {showChat && <AIChat onClose={() => setShowChat(false)} currentView={currentView} />}
      </div>
    </div>
  )
}
