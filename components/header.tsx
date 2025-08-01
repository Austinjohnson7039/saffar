"use client"

import { Bot, Settings, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface HeaderProps {
  currentView:
    | "home"
    | "itinerary"
    | "settings"
    | "history"
    | "expenses"
    | "emergency"
    | "activity"
    | "booking"
    | "trip-details"
  setCurrentView: (
    view:
      | "home"
      | "itinerary"
      | "settings"
      | "history"
      | "expenses"
      | "emergency"
      | "activity"
      | "booking"
      | "trip-details",
  ) => void
  setShowChat: (show: boolean) => void
  showChat: boolean // Declare the showChat variable here
}

export function Header({ currentView, setCurrentView, setShowChat, showChat }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => setCurrentView("home")}>
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                TravelAI
              </h1>
              <p className="text-xs text-gray-400">Intelligent Planning</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Button
              variant={currentView === "home" ? "default" : "ghost"}
              onClick={() => setCurrentView("home")}
              className="text-white hover:bg-white/10"
            >
              Dashboard
            </Button>
            <Button
              variant={currentView === "itinerary" ? "default" : "ghost"}
              onClick={() => setCurrentView("itinerary")}
              className="text-white hover:bg-white/10"
            >
              My Trips
            </Button>
            <Button
              variant={currentView === "settings" ? "default" : "ghost"}
              onClick={() => setCurrentView("settings")}
              className="text-white hover:bg-white/10"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </nav>

          {/* User Profile & AI Assistant */}
          <div className="flex items-center space-x-4">
            {/* AI Assistant Avatar - Make it more prominent */}
            <Button
              variant="ghost"
              onClick={() => setShowChat(!showChat)}
              className="relative p-2 hover:bg-white/10 rounded-full"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900 animate-bounce"></div>
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                AI
              </div>
            </Button>

            {/* User Profile */}
            <Avatar className="w-10 h-10 border-2 border-purple-400">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
                <User className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}
