"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { mockYieldData } from "@/lib/mock-data"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function YieldTrendChart() {
  const [timeRange, setTimeRange] = useState("30d")

  // Filter data based on selected time range
  const filteredData = mockYieldData.slice(
    timeRange === "7d" ? -7 : timeRange === "30d" ? -30 : timeRange === "90d" ? -90 : -365,
  )

  return (
    <Card className="border bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>PNDO Yield Trends</CardTitle>
            <CardDescription>Track your daily and weekly PNDO earnings over time</CardDescription>
          </div>
          <ToggleGroup type="single" value={timeRange} onValueChange={(value) => value && setTimeRange(value)}>
            <ToggleGroupItem value="7d">7D</ToggleGroupItem>
            <ToggleGroupItem value="30d">30D</ToggleGroupItem>
            <ToggleGroupItem value="90d">90D</ToggleGroupItem>
            <ToggleGroupItem value="1y">1Y</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => [`${value.toFixed(2)} PNDO`, ""]}
                labelFormatter={(label) => `Date: ${label}`}
                contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}
              />
              <defs>
                <linearGradient id="dailyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="cumulativeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="dailyEarnings"
                name="Daily Earnings"
                stroke="hsl(var(--primary))"
                fill="url(#dailyGradient)"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="cumulativeEarnings"
                name="Cumulative Earnings"
                stroke="#82ca9d"
                fill="url(#cumulativeGradient)"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
