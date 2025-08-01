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
      return "I can help optimize your itinerary! Based on current trends, I see Santorini sunsets are viral right now (+45% searches). Want me to suggest trending activities for your trip?"
    case "expenses":
      return "Let me help you budget smarter! I notice eco-tourism is trending (+41% interest). Costa Rica could be a great budget-friendly option. Want cost comparisons?"
    case "emergency":
      return "Safety first! I have real-time updates on travel advisories. Currently, Japan has excellent safety ratings and cherry blossom season is trending. Need specific safety info?"
    case "history":
      return "Looking at your amazing travel history! I see you loved Tokyo and Paris. Based on social trends, Kyoto is having a moment (+38% searches) - perfect for your Japan love!"
    default:
      return "Hey there! 🌟 I'm seeing some exciting travel trends right now. Santorini is absolutely viral (+45% searches), and Iceland's Northern Lights content is everywhere! What's your next adventure?"
  }
}

const getTrendingSuggestions = () => {
  return [
    "🔥 Show me trending destinations",
    "📱 What's viral on social media?",
    "💰 Budget-friendly trending spots",
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

  // Trending places and social media data
  const trendingDestinations = [
    { name: "Santorini, Greece", trend: "+45%", reason: "Viral sunset photos on Instagram" },
    { name: "Kyoto, Japan", trend: "+38%", reason: "Cherry blossom season trending on TikTok" },
    { name: "Iceland", trend: "+52%", reason: "Northern Lights content going viral" },
    { name: "Dubai, UAE", trend: "+29%", reason: "Luxury travel influencers" },
    { name: "Costa Rica", trend: "+41%", reason: "Eco-tourism trending on social media" },
  ]

  const socialMediaTrends = [
    "🔥 #SantoriniSunset has 2.3M posts this week",
    "📈 'Digital nomad destinations' searches up 67%",
    "🌸 Cherry blossom content peaked at 5.2M interactions",
    "✈️ 'Sustainable travel' mentions increased 43%",
    "🏝️ Island hopping videos trending on TikTok",
  ]

  const getSmartResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase()

    if (message.includes("trending") || message.includes("popular") || message.includes("viral")) {
      return {
        content: `Here are the hottest destinations right now! 🔥\n\n${trendingDestinations
          .map((dest) => `📍 **${dest.name}** (${dest.trend})\n   ${dest.reason}`)
          .join("\n\n")}\n\nWhich one catches your eye? I can create a personalized itinerary!`,
        suggestions: [
          "Plan Santorini trip",
          "Iceland Northern Lights tour",
          "Japan cherry blossoms",
          "Dubai luxury experience",
        ],
      }
    }

    if (message.includes("social media") || message.includes("instagram") || message.includes("tiktok")) {
      return {
        content: `Here's what's trending on social media right now! 📱\n\n${socialMediaTrends.join("\n")}\n\nThese trends can help you plan Instagram-worthy trips and discover hidden gems before they get too crowded!`,
        suggestions: [
          "Plan viral-worthy trip",
          "Hidden gems before crowds",
          "Best photo spots",
          "Social media travel tips",
        ],
      }
    }

    if (message.includes("budget") || message.includes("cheap") || message.includes("affordable")) {
      return {
        content: `Smart budgeting! 💰 Based on current trends:\n\n🌿 **Costa Rica** - Eco-tourism trending (+41%), great value\n🏛️ **Greece** - Off-season deals, viral potential\n🍜 **Vietnam** - Food scene exploding on social media\n🏔️ **Nepal** - Adventure travel trending, budget-friendly\n\nI can create detailed budget breakdowns for any of these!`,
        suggestions: [
          "Costa Rica eco-trip budget",
          "Greece off-season deals",
          "Vietnam food tour costs",
          "Nepal adventure budget",
        ],
      }
    }

    if (message.includes("japan") || message.includes("tokyo") || message.includes("kyoto")) {
      return {
        content: `Perfect timing for Japan! 🌸 Cherry blossom season is trending massively on TikTok (5.2M interactions). Based on your Tokyo trip history:\n\n🏯 **Kyoto** - Traditional temples, trending +38%\n🗾 **Osaka** - Food scene viral on social media\n🏔️ **Hakone** - Mt. Fuji views, Instagram gold\n\nWant me to plan a Japan return trip with trending spots?`,
        suggestions: [
          "Plan Kyoto temple tour",
          "Osaka food adventure",
          "Mt. Fuji photo spots",
          "Japan cherry blossom timing",
        ],
      }
    }

    if (message.includes("europe") || message.includes("paris") || message.includes("barcelona")) {
      return {
        content: `Europe is having a moment! ✨ Based on your Paris and Barcelona experiences:\n\n🇬🇷 **Santorini** - Most viral destination (+45%)\n🇮🇸 **Iceland** - Northern Lights content exploding\n🇵🇹 **Portugal** - Hidden gem before it gets too popular\n🇭🇷 **Croatia** - Coastal beauty trending\n\nWhich European adventure calls to you?`,
        suggestions: [
          "Santorini sunset trip",
          "Iceland Northern Lights",
          "Portugal hidden gems",
          "Croatia island hopping",
        ],
      }
    }

    // Default responses with trending context
    const responses = [
      {
        content: `Great question! 🤔 Right now I'm seeing huge interest in sustainable travel (+43% mentions). Want me to suggest eco-friendly destinations that are also trending?`,
        suggestions: [
          "Eco-friendly trending spots",
          "Sustainable travel tips",
          "Green destinations",
          "Carbon-neutral trips",
        ],
      },
      {
        content: `Based on current social media trends, digital nomad destinations are up 67%! Are you interested in workation spots that are Instagram-worthy too?`,
        suggestions: [
          "Best workation spots",
          "Digital nomad trending cities",
          "Work-friendly cafes",
          "Nomad visa countries",
        ],
      },
      {
        content: `I'm tracking some amazing travel deals right now! Off-season bookings for trending destinations can save you 40-60%. Want personalized recommendations?`,
        suggestions: ["Off-season trending deals", "Best booking timing", "Price drop alerts", "Seasonal travel tips"],
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
      const response = getSmartResponse(currentInput)
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
            <span className="text-white">Santorini +45%</span>
            <span className="text-gray-400">•</span>
            <span className="text-white">Iceland +52%</span>
            <span className="text-gray-400">•</span>
            <span className="text-white">Kyoto +38%</span>
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about trending destinations..."
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
