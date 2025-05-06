"use client"

import { useEffect, useState, useRef } from "react"
import { GaugeCircle, Clock, Users, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function NetworkStats() {
  const [epochProgress, setEpochProgress] = useState(68)
  const [networkCongestion, setNetworkCongestion] = useState(42)
  const [activeStakers, setActiveStakers] = useState(2453)
  const [gasPrice, setGasPrice] = useState(24.5)
  const networkRef = useRef<HTMLDivElement>(null)

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEpochProgress((prev) => {
        const newValue = prev + 0.1
        return newValue > 100 ? 0 : newValue
      })

      setNetworkCongestion((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1
        const newValue = prev + change * Math.random() * 2
        return Math.min(Math.max(newValue, 10), 90)
      })

      // Randomly update active stakers
      if (Math.random() > 0.7) {
        const change = Math.random() > 0.5 ? 1 : -1
        setActiveStakers((prev) => prev + change * Math.floor(Math.random() * 5))
      }

      // Randomly update gas price
      if (Math.random() > 0.8) {
        const change = Math.random() > 0.5 ? 0.1 : -0.1
        setGasPrice((prev) => Number.parseFloat((prev + change * Math.random() * 2).toFixed(1)))
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Create network visualization
  useEffect(() => {
    if (!networkRef.current) return

    const container = networkRef.current
    container.innerHTML = ""

    // Create central node
    const centralNode = document.createElement("div")
    centralNode.className = "network-node"
    centralNode.style.width = "10px"
    centralNode.style.height = "10px"
    centralNode.style.left = "50%"
    centralNode.style.top = "50%"
    centralNode.style.transform = "translate(-50%, -50%)"
    centralNode.style.backgroundColor = "hsl(var(--primary))"
    centralNode.style.opacity = "1"
    centralNode.style.zIndex = "10"
    container.appendChild(centralNode)

    // Create nodes and connections
    const nodeCount = 20
    for (let i = 0; i < nodeCount; i++) {
      // Create node
      const node = document.createElement("div")
      node.className = "network-node"

      // Random position around center
      const angle = Math.random() * Math.PI * 2
      const distance = 20 + Math.random() * 30
      const x = 50 + Math.cos(angle) * distance
      const y = 50 + Math.sin(angle) * distance

      node.style.left = `${x}%`
      node.style.top = `${y}%`
      node.style.transform = "translate(-50%, -50%)"

      // Random animation
      node.style.animation = `pulse ${2 + Math.random() * 3}s infinite alternate`
      container.appendChild(node)

      // Create connection line to central node
      const line = document.createElement("div")
      line.className = "network-line"

      // Calculate line position and rotation
      const dx = x - 50
      const dy = y - 50
      const length = Math.sqrt(dx * dx + dy * dy)
      const angle2 = (Math.atan2(dy, dx) * 180) / Math.PI

      line.style.width = `${length}%`
      line.style.left = "50%"
      line.style.top = "50%"
      line.style.transform = `rotate(${angle2}deg)`

      // Random pulse animation for line
      line.style.animation = `opacity-pulse ${3 + Math.random() * 4}s infinite alternate`
      container.appendChild(line)
    }

    // Add keyframes for animations
    const style = document.createElement("style")
    style.textContent = `
      @keyframes pulse {
        0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.4; }
        100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.8; }
      }
      
      @keyframes opacity-pulse {
        0% { opacity: 0.1; }
        100% { opacity: 0.3; }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <Card className="border bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <GaugeCircle className="h-5 w-5 text-primary" />
          Network Stats
        </CardTitle>
        <CardDescription>Live Aleo network metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-[100px] mb-4 relative overflow-hidden rounded-md border">
          <div ref={networkRef} className="network-visualization absolute inset-0"></div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="text-sm font-medium">Epoch Progress</div>
            <div className="text-sm font-medium">{Math.floor(epochProgress)}%</div>
          </div>
          <Progress value={epochProgress} className="h-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>~{Math.ceil((100 - epochProgress) / 10)} hours remaining</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="text-sm font-medium">Network Congestion</div>
            <div className="text-sm font-medium">{Math.floor(networkCongestion)}%</div>
          </div>
          <Progress value={networkCongestion} className="h-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div>Low</div>
            <div>High</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>Active Stakers</span>
                  </div>
                  <div className="text-lg font-bold">{activeStakers.toLocaleString()}</div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Number of active stakers on the network</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Zap className="h-3 w-3" />
                    <span>Gas (gwei)</span>
                  </div>
                  <div className="text-lg font-bold">{gasPrice}</div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Current gas price in gwei</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  )
}
