"use client"

import { useState } from "react"
import { Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function StakingView() {
  const [stakeAmount, setStakeAmount] = useState("")
  const [unstakeAmount, setUnstakeAmount] = useState("")
  const [isStaking, setIsStaking] = useState(false)
  const [isUnstaking, setIsUnstaking] = useState(false)

  // Mock user data
  const userData = {
    aleoBalance: 2500,
    stakedAleo: 1000,
    pAleoBalance: 950,
    stakingAPR: 12.5,
    unbondingPeriod: 7, // days
  }

  const handleStake = () => {
    setIsStaking(true)
    // Simulate staking process
    setTimeout(() => {
      setIsStaking(false)
      setStakeAmount("")
    }, 2000)
  }

  const handleUnstake = () => {
    setIsUnstaking(true)
    // Simulate unstaking process
    setTimeout(() => {
      setIsUnstaking(false)
      setUnstakeAmount("")
    }, 2000)
  }

  const setMaxStake = () => {
    setStakeAmount(userData.aleoBalance.toString())
  }

  const setMaxUnstake = () => {
    setUnstakeAmount(userData.pAleoBalance.toString())
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardDescription>Available ALEO</CardDescription>
            <CardTitle className="text-2xl">{userData.aleoBalance.toLocaleString()} ALEO</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">Available for staking</div>
          </CardContent>
        </Card>

        <Card className="border bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardDescription>Staked ALEO</CardDescription>
            <CardTitle className="text-2xl">{userData.stakedAleo.toLocaleString()} ALEO</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">Currently earning {userData.stakingAPR}% APR</div>
          </CardContent>
        </Card>

        <Card className="border bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardDescription>pALEO Balance</CardDescription>
            <CardTitle className="text-2xl">{userData.pAleoBalance.toLocaleString()} pALEO</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">Liquid staking tokens</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="stake">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="stake">Stake</TabsTrigger>
          <TabsTrigger value="unstake">Unstake</TabsTrigger>
        </TabsList>

        <TabsContent value="stake" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Stake ALEO</CardTitle>
              <CardDescription>Stake your ALEO tokens to earn rewards and receive pALEO tokens</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Amount to Stake</label>
                  <span className="text-sm text-muted-foreground">
                    Balance: {userData.aleoBalance.toLocaleString()} ALEO
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                  />
                  <Button variant="outline" onClick={setMaxStake}>
                    Max
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium">You Will Receive</div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>pALEO tokens represent your staked ALEO</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="p-4 rounded-md bg-muted/50">
                  <div className="text-2xl font-bold">
                    {stakeAmount ? Number.parseFloat(stakeAmount) * 0.95 : 0} pALEO
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">1 pALEO ≈ 1.05 ALEO</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Transaction Summary</div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Staking APR</span>
                    <span>{userData.stakingAPR}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Transaction Fee</span>
                    <span>0.001 ALEO</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleStake}
                disabled={
                  !stakeAmount ||
                  isStaking ||
                  Number.parseFloat(stakeAmount) <= 0 ||
                  Number.parseFloat(stakeAmount) > userData.aleoBalance
                }
              >
                {isStaking ? (
                  <div className="flex items-center">
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                    Staking...
                  </div>
                ) : (
                  <>Stake ALEO</>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="unstake" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Unstake ALEO</CardTitle>
              <CardDescription>Convert your pALEO tokens back to ALEO (subject to unbonding period)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Amount to Unstake</label>
                  <span className="text-sm text-muted-foreground">
                    Balance: {userData.pAleoBalance.toLocaleString()} pALEO
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={unstakeAmount}
                    onChange={(e) => setUnstakeAmount(e.target.value)}
                  />
                  <Button variant="outline" onClick={setMaxUnstake}>
                    Max
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium">You Will Receive</div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>After the unbonding period of {userData.unbondingPeriod} days</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="p-4 rounded-md bg-muted/50">
                  <div className="text-2xl font-bold">
                    {unstakeAmount ? Number.parseFloat(unstakeAmount) * 1.05 : 0} ALEO
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Available after {userData.unbondingPeriod} day unbonding period
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Unbonding Period</div>
                <div className="space-y-2">
                  <Progress value={0} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0 days</span>
                    <span>{userData.unbondingPeriod} days</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Your ALEO will be locked for {userData.unbondingPeriod} days during the unbonding period. You will not
                  earn rewards during this time.
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleUnstake}
                disabled={
                  !unstakeAmount ||
                  isUnstaking ||
                  Number.parseFloat(unstakeAmount) <= 0 ||
                  Number.parseFloat(unstakeAmount) > userData.pAleoBalance
                }
              >
                {isUnstaking ? (
                  <div className="flex items-center">
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                    Unstaking...
                  </div>
                ) : (
                  <>Unstake pALEO</>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
