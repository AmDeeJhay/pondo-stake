"use client"

import { useState, useEffect } from "react"
import { Flame } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function PndoBurnCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Set a future date for the next burn event
  useEffect(() => {
    // Set the burn date to 7 days from now
    const burnDate = new Date()
    burnDate.setDate(burnDate.getDate() + 7)

    const interval = setInterval(() => {
      const now = new Date()
      const difference = burnDate.getTime() - now.getTime()

      if (difference <= 0) {
        clearInterval(interval)
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="border bg-card/50 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-primary animate-pulse" />
          <div>
            <div className="text-sm font-medium">Next PNDO Burn Event</div>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <span className="font-bold">{timeLeft.days}</span>
                <span className="text-muted-foreground">d</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold">{timeLeft.hours}</span>
                <span className="text-muted-foreground">h</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold">{timeLeft.minutes}</span>
                <span className="text-muted-foreground">m</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold">{timeLeft.seconds}</span>
                <span className="text-muted-foreground">s</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
