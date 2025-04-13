"use client"

import { useState } from "react"
import { Flame, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts"

export function PndoUtilityView() {
  const [burnAmount, setBurnAmount] = useState("")
  const [isBurning, setIsBurning] = useState(false)

  // Mock user data
  const userData = {
    pndoBalance: 2500,
    totalBurned: 1200,
    stakingBoost: 2.5, // % boost from burning
  }

  // Mock burn history data
  const burnHistory = [
    { date: "Jan", amount: 150 },
    { date: "Feb", amount: 180 },
    { date: "Mar", amount: 220 },
    { date: "Apr", amount: 310 },
    { date: "May", amount: 280 },
    { date: "Jun", amount: 350 },
    { date: "Jul", amount: 420 },
  ]

  // Mock APR boost data
  const boostData = [
    { pndo: 0, boost: 0 },
    { pndo: 100, boost: 0.5 },
    { pndo: 200, boost: 1.0 },
    { pndo: 300, boost: 1.5 },
    { pndo: 400, boost: 2.0 },
    { pndo: 500, boost: 2.5 },
    { pndo: 600, boost: 3.0 },
    { pndo: 700, boost: 3.5 },
    { pndo: 800, boost: 4.0 },
    { pndo: 900, boost: 4.5 },
    { pndo: 1000, boost: 5.0 },
  ]

  const handleBurn = () => {
    setIsBurning(true)
    // Simulate burning process
    setTimeout(() => {
      setIsBurning(false)
      setBurnAmount("")
    }, 2000)
  }

  const setMaxBurn = () => {
    setBurnAmount(userData.pndoBalance.toString())
  }

  // Calculate estimated boost based on burn amount
  const calculateBoost = () => {
    if (!burnAmount || Number.parseFloat(burnAmount) <= 0) return 0
    return Number.parseFloat(burnAmount) * 0.005 // 0.005% boost per PNDO
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardDescription>PNDO Balance</CardDescription>
            <CardTitle className="text-2xl">{userData.pndoBalance.toLocaleString()} PNDO</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">Available for burning</div>
          </CardContent>
        </Card>

        <Card className="border bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardDescription>Total PNDO Burned</CardDescription>
            <CardTitle className="text-2xl">{userData.totalBurned.toLocaleString()} PNDO</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">Permanently removed from circulation</div>
          </CardContent>
        </Card>

        <Card className="border bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardDescription>Current APR Boost</CardDescription>
            <CardTitle className="text-2xl">+{userData.stakingBoost}%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">Added to your base staking APR</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="burn">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="burn">Burn PNDO</TabsTrigger>
          <TabsTrigger value="history">Burn History</TabsTrigger>
          <TabsTrigger value="calculator">Boost Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="burn" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Burn PNDO Tokens</CardTitle>
              <CardDescription>Burn PNDO tokens to increase your staking rewards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Amount to Burn</label>
                  <span className="text-sm text-muted-foreground">
                    Balance: {userData.pndoBalance.toLocaleString()} PNDO
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={burnAmount}
                    onChange={(e) => setBurnAmount(e.target.value)}
                  />
                  <Button variant="outline" onClick={setMaxBurn}>
                    Max
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium">Estimated APR Boost</div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Burning PNDO permanently increases your staking APR</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="p-4 rounded-md bg-muted/50">
                  <div className="text-2xl font-bold text-primary">+{calculateBoost().toFixed(2)}%</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Added to your current boost of {userData.stakingBoost}%
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Important Information</div>
                <div className="text-xs text-muted-foreground space-y-2">
                  <p>• Burning PNDO is permanent and cannot be reversed</p>
                  <p>• The APR boost is applied to your staked ALEO</p>
                  <p>• The boost remains active as long as you have staked ALEO</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleBurn}
                disabled={
                  !burnAmount ||
                  isBurning ||
                  Number.parseFloat(burnAmount) <= 0 ||
                  Number.parseFloat(burnAmount) > userData.pndoBalance
                }
              >
                {isBurning ? (
                  <div className="flex items-center">
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                    Burning...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Flame className="mr-2 h-4 w-4" />
                    Burn PNDO
                  </div>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Burn History</CardTitle>
              <CardDescription>Track your PNDO burning activity over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={burnHistory}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <RechartsTooltip
                      formatter={(value) => [`${value} PNDO`, "Amount Burned"]}
                      contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}
                    />
                    <Bar dataKey="amount" name="PNDO Burned" fill="#ff7b00" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 space-y-4">
                <div className="text-sm font-medium">Burn Statistics</div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground">Total Burned</div>
                    <div className="text-lg font-bold">{userData.totalBurned.toLocaleString()} PNDO</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Highest Month</div>
                    <div className="text-lg font-bold">420 PNDO</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Total APR Boost</div>
                    <div className="text-lg font-bold">+{userData.stakingBoost}%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculator" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>APR Boost Calculator</CardTitle>
              <CardDescription>Calculate how much PNDO to burn for your desired APR boost</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={boostData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="pndo" label={{ value: "PNDO Burned", position: "insideBottom", offset: -5 }} />
                    <YAxis label={{ value: "APR Boost (%)", angle: -90, position: "insideLeft" }} />
                    <RechartsTooltip
                      formatter={(value) => [`${value}%`, "APR Boost"]}
                      labelFormatter={(value) => `${value} PNDO`}
                      contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}
                    />
                    <Line type="monotone" dataKey="boost" stroke="#ff7b00" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Target APR Boost</label>
                    <span className="text-sm font-medium">
                      +{(Number.parseFloat(burnAmount) * 0.005 || 0).toFixed(2)}%
                    </span>
                  </div>
                  <Slider
                    value={[Number.parseFloat(burnAmount) || 0]}
                    min={0}
                    max={1000}
                    step={10}
                    onValueChange={(value) => setBurnAmount(value[0].toString())}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>5%</span>
                  </div>
                </div>

                <div className="p-4 rounded-md bg-muted/50">
                  <div className="text-sm font-medium mb-2">Required PNDO to Burn</div>
                  <div className="text-2xl font-bold">{burnAmount || 0} PNDO</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    For a +{(Number.parseFloat(burnAmount) * 0.005 || 0).toFixed(2)}% APR boost
                  </div>
                </div>

                <div className="text-xs text-muted-foreground space-y-2">
                  <p>• Each PNDO burned provides approximately 0.005% APR boost</p>
                  <p>• The boost is applied to your entire staked ALEO balance</p>
                  <p>• Burning more PNDO provides diminishing returns at higher levels</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleBurn}
                disabled={
                  !burnAmount ||
                  isBurning ||
                  Number.parseFloat(burnAmount) <= 0 ||
                  Number.parseFloat(burnAmount) > userData.pndoBalance
                }
              >
                <div className="flex items-center">
                  <Flame className="mr-2 h-4 w-4" />
                  Burn {burnAmount || 0} PNDO
                </div>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
