"use client"

import { useState, useEffect } from "react"
import { Calculator } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function RewardSimulator() {
  const [stakeAmount, setStakeAmount] = useState(1000)
  const [stakeDuration] = useState(30)
  const [pndoBurn, setPndoBurn] = useState(0)
  interface SimulationData {
    day: number
    rewards: number
    cumulative: number
  }

  const [simulationData, setSimulationData] = useState<SimulationData[]>([])
  const [timeframe, setTimeframe] = useState("30d")

  // Calculate rewards based on inputs
  useEffect(() => {
    const baseApr = 12.5
    const burnBoost = pndoBurn * 0.01 // Each PNDO burned increases APR by 0.01%
    const effectiveApr = baseApr + burnBoost

    // Generate simulation data
    const data = []
    const days = timeframe === "7d" ? 7 : timeframe === "30d" ? 30 : timeframe === "90d" ? 90 : 365

    for (let day = 0; day <= days; day++) {
      const dailyReturn = effectiveApr / 365 / 100
      const rewards = stakeAmount * Math.pow(1 + dailyReturn, day) - stakeAmount

      data.push({
        day,
        rewards: Number.parseFloat(rewards.toFixed(2)),
        cumulative: Number.parseFloat((stakeAmount + rewards).toFixed(2)),
      })
    }

    setSimulationData(data)
  }, [stakeAmount, stakeDuration, pndoBurn, timeframe])

  // Calculate total rewards
  const totalRewards = simulationData.length > 0 ? simulationData[simulationData.length - 1].rewards : 0
  const effectiveApr = 12.5 + pndoBurn * 0.01

  return (
    <Card className="border bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Reward Forecast Simulator
        </CardTitle>
        <CardDescription>Simulate your potential staking rewards</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Stake Amount (ALEO)</label>
                <span className="text-sm font-medium">{stakeAmount.toLocaleString()}</span>
              </div>
              <Slider
                value={[stakeAmount]}
                min={100}
                max={10000}
                step={100}
                onValueChange={(value) => setStakeAmount(value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">PNDO Burn Amount</label>
                <span className="text-sm font-medium">{pndoBurn.toLocaleString()}</span>
              </div>
              <Slider
                value={[pndoBurn]}
                min={0}
                max={1000}
                step={10}
                onValueChange={(value) => setPndoBurn(value[0])}
              />
              <div className="text-xs text-muted-foreground">
                Burning PNDO increases your effective APR (+{(pndoBurn * 0.01).toFixed(2)}%)
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Timeframe</label>
              <ToggleGroup
                type="single"
                value={timeframe}
                onValueChange={(value) => value && setTimeframe(value)}
                className="justify-start"
              >
                <ToggleGroupItem value="7d">7D</ToggleGroupItem>
                <ToggleGroupItem value="30d">30D</ToggleGroupItem>
                <ToggleGroupItem value="90d">90D</ToggleGroupItem>
                <ToggleGroupItem value="1y">1Y</ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="rounded-lg border p-4 space-y-2">
              <div className="text-sm font-medium">Simulation Results</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">Effective APR</div>
                  <div className="text-2xl font-bold">{effectiveApr.toFixed(2)}%</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Total Rewards</div>
                  <div className="text-2xl font-bold">{totalRewards.toLocaleString()} ALEO</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Tabs defaultValue="rewards">
              <TabsList className="w-full">
                <TabsTrigger value="rewards">Rewards</TabsTrigger>
                <TabsTrigger value="balance">Total Balance</TabsTrigger>
              </TabsList>
              <TabsContent value="rewards" className="pt-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={simulationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" label={{ value: "Days", position: "insideBottom", offset: -5 }} />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} ALEO`, ""]} />
                      <Area
                        type="monotone"
                        dataKey="rewards"
                        name="Rewards"
                        stroke="#8884d8"
                        fill="url(#rewardsGradient)"
                      />
                      <defs>
                        <linearGradient id="rewardsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="balance" className="pt-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={simulationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" label={{ value: "Days", position: "insideBottom", offset: -5 }} />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} ALEO`, ""]} />
                      <Area
                        type="monotone"
                        dataKey="cumulative"
                        name="Total Balance"
                        stroke="#82ca9d"
                        fill="url(#balanceGradient)"
                      />
                      <defs>
                        <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
