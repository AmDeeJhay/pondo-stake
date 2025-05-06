"use client"

import { useState } from "react"
import { ArrowUpRight, ArrowDownRight, TrendingUp, Wallet } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PortfolioOverviewProps {
  userData: any
  className?: string
}

export function PortfolioOverview({ userData, className }: PortfolioOverviewProps) {
  const [view, setView] = useState("grid")

  return (
    <Card className={`border bg-card/50 backdrop-blur-sm ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-primary" />
            <CardTitle>Portfolio Overview</CardTitle>
          </div>
          <Tabs value={view} onValueChange={setView} className="hidden sm:block">
            <TabsList className="h-8">
              <TabsTrigger value="grid" className="h-7 px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
              </TabsTrigger>
              <TabsTrigger value="chart" className="h-7 px-3">
                <TrendingUp className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <CardDescription>Track your staking performance and rewards</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={view} onValueChange={setView}>
          <TabsContent value="grid" className="mt-0 space-y-0">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-none shadow-none bg-transparent">
                <CardHeader className="pb-2 pt-4">
                  <CardDescription>Staked ALEO</CardDescription>
                  <CardTitle className="text-2xl">{userData.stakedAleo.toLocaleString()} ALEO</CardTitle>
                </CardHeader>
                <CardContent className="pb-4 pt-0">
                  <div className="text-xs text-muted-foreground">{userData.stakedPercentage}% of your total ALEO</div>
                  <Progress value={userData.stakedPercentage} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="border-none shadow-none bg-transparent">
                <CardHeader className="pb-2 pt-4">
                  <CardDescription >pALEO Balance</CardDescription>
                  <CardTitle className="text-2xl">{userData.pAleoBalance.toLocaleString()} pALEO</CardTitle>
                </CardHeader>
                <CardContent className="pb-4 pt-0">
                  <div className="flex items-center text-xs">
                    <span className={userData.pAleoRatio >= 1 ? "text-green-500" : "text-amber-500"}>
                      1 pALEO = {userData.pAleoRatio} ALEO
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-none bg-transparent">
                <CardHeader className="pb-2 pt-4">
                  <CardDescription>PNDO Rewards</CardDescription>
                  <CardTitle className="text-2xl">{userData.pndoRewards.toLocaleString()} PNDO</CardTitle>
                </CardHeader>
                <CardContent className="pb-4 pt-0">
                  <div className="flex items-center gap-1 text-xs">
                    <ArrowUpRight className="h-3 w-3 text-green-500" />
                    <span className="text-green-500">+{userData.pndoRewardsDaily.toLocaleString()}</span>
                    <span className="text-muted-foreground">daily</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-none bg-transparent">
                <CardHeader className="pb-2 pt-4">
                  <CardDescription>Total Staking ROI</CardDescription>
                  <CardTitle className="text-2xl">{userData.stakingRoi}%</CardTitle>
                </CardHeader>
                <CardContent className="pb-4 pt-0">
                  <div className="flex items-center gap-1 text-xs">
                    {userData.stakingRoiChange >= 0 ? (
                      <ArrowUpRight className="h-3 w-3 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-red-500" />
                    )}
                    <span className={userData.stakingRoiChange >= 0 ? "text-green-500" : "text-red-500"}>
                      {userData.stakingRoiChange >= 0 ? "+" : ""}
                      {userData.stakingRoiChange}%
                    </span>
                    <span className="text-muted-foreground">past 30 days</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="chart" className="mt-0 space-y-0">
            <div className="h-[200px] w-full">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">Portfolio Value Over Time</div>
                  <div className="h-[150px] w-full">
                    <svg viewBox="0 0 100 20" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,10 Q5,8 10,9 T20,7 T30,6 T40,8 T50,7 T60,9 T70,8 T80,6 T90,5 T100,3"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="0.5"
                      />
                      <path
                        d="M0,10 Q5,8 10,9 T20,7 T30,6 T40,8 T50,7 T60,9 T70,8 T80,6 T90,5 T100,3 V20 H0 Z"
                        fill="url(#gradient)"
                      />
                      {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((x, i) => (
                        <g key={i}>
                          <text
                            x={x}
                            y="22"
                            fontSize="2"
                            textAnchor="middle"
                            fill="currentColor"
                            className="text-muted-foreground"
                          >
                            {i === 0 ? "Jan" : i === 5 ? "Jun" : i === 10 ? "Dec" : ""}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
