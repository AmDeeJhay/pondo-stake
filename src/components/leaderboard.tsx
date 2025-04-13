"use client"

import { Trophy, ArrowUp, ArrowDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function Leaderboard() {
  // Mock data for leaderboard
  const topEarners = [
    { rank: 1, address: "aleo1abc...def", rewards: 12500, change: 2 },
    { rank: 2, address: "aleo1ghi...jkl", rewards: 10200, change: -1 },
    { rank: 3, address: "aleo1mno...pqr", rewards: 9800, change: 1 },
    { rank: 4, address: "aleo1stu...vwx", rewards: 8500, change: 0 },
    { rank: 5, address: "aleo1yza...bcd", rewards: 7200, change: -2 },
  ]

  const longestStakers = [
    { rank: 1, address: "aleo1def...ghi", days: 365, amount: 5000 },
    { rank: 2, address: "aleo1jkl...mno", days: 320, amount: 3200 },
    { rank: 3, address: "aleo1pqr...stu", days: 290, amount: 4100 },
    { rank: 4, address: "aleo1vwx...yza", days: 275, amount: 2800 },
    { rank: 5, address: "aleo1bcd...efg", days: 260, amount: 3600 },
  ]

  // Generate random avatar colors
  const getAvatarColor = (address: string) => {
    const colors = ["bg-primary", "bg-purple-500", "bg-blue-500", "bg-green-500", "bg-amber-500"]
    const index = Number.parseInt(address.slice(-1), 16) % colors.length
    return colors[index]
  }

  // Get initials from address
  const getInitials = (address: string) => {
    return address.slice(4, 6).toUpperCase()
  }

  return (
    <Card className="border bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Leaderboard
        </CardTitle>
        <CardDescription>Top stakers in the Pondo ecosystem</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="earnings">
          <TabsList className="w-full">
            <TabsTrigger value="earnings">Top Earners</TabsTrigger>
            <TabsTrigger value="streak">Longest Stakers</TabsTrigger>
          </TabsList>
          <TabsContent value="earnings" className="pt-4">
            <div className="space-y-4">
              {topEarners.map((staker) => (
                <div key={staker.rank} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 text-center font-medium">{staker.rank}</div>
                    <Avatar className={`h-8 w-8 ${getAvatarColor(staker.address)}`}>
                      <AvatarFallback>{getInitials(staker.address)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{staker.address}</div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        {staker.change > 0 ? (
                          <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
                        ) : staker.change < 0 ? (
                          <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
                        ) : null}
                        {staker.change !== 0 ? (
                          <span className={staker.change > 0 ? "text-green-500" : "text-red-500"}>
                            {Math.abs(staker.change)} position{Math.abs(staker.change) > 1 ? "s" : ""}
                          </span>
                        ) : (
                          <span>No change</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{staker.rewards.toLocaleString()} PNDO</div>
                    <div className="text-xs text-muted-foreground">Total Earned</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="streak" className="pt-4">
            <div className="space-y-4">
              {longestStakers.map((staker) => (
                <div key={staker.rank} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 text-center font-medium">{staker.rank}</div>
                    <Avatar className={`h-8 w-8 ${getAvatarColor(staker.address)}`}>
                      <AvatarFallback>{getInitials(staker.address)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{staker.address}</div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        {staker.amount.toLocaleString()} ALEO staked
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{staker.days} days</div>
                    <div className="text-xs text-muted-foreground">
                      {staker.days > 365 ? (
                        <Badge variant="outline" className="ml-1 bg-primary/10 text-primary">
                          1Y+
                        </Badge>
                      ) : staker.days > 180 ? (
                        <Badge variant="outline" className="ml-1 bg-blue-500/10 text-blue-500">
                          6M+
                        </Badge>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
