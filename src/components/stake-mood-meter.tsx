"use client"

import { useState, useEffect } from "react"
import { Gauge } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function StakeMoodMeter() {
  const [mood, setMood] = useState<"bearish" | "neutral" | "bullish" | "hot">("neutral")
  const [moodEmoji, setMoodEmoji] = useState("😐")
  const [moodText, setMoodText] = useState("Neutral")

  // Simulate mood changes
  useEffect(() => {
    const interval = setInterval(() => {
      const moods: Array<"bearish" | "neutral" | "bullish" | "hot"> = ["bearish", "neutral", "bullish", "hot"]
      const randomMood = moods[Math.floor(Math.random() * moods.length)]
      setMood(randomMood)

      switch (randomMood) {
        case "bearish":
          setMoodEmoji("🐻")
          setMoodText("Bearish")
          break
        case "neutral":
          setMoodEmoji("😐")
          setMoodText("Neutral")
          break
        case "bullish":
          setMoodEmoji("🐂")
          setMoodText("Bullish")
          break
        case "hot":
          setMoodEmoji("🔥")
          setMoodText("Hot Zone")
          break
      }
    }, 15000) // Change mood every 15 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="border bg-card/50 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Gauge className="h-4 w-4 text-primary" />
          <div className="text-sm font-medium">Stake Mood Meter</div>
        </div>
        <div className="flex items-center justify-center py-2">
          <div className="text-4xl">{moodEmoji}</div>
        </div>
        <div
          className={`text-center text-sm font-medium ${
            mood === "bearish"
              ? "text-red-500"
              : mood === "bullish"
                ? "text-green-500"
                : mood === "hot"
                  ? "text-amber-500"
                  : "text-muted-foreground"
          }`}
        >
          {moodText}
        </div>
      </CardContent>
    </Card>
  )
}
