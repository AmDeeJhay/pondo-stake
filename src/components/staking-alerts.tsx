"use client"

import { AlertCircle, ArrowUpRight, Flame, Bell } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { mockAlerts } from "@/lib/mock-data"

interface StakingAlertsProps {
  className?: string
}

export function StakingAlerts({ className }: StakingAlertsProps) {
  return (
    <Card className={`border bg-card/50 backdrop-blur-sm ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Staking Strategy Alerts
        </CardTitle>
        <CardDescription>Optimize your staking strategy with real-time alerts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockAlerts.map((alert, index) => (
          <Alert
            key={index}
            variant={alert.type === "warning" ? "destructive" : "default"}
            className={`border ${
              alert.type === "optimal"
                ? "border-green-500/50 bg-green-500/10"
                : alert.type === "burn"
                  ? "border-amber-500/50 bg-amber-500/10"
                  : "border-red-500/50 bg-red-500/10"
            }`}
          >
            {alert.type === "optimal" ? (
              <ArrowUpRight className={`h-4 w-4 ${alert.type === "optimal" ? "text-green-500" : ""}`} />
            ) : alert.type === "burn" ? (
              <Flame className={`h-4 w-4 ${alert.type === "burn" ? "text-amber-500" : ""}`} />
            ) : (
              <AlertCircle className={`h-4 w-4 ${alert.type === "warning" ? "text-red-500" : ""}`} />
            )}
            <AlertTitle
              className={`
              ${alert.type === "optimal" ? "text-green-500" : ""}
              ${alert.type === "burn" ? "text-amber-500" : ""}
              ${alert.type === "warning" ? "text-red-500" : ""}
            `}
            >
              {alert.title}
            </AlertTitle>
            <AlertDescription>{alert.description}</AlertDescription>
          </Alert>
        ))}
      </CardContent>
    </Card>
  )
}
