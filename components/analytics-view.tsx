"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function AnalyticsView() {
  const [timeRange, setTimeRange] = useState("30d")

  // Mock data for analytics
  const performanceData = [
    { name: "Jan", aleo: 4000, paleo: 4400, pndo: 2400 },
    { name: "Feb", aleo: 3000, paleo: 3398, pndo: 2210 },
    { name: "Mar", aleo: 2000, paleo: 2800, pndo: 2290 },
    { name: "Apr", aleo: 2780, paleo: 3908, pndo: 2000 },
    { name: "May", aleo: 1890, paleo: 4800, pndo: 2181 },
    { name: "Jun", aleo: 2390, paleo: 3800, pndo: 2500 },
    { name: "Jul", aleo: 3490, paleo: 4300, pndo: 2100 },
  ]

  const stakingDistribution = [
    { name: "1-100 ALEO", value: 400 },
    { name: "101-1000 ALEO", value: 300 },
    { name: "1001-10000 ALEO", value: 200 },
    { name: "10000+ ALEO", value: 100 },
  ]

  const COLORS = ["#ff7b00", "#ff9f45", "#ffbc80", "#ffd9b7"]

  const rewardHistory = [
    { date: "Week 1", rewards: 120 },
    { date: "Week 2", rewards: 145 },
    { date: "Week 3", rewards: 132 },
    { date: "Week 4", rewards: 165 },
    { date: "Week 5", rewards: 178 },
    { date: "Week 6", rewards: 190 },
    { date: "Week 7", rewards: 210 },
    { date: "Week 8", rewards: 205 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <ToggleGroup type="single" value={timeRange} onValueChange={(value) => value && setTimeRange(value)}>
          <ToggleGroupItem value="7d">7D</ToggleGroupItem>
          <ToggleGroupItem value="30d">30D</ToggleGroupItem>
          <ToggleGroupItem value="90d">90D</ToggleGroupItem>
          <ToggleGroupItem value="1y">1Y</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Performance Comparison</CardTitle>
            <CardDescription>Compare ALEO, pALEO, and PNDO performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))" }} />
                  <Legend />
                  <Line type="monotone" dataKey="aleo" name="ALEO" stroke="#8884d8" />
                  <Line type="monotone" dataKey="paleo" name="pALEO" stroke="#ff7b00" />
                  <Line type="monotone" dataKey="pndo" name="PNDO" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Staking Distribution</CardTitle>
            <CardDescription>Distribution of stakers by ALEO amount</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stakingDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {stakingDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Reward History</CardTitle>
          <CardDescription>Your PNDO rewards over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rewardHistory}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))" }} />
                <Legend />
                <Bar dataKey="rewards" name="PNDO Rewards" fill="#ff7b00" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="daily">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily">Daily Stats</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Stats</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Stats</TabsTrigger>
        </TabsList>
        <TabsContent value="daily" className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Daily Rewards</CardDescription>
                <CardTitle className="text-2xl">24.5 PNDO</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>APR (24h avg)</CardDescription>
                <CardTitle className="text-2xl">12.8%</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Network Activity</CardDescription>
                <CardTitle className="text-2xl">High</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="weekly" className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Weekly Rewards</CardDescription>
                <CardTitle className="text-2xl">178.3 PNDO</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>APR (7d avg)</CardDescription>
                <CardTitle className="text-2xl">13.2%</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Network Activity</CardDescription>
                <CardTitle className="text-2xl">Medium</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="monthly" className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Monthly Rewards</CardDescription>
                <CardTitle className="text-2xl">745.2 PNDO</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>APR (30d avg)</CardDescription>
                <CardTitle className="text-2xl">12.5%</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Network Activity</CardDescription>
                <CardTitle className="text-2xl">Increasing</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
