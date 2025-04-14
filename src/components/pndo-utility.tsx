/* eslint-disable react/no-unescaped-entities */
"use client"

import { Flame } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockPndoData } from "@/lib/mock-data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

export function PndoUtility() {
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-full md:col-span-1 border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-primary" />
            PNDO Tokenomics
          </CardTitle>
          <CardDescription>Track PNDO supply and utility metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Total Supply</div>
              <div className="text-2xl font-bold">{mockPndoData.totalSupply.toLocaleString()} PNDO</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Circulating Supply</div>
              <div className="text-2xl font-bold">{mockPndoData.circulatingSupply.toLocaleString()} PNDO</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Total Burned</div>
              <div className="text-2xl font-bold">{mockPndoData.totalBurned.toLocaleString()} PNDO</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Reward Pool</div>
              <div className="text-2xl font-bold">{mockPndoData.rewardPool.toLocaleString()} PNDO</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-full md:col-span-1 border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>PNDO Distribution</CardTitle>
          <CardDescription>Current allocation of PNDO tokens</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockPndoData.distribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {mockPndoData.distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value.toLocaleString()} PNDO`, ""]}
                  contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-full border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>PNDO Burn Activity</CardTitle>
          <CardDescription>Historical PNDO burn activity over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockPndoData.burnHistory}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`${value.toLocaleString()} PNDO`, ""]}
                  contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}
                />
                <defs>
                  <linearGradient id="burnGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <Bar dataKey="amount" fill="url(#burnGradient)" name="PNDO Burned" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-full border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>How PNDO Works</CardTitle>
          <CardDescription>Learn about PNDO utility and how it benefits you</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="burning">
            <TabsList>
              <TabsTrigger value="burning">PNDO Burning</TabsTrigger>
              <TabsTrigger value="rewards">Reward Mechanism</TabsTrigger>
              <TabsTrigger value="strategy">Optimal Strategy</TabsTrigger>
            </TabsList>
            <TabsContent value="burning" className="space-y-4 pt-4">
              <h3 className="text-lg font-medium">How PNDO Burning Works</h3>
              <p>
                PNDO tokens can be burned to increase your staking rewards. When you burn PNDO, you're effectively
                increasing your share of the reward pool without having to stake more ALEO.
              </p>
              <p>
                The burning mechanism creates a deflationary pressure on PNDO, potentially increasing its value over
                time as the supply decreases.
              </p>
            </TabsContent>
            <TabsContent value="rewards" className="space-y-4 pt-4">
              <h3 className="text-lg font-medium">PNDO Reward Mechanism</h3>
              <p>
                PNDO rewards are distributed based on your staked ALEO amount and your pALEO holdings. The more pALEO
                you hold, the more PNDO rewards you earn.
              </p>
              <p>
                Rewards are calculated daily and can be claimed at any time. The reward rate adjusts based on network
                participation and total staked ALEO.
              </p>
            </TabsContent>
            <TabsContent value="strategy" className="space-y-4 pt-4">
              <h3 className="text-lg font-medium">Optimal Staking Strategy</h3>
              <p>
                For maximum returns, consider a balanced approach between holding pALEO for liquidity and burning PNDO
                to increase your reward share.
              </p>
              <p>
                During high network activity periods, burning PNDO can be more profitable as it increases your share of
                a larger reward pool. During quieter periods, accumulating PNDO may be more beneficial.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
