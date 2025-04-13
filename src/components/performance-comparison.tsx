"use client"

import { useState } from "react"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { mockPerformanceData } from "@/lib/mock-data"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export function PerformanceComparison() {
  const [timeRange, setTimeRange] = useState("30d")

  // Filter data based on selected time range
  const filteredData = mockPerformanceData.slice(
    timeRange === "7d" ? -7 : timeRange === "30d" ? -30 : timeRange === "90d" ? -90 : -365,
  )

  // Calculate difference between pALEO and ALEO APR
  const latestData = filteredData[filteredData.length - 1]
  const aprDifference = latestData.pAleoApr - latestData.aleoApr
  const profitDifference = latestData.pAleoProfit - latestData.aleoProfit

  return (
    <Card className="border bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>pALEO vs ALEO Performance</CardTitle>
            <CardDescription>Compare the performance of direct ALEO staking vs. pALEO liquid staking</CardDescription>
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
        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="pb-2 pt-0">
              <CardDescription>pALEO APR</CardDescription>
              <CardTitle className="text-2xl">{latestData.pAleoApr.toFixed(2)}%</CardTitle>
            </CardHeader>
            <CardContent className="pb-0 pt-0">
              <div className="flex items-center gap-1 text-xs">
                {aprDifference >= 0 ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500" />
                )}
                <span className={aprDifference >= 0 ? "text-green-500" : "text-red-500"}>
                  {aprDifference >= 0 ? "+" : ""}
                  {aprDifference.toFixed(2)}%
                </span>
                <span className="text-muted-foreground">vs. ALEO</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="pb-2 pt-0">
              <CardDescription>ALEO APR</CardDescription>
              <CardTitle className="text-2xl">{latestData.aleoApr.toFixed(2)}%</CardTitle>
            </CardHeader>
            <CardContent className="pb-0 pt-0">
              <div className="flex items-center gap-1 text-xs">
                <span className="text-muted-foreground">Base network staking rate</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="pb-2 pt-0">
              <CardDescription>Profit Difference</CardDescription>
              <CardTitle className="text-2xl">{profitDifference.toFixed(2)}%</CardTitle>
            </CardHeader>
            <CardContent className="pb-0 pt-0">
              <div className="flex items-center gap-1 text-xs">
                <span className="text-muted-foreground">Additional profit with pALEO</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="apr">
          <TabsList className="mb-4">
            <TabsTrigger value="apr">APR Comparison</TabsTrigger>
            <TabsTrigger value="profit">Profit Projection</TabsTrigger>
          </TabsList>
          <TabsContent value="apr">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="date" />
                  <YAxis unit="%" />
                  <Tooltip
                    formatter={(value: number) => [`${value.toFixed(2)}%`, ""]}
                    labelFormatter={(label) => `Date: ${label}`}
                    contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="pAleoApr"
                    name="pALEO APR"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="aleoApr"
                    name="ALEO APR"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="profit">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="date" />
                  <YAxis unit="%" />
                  <Tooltip
                    formatter={(value: number) => [`${value.toFixed(2)}%`, ""]}
                    labelFormatter={(label) => `Date: ${label}`}
                    contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="pAleoProfit"
                    name="pALEO Profit"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="aleoProfit"
                    name="ALEO Profit"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
