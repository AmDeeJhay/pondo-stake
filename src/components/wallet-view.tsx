"use client"

import { useState } from "react"
import { Wallet, Copy, ExternalLink, ArrowUpRight, ArrowDownRight, Repeat, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface WalletViewProps {
  userData: any
}

export function WalletView({ userData }: WalletViewProps) {
  const [copied, setCopied] = useState(false)

  // Mock transaction history
  const transactions = [
    {
      id: "tx1",
      type: "stake",
      amount: 200,
      token: "ALEO",
      date: "2023-07-15T10:15:00Z",
      status: "completed",
      hash: "0x1234...5678",
    },
    {
      id: "tx2",
      type: "claim",
      amount: 45,
      token: "PNDO",
      date: "2023-07-10T14:30:00Z",
      status: "completed",
      hash: "0x8765...4321",
    },
    {
      id: "tx3",
      type: "burn",
      amount: 100,
      token: "PNDO",
      date: "2023-07-05T09:45:00Z",
      status: "completed",
      hash: "0xabcd...efgh",
    },
    {
      id: "tx4",
      type: "unstake",
      amount: 50,
      token: "ALEO",
      date: "2023-06-28T16:20:00Z",
      status: "pending",
      hash: "0xijkl...mnop",
    },
  ]

  const copyAddress = () => {
    navigator.clipboard.writeText(userData.walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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

  // Get transaction icon
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "stake":
        return <ArrowUpRight className="h-4 w-4 text-green-500" />
      case "unstake":
        return <ArrowDownRight className="h-4 w-4 text-red-500" />
      case "claim":
        return <Repeat className="h-4 w-4 text-blue-500" />
      case "burn":
        return <Wallet className="h-4 w-4 text-primary" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-primary" />
            Wallet Details
          </CardTitle>
          <CardDescription>Manage your wallet and view transaction history</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 rounded-md border bg-muted/30">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Wallet Address</div>
                <div className="font-mono text-sm break-all">{userData.walletAddress}</div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyAddress}>
                  {copied ? "Copied!" : "Copy Address"}
                  <Copy className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  View Explorer
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>ALEO Balance</CardDescription>
                <CardTitle className="text-2xl">{userData.stakedAleo.toLocaleString()} ALEO</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">Staked</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>pALEO Balance</CardDescription>
                <CardTitle className="text-2xl">{userData.pAleoBalance.toLocaleString()} pALEO</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">Liquid staking tokens</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>PNDO Balance</CardDescription>
                <CardTitle className="text-2xl">{userData.pndoRewards.toLocaleString()} PNDO</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">Reward tokens</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="transactions">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          <TabsTrigger value="settings">Wallet Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your recent activity on the Pondo protocol</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-3 rounded-md border">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        {getTransactionIcon(tx.type)}
                      </div>
                      <div>
                        <div className="font-medium capitalize">{tx.type}</div>
                        <div className="text-xs text-muted-foreground">{formatDate(tx.date)}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="font-medium">
                        {tx.type === "unstake" || tx.type === "burn" ? "-" : "+"}
                        {tx.amount} {tx.token}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-xs text-muted-foreground truncate max-w-[100px]">{tx.hash}</div>
                        {tx.status === "pending" ? (
                          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/50">
                            Pending
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/50">
                            Completed
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Transactions
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Wallet Settings</CardTitle>
              <CardDescription>Configure your wallet preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="display-name">Display Name</Label>
                <Input id="display-name" placeholder="Enter a display name for your wallet" />
              </div>

              <div className="space-y-2">
                <Label>Transaction Notifications</Label>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="tx-notifications" className="h-4 w-4" defaultChecked />
                  <Label htmlFor="tx-notifications" className="text-sm font-normal">
                    Receive notifications for transactions
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Auto-claim Rewards</Label>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="auto-claim" className="h-4 w-4" />
                  <Label htmlFor="auto-claim" className="text-sm font-normal">
                    Automatically claim PNDO rewards when available
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gas-preference">Gas Price Preference</Label>
                <select
                  id="gas-preference"
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="standard">Standard</option>
                  <option value="fast">Fast</option>
                  <option value="instant">Instant</option>
                </select>
                <div className="text-xs text-muted-foreground">Select your preferred gas price for transactions</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
