"use client"

import { Home, Map, MessageCircle, DollarSign, Clock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileNavProps {
  currentView: "home" | "itinerary" | "settings" | "history" | "expenses" | "emergency"
  setCurrentView: (view: "home" | "itinerary" | "settings" | "history" | "expenses" | "emergency") => void
  onChatToggle: () => void
}

export function MobileNav({ currentView, setCurrentView, onChatToggle }: MobileNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="backdrop-blur-xl bg-white/10 border-t border-white/20 px-4 py-2">
        <div className="flex items-center justify-around">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView("home")}
            className={`flex flex-col items-center space-y-1 ${
              currentView === "home" ? "text-purple-400" : "text-gray-400"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView("itinerary")}
            className={`flex flex-col items-center space-y-1 ${
              currentView === "itinerary" ? "text-purple-400" : "text-gray-400"
            }`}
          >
            <Map className="w-5 h-5" />
            <span className="text-xs">Trips</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView("history")}
            className={`flex flex-col items-center space-y-1 ${
              currentView === "history" ? "text-purple-400" : "text-gray-400"
            }`}
          >
            <Clock className="w-5 h-5" />
            <span className="text-xs">History</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView("expenses")}
            className={`flex flex-col items-center space-y-1 ${
              currentView === "expenses" ? "text-purple-400" : "text-gray-400"
            }`}
          >
            <DollarSign className="w-5 h-5" />
            <span className="text-xs">Budget</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onChatToggle}
            className="flex flex-col items-center space-y-1 text-gray-400 relative"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-xs">AI Chat</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-bounce">
              !
            </div>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView("emergency")}
            className={`flex flex-col items-center space-y-1 ${
              currentView === "emergency" ? "text-purple-400" : "text-gray-400"
            }`}
          >
            <Shield className="w-5 h-5" />
            <span className="text-xs">SOS</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
