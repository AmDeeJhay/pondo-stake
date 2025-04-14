"use client"

import { Clock, ArrowUpRight, ArrowDownRight, Repeat } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface WalletAnalyticsProps {
  userData: {
    id: string
    name: string
    email: string
    walletBalance: number
  }
}

export function WalletAnalytics({ userData }: WalletAnalyticsProps) {
  // Mock data for wallet analytics
  const walletData = {
    lastClaim: "2023-06-15T14:30:00Z",
    averageReward: 25.8,
    stakingActions: [
      { type: "stake", amount: 200, date: "2023-06-01T10:15:00Z" },
      { type: "claim", amount: 45, date: "2023-06-15T14:30:00Z" },
      { type: "stake", amount: 150, date: "2023-05-20T09:45:00Z" },
    ],
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  // Calculate time since last claim
  const getTimeSince = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    if (diffDays > 0) {
      return `${diffDays}d ${diffHours}h ago`
    } else {
      return `${diffHours}h ago`
    }
  }

  return (
    <Card className="border bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Wallet Analytics
        </CardTitle>
        <CardDescription>Your staking activity breakdown</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Last Claim</div>
                  <div className="font-medium">{getTimeSince(walletData.lastClaim)}</div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Last claimed on {formatDate(walletData.lastClaim)}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Avg. Daily Reward</div>
                  <div className="font-medium">{walletData.averageReward.toFixed(1)} PNDO</div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Average daily PNDO rewards over the last 30 days</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div>
          <div className="text-sm font-medium mb-2">Recent Activity</div>
          <div className="space-y-3">
            {walletData.stakingActions.map((action, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  {action.type === "stake" ? (
                    <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  ) : action.type === "unstake" ? (
                    <div className="h-8 w-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                      <ArrowDownRight className="h-4 w-4" />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                      <Repeat className="h-4 w-4" />
                    </div>
                  )}
                  <div>
                    <div className="font-medium capitalize">{action.type}</div>
                    <div className="text-xs text-muted-foreground">{formatDate(action.date)}</div>
                  </div>
                </div>
                <div className="font-medium">
                  {action.type === "stake" ? "+" : action.type === "unstake" ? "-" : ""}
                  {action.amount} {action.type === "claim" ? "PNDO" : "ALEO"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
