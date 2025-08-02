"use client"

import { useState } from "react"
import { X, Send, Bot, User, Sparkles, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface AIChatProps {
  onClose: () => void
  currentView?: string
}

const getContextualGreeting = (view?: string) => {
  switch (view) {
    case "itinerary":
      return "I can help optimize your itinerary! Based on current trends, Kovalam Beach is getting popular (+45% searches). Want me to suggest trending activities for your Trivandrum trip?"
    case "expenses":
      return "Let me help you budget better! I notice Ayurvedic treatments are trending (+67% interest). Kerala could be a great value option. Want cost comparisons?"
    case "emergency":
      return "Safety first! I have real-time updates on travel advisories. Currently, Kerala has excellent safety ratings and monsoon season info. Need specific safety details?"
    case "history":
      return "Looking at your travel history! I see you loved Goa and Kerala. Based on trends, Varkala Cliffs are having a moment (+52% searches) - perfect for your coastal preferences!"
    default:
      return "Hey there! 🌟 I'm seeing some exciting travel trends in Kerala right now. Kovalam Beach is getting popular (+45% searches), and Ayurvedic treatments are everywhere! What's your next adventure?"
  }
}

const getTrendingSuggestions = () => {
  return [
    "🔥 Show me trending Kerala spots",
    "📱 What's popular in Trivandrum?",
    "💰 Budget-friendly local places",
    "🌟 Personalized recommendations",
  ]
}

export function AIChat({ onClose, currentView }: AIChatProps) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: getContextualGreeting(currentView),
      timestamp: new Date(),
      suggestions: getTrendingSuggestions(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  // Trivandrum and Kerala specific data
  const trivandrumDestinations = [
    { name: "Kovalam Beach", trend: "+45%", reason: "Perfect lighthouse views and Ayurvedic spas" },
    { name: "Padmanabhaswamy Temple", trend: "+38%", reason: "Ancient architecture and spiritual significance" },
    { name: "Varkala Cliffs", trend: "+52%", reason: "Dramatic clifftop views and pristine beaches" },
    { name: "Neyyar Wildlife Sanctuary", trend: "+29%", reason: "Nature lovers and wildlife photography" },
    { name: "Kanyakumari", trend: "+41%", reason: "Sunrise and sunset at India's southern tip" },
  ]

  const localTrends = [
    "🔥 #KovalamBeach has 450K posts this month",
    "📈 'Ayurvedic treatments' searches up 67%",
    "🌊 Varkala cliff content peaked at 280K interactions",
    "✈️ 'Kerala backwaters' mentions increased 43%",
    "🏛️ Temple photography trending on Instagram",
  ]

  const getResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase()

    if (message.includes("trending") || message.includes("popular") || message.includes("kerala")) {
      return {
        content: `Here are the hottest destinations in Kerala right now! 🔥\n\n${trivandrumDestinations
          .map((dest) => `📍 **${dest.name}** (${dest.trend})\n   ${dest.reason}`)
          .join("\n\n")}\n\nWhich one interests you? I can create a personalized itinerary!`,
        suggestions: [
          "Plan Kovalam beach trip",
          "Varkala cliffs experience",
          "Temple tour itinerary",
          "Wildlife sanctuary visit",
        ],
      }
    }

    if (message.includes("trivandrum") || message.includes("local")) {
      return {
        content: `Here's what's trending in Trivandrum! 📱\n\n${localTrends.join("\n")}\n\nThese trends can help you plan amazing trips and discover hidden gems before they get crowded!`,
        suggestions: [
          "Plan photo-worthy trip",
          "Hidden gems near Trivandrum",
          "Best local photo spots",
          "Ayurvedic spa recommendations",
        ],
      }
    }

    if (message.includes("budget") || message.includes("cheap") || message.includes("affordable")) {
      return {
        content: `Great value options in Kerala! 💰 Based on current trends:\n\n🌿 **Neyyar Wildlife** - Nature tours, great value\n🏖️ **Kovalam** - Beach stays, off-season deals\n🏛️ **Local Temples** - Free cultural experiences\n🌊 **Varkala** - Budget backpacker friendly\n\nI can create detailed budget breakdowns for any of these!`,
        suggestions: [
          "Kovalam budget breakdown",
          "Temple tour costs",
          "Varkala backpacker guide",
          "Wildlife sanctuary budget",
        ],
      }
    }

    if (message.includes("beach") || message.includes("kovalam") || message.includes("varkala")) {
      return {
        content: `Perfect timing for Kerala beaches! 🌊 Kovalam and Varkala are trending massively. Based on your preferences:\n\n🏖️ **Kovalam Beach** - Lighthouse views, trending +45%\n🏔️ **Varkala Cliffs** - Dramatic views, Instagram favorite\n🌅 **Kanyakumari** - Sunrise/sunset point\n\nWant me to plan a coastal Kerala trip with trending spots?`,
        suggestions: [
          "Plan Kovalam lighthouse tour",
          "Varkala cliff photography",
          "Kanyakumari sunrise trip",
          "Beach hopping itinerary",
        ],
      }
    }

    if (message.includes("temple") || message.includes("culture") || message.includes("spiritual")) {
      return {
        content: `Kerala's spiritual heritage is amazing! ✨ Based on current interest:\n\n🏛️ **Padmanabhaswamy Temple** - Ancient architecture (+38%)\n🕉️ **Attukal Temple** - Famous for festivals\n🌿 **Ayurvedic Centers** - Wellness trending (+67%)\n🎭 **Cultural Shows** - Traditional performances\n\nWhich spiritual experience calls to you?`,
        suggestions: [
          "Temple architecture tour",
          "Ayurvedic wellness trip",
          "Cultural festival timing",
          "Spiritual retreat planning",
        ],
      }
    }

    // Default responses with local context
    const responses = [
      {
        content: `Great question! 🤔 Right now I'm seeing huge interest in Ayurvedic treatments (+67% mentions). Want me to suggest wellness destinations around Trivandrum?`,
        suggestions: [
          "Ayurvedic spa recommendations",
          "Wellness retreat options",
          "Traditional treatment centers",
          "Yoga and meditation spots",
        ],
      },
      {
        content: `Based on current trends, beach destinations are up 45%! Are you interested in coastal spots that are Instagram-worthy too?`,
        suggestions: [
          "Best beach photography spots",
          "Coastal village experiences",
          "Sunset viewing points",
          "Water sports activities",
        ],
      },
      {
        content: `I'm tracking some amazing local deals right now! Off-season bookings for Kerala destinations can save you 40-60%. Want personalized recommendations?`,
        suggestions: ["Off-season Kerala deals", "Best booking timing", "Price drop alerts", "Monsoon travel tips"],
      },
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue("")
    setIsTyping(true)

    // Simulate AI typing and response
    setTimeout(() => {
      setIsTyping(false)
      const response = getResponse(currentInput)
      const aiResponse = {
        id: messages.length + 2,
        type: "ai",
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions,
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1500)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
    handleSendMessage()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 md:p-8">
      <Card className="w-full max-w-md h-[500px] backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">AI Travel Assistant</h3>
              <p className="text-xs text-green-400 flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                Tracking trends live
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex items-start space-x-2 max-w-[85%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === "user"
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                        : "bg-gradient-to-r from-purple-500 to-pink-500"
                    }`}
                  >
                    {message.type === "user" ? (
                      <User className="w-3 h-3 text-white" />
                    ) : (
                      <Sparkles className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.type === "user"
                        ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30"
                        : "bg-white/10 border border-white/20"
                    }`}
                  >
                    <p className="text-white text-sm whitespace-pre-line">{message.content}</p>

                    {/* Suggestions */}
                    {message.suggestions && message.type === "ai" && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs text-gray-400">Quick suggestions:</p>
                        <div className="flex flex-wrap gap-1">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              size="sm"
                              variant="outline"
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-xs h-6 px-2 border-purple-400/30 text-purple-300 hover:bg-purple-500/20"
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-[85%]">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-purple-500 to-cyan-500">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <div className="rounded-lg p-3 bg-white/10 border border-white/20">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Trending Info Bar */}
        <div className="px-4 py-2 border-t border-white/10 bg-gradient-to-r from-purple-500/10 to-cyan-500/10">
          <div className="flex items-center space-x-2 text-xs">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span className="text-green-400">Live:</span>
            <span className="text-white">Kovalam +45%</span>
            <span className="text-gray-400">•</span>
            <span className="text-white">Varkala +52%</span>
            <span className="text-gray-400">•</span>
            <span className="text-white">Temples +38%</span>
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about Kerala destinations..."
              className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              size="sm"
              className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
