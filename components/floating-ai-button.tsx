"use client"

import { MessageCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FloatingAIButtonProps {
  onClick: () => void
}

export function FloatingAIButton({ onClick }: FloatingAIButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-24 right-6 md:bottom-8 md:right-8 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 shadow-2xl z-40 group"
    >
      <div className="relative">
        <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-bounce">
          <Sparkles className="w-2 h-2" />
        </div>
      </div>
    </Button>
  )
}
