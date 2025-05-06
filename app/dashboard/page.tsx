"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  Bell,
  ChevronDown,
  Flame,
  HelpCircle,
  Home,
  LineChart,
  LogOut,
  Menu,
  Rocket,
  Settings,
  Users,
  Wallet,
  X,
  Sun,
  Moon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useIsMobile } from "@/hooks/use-mobile"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { PortfolioOverview } from "@/components/portfolio-overview"
import { PerformanceComparison } from "@/components/performance-comparison"
import { YieldTrendChart } from "@/components/yield-trend-chart"
import { StakingAlerts } from "@/components/staking-alerts"
import { PndoUtility } from "@/components/pndo-utility"
import { WalletConnect } from "@/components/wallet-connect"
import { NetworkStats } from "@/components/network-stats"
import { RewardSimulator } from "@/components/reward-simulator"
import { WalletAnalytics } from "@/components/wallet-analytics"
import { Leaderboard } from "@/components/leaderboard"
import { StakeMoodMeter } from "@/components/stake-mood-meter"
import { PndoBurnCountdown } from "@/components/pndo-burn-countdown"
import { ExplainerBot } from "@/components/explainer-bot"
import { mockUserData } from "@/lib/mock-data"
import { AnalyticsView } from "@/components/analytics-view"
import { StakingView } from "@/components/staking-view"
import { PndoUtilityView } from "@/components/pndo-utility-view"
import { CommunityView } from "@/components/community-view"
import { WalletView } from "@/components/wallet-view"
import { SettingsView } from "@/components/settings-view"

export default function Dashboard() {
  const [isConnected, setIsConnected] = useState(false)
  const [userData, setUserData] = useState(mockUserData)
  const [showExplainer, setShowExplainer] = useState(false)
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showNotifications, setShowNotifications] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useIsMobile()
  const contentRef = useRef<HTMLDivElement>(null)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Reward Available",
      message: "You have earned 25 PNDO tokens from staking rewards.",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "APR Increase",
      message: "The base APR has increased to 13.2%. Consider optimizing your stake.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 3,
      title: "PNDO Burn Event",
      message: "Community burn event scheduled in 3 days. Prepare your PNDO tokens.",
      time: "1 day ago",
      read: true,
    },
  ])

  // Simulate loading state
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleConnect = () => {
    setIsConnected(true)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
  }

  // Handle tab change and scroll to top
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
    if (isMobile) {
      setMobileMenuOpen(false)
    }
  }

  // Render content based on active tab
  const renderContent = () => {
    if (!isConnected && activeTab !== "dashboard") {
      return (
        <Card className="flex flex-col items-center justify-center p-10 text-center border bg-card/50 backdrop-blur-sm">
          <div className="mb-4 rounded-full bg-primary/10 p-3">
            <Wallet className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="mb-2">Connect Your Wallet</CardTitle>
          <CardDescription className="mb-6 max-w-md">
            Connect your Aleo wallet to access {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} features.
          </CardDescription>
          <WalletConnect onConnect={handleConnect} />
        </Card>
      )
    }

    switch (activeTab) {
      case "dashboard":
        return renderDashboard()
      case "analytics":
        return <AnalyticsView />
      case "staking":
        return <StakingView />
      case "pndo":
        return <PndoUtilityView />
      case "community":
        return <CommunityView />
      case "wallet":
        return <WalletView userData={userData} />
      case "settings":
        return <SettingsView />
      default:
        return renderDashboard()
    }
  }

  // Dashboard content
  const renderDashboard = () => {
    if (!isConnected) {
      return (
        <Card className="flex flex-col items-center justify-center p-10 text-center border bg-card/50 backdrop-blur-sm">
          <div className="mb-4 rounded-full bg-primary/10 p-3">
            <Wallet className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="mb-2">Connect Your Wallet</CardTitle>
          <CardDescription className="mb-6 max-w-md">
            Connect your Aleo wallet to view your staking analytics, track performance, and optimize your yield
            strategy.
          </CardDescription>
          <WalletConnect onConnect={handleConnect} />
        </Card>
      )
    }

    return (
      <>
        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <div className="md:col-span-2">
            <PortfolioOverview userData={userData} />
          </div>
          <div>
            <NetworkStats />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <div className="md:col-span-2">
            <StakingAlerts />
          </div>
          <div>
            <WalletAnalytics userData={userData} />
          </div>
        </div>

        <div className="mb-6">
          <Tabs defaultValue="performance">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="yield">Yield Trends</TabsTrigger>
              <TabsTrigger value="utility">PNDO Utility</TabsTrigger>
              <TabsTrigger value="simulator">Reward Simulator</TabsTrigger>
            </TabsList>
            <TabsContent value="performance" className="space-y-4 pt-4">
              <PerformanceComparison />
            </TabsContent>
            <TabsContent value="yield" className="space-y-4 pt-4">
              <YieldTrendChart />
            </TabsContent>
            <TabsContent value="utility" className="space-y-4 pt-4">
              <PndoUtility />
            </TabsContent>
            <TabsContent value="simulator" className="space-y-4 pt-4">
              <RewardSimulator />
            </TabsContent>
          </Tabs>
        </div>

        <div className="mb-6">
          <Leaderboard />
        </div>
      </>
    )
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (
        showNotifications &&
        !target.closest("[data-notifications-panel]") &&
        !target.closest("[data-notifications-trigger]")
      ) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showNotifications])

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background/80">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.03]"></div>
        <div className="particle-container">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 20 + 10}s`,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                opacity: Math.random() * 0.3 + 0.1,
              }}
            ></div>
          ))}
        </div>
      </div>

      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-md px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-orange-600 text-primary-foreground">
            P
          </div>
          <span>Pondo Insights</span>
        </Link>

        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>

        <div className="ml-auto flex items-center gap-2 md:gap-4">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                  aria-label="Notifications"
                  data-notifications-trigger
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary"></span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="z-[60]">
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const newTheme = theme === "dark" ? "light" : "dark"
                    setTheme(newTheme)
                    console.log("Switching theme to:", newTheme)
                  }}
                  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="z-[60]">
                <p>{theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => setShowExplainer(!showExplainer)}>
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="z-[60]">
                <p>Help & Guides</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {isConnected ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 hidden sm:flex">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  {userData.walletAddress.slice(0, 6)}...{userData.walletAddress.slice(-4)}
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-[60]">
                <DropdownMenuLabel>Wallet</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleTabChange("wallet")}>View Details</DropdownMenuItem>
                <DropdownMenuItem>Copy Address</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDisconnect} className="text-red-500">
                  <LogOut className="h-4 w-4 mr-2" />
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <WalletConnect onConnect={handleConnect} />
          )}
        </div>

        {/* Mobile menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="left" className="w-[80%] max-w-[300px] p-0">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2 font-semibold">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-orange-600 text-primary-foreground">
                    P
                  </div>
                  <span>Pondo Insights</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex flex-col gap-1 p-4 overflow-auto">
                <div className="px-4 py-2 text-xs font-medium text-muted-foreground">MAIN MENU</div>
                <Button
                  variant={activeTab === "dashboard" ? "default" : "ghost"}
                  className="justify-start gap-2"
                  onClick={() => handleTabChange("dashboard")}
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Button>
                <Button
                  variant={activeTab === "analytics" ? "default" : "ghost"}
                  className="justify-start gap-2"
                  onClick={() => handleTabChange("analytics")}
                >
                  <LineChart className="h-4 w-4" />
                  Analytics
                </Button>
                <Button
                  variant={activeTab === "staking" ? "default" : "ghost"}
                  className="justify-start gap-2"
                  onClick={() => handleTabChange("staking")}
                >
                  <Rocket className="h-4 w-4" />
                  Staking
                </Button>
                <Button
                  variant={activeTab === "pndo" ? "default" : "ghost"}
                  className="justify-start gap-2"
                  onClick={() => handleTabChange("pndo")}
                >
                  <Flame className="h-4 w-4" />
                  PNDO Utility
                </Button>
                <Button
                  variant={activeTab === "community" ? "default" : "ghost"}
                  className="justify-start gap-2"
                  onClick={() => handleTabChange("community")}
                >
                  <Users className="h-4 w-4" />
                  Community
                </Button>

                <div className="px-4 py-2 mt-4 text-xs font-medium text-muted-foreground">ACCOUNT</div>
                <Button
                  variant={activeTab === "wallet" ? "default" : "ghost"}
                  className="justify-start gap-2"
                  onClick={() => handleTabChange("wallet")}
                >
                  <Wallet className="h-4 w-4" />
                  Wallet
                </Button>
                <Button
                  variant={activeTab === "settings" ? "default" : "ghost"}
                  className="justify-start gap-2"
                  onClick={() => handleTabChange("settings")}
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>

                {isConnected && (
                  <Button variant="ghost" className="justify-start gap-2 text-red-500 mt-4" onClick={handleDisconnect}>
                    <LogOut className="h-4 w-4" />
                    Disconnect Wallet
                  </Button>
                )}
              </div>

              <div className="mt-auto p-4">
                <StakeMoodMeter />
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {showNotifications && (
          <div
            className="absolute right-4 top-16 z-50 w-80 rounded-md border bg-card shadow-md"
            data-notifications-panel
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-medium">Notifications</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setNotifications(notifications.map((n) => ({ ...n, read: true })))}
              >
                Mark all as read
              </Button>
            </div>
            <div className="max-h-[400px] overflow-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b last:border-b-0 ${notification.read ? "opacity-70" : "bg-muted/30"}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      {!notification.read && <span className="h-2 w-2 rounded-full bg-primary"></span>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{notification.message}</p>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">No notifications</div>
              )}
            </div>
            <div className="p-2 border-t">
              <Button variant="ghost" size="sm" className="w-full">
                View all notifications
              </Button>
            </div>
          </div>
        )}
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop only */}
        <div className="hidden md:flex w-64 flex-col border-r bg-card/50 backdrop-blur-sm">
          <div className="flex flex-col gap-1 p-4 overflow-y-auto">
            <div className="px-4 py-2 text-xs font-medium text-muted-foreground">MAIN MENU</div>
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeTab === "dashboard" ? "default" : "ghost"}
                    className="justify-start gap-2"
                    onClick={() => handleTabChange("dashboard")}
                  >
                    <Home className="h-4 w-4" />
                    Dashboard
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="z-[60]">
                  <p>Main Dashboard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeTab === "analytics" ? "default" : "ghost"}
                    className="justify-start gap-2"
                    onClick={() => handleTabChange("analytics")}
                  >
                    <LineChart className="h-4 w-4" />
                    Analytics
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="z-[60]">
                  <p>Detailed Analytics</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeTab === "staking" ? "default" : "ghost"}
                    className="justify-start gap-2"
                    onClick={() => handleTabChange("staking")}
                  >
                    <Rocket className="h-4 w-4" />
                    Staking
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="z-[60]">
                  <p>Stake & Unstake ALEO</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeTab === "pndo" ? "default" : "ghost"}
                    className="justify-start gap-2"
                    onClick={() => handleTabChange("pndo")}
                  >
                    <Flame className="h-4 w-4" />
                    PNDO Utility
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="z-[60]">
                  <p>PNDO Token Utility</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeTab === "community" ? "default" : "ghost"}
                    className="justify-start gap-2"
                    onClick={() => handleTabChange("community")}
                  >
                    <Users className="h-4 w-4" />
                    Community
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="z-[60]">
                  <p>Community & Social</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="px-4 py-2 mt-4 text-xs font-medium text-muted-foreground">ACCOUNT</div>

            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeTab === "wallet" ? "default" : "ghost"}
                    className="justify-start gap-2"
                    onClick={() => handleTabChange("wallet")}
                  >
                    <Wallet className="h-4 w-4" />
                    Wallet
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="z-[60]">
                  <p>Wallet Management</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeTab === "settings" ? "default" : "ghost"}
                    className="justify-start gap-2"
                    onClick={() => handleTabChange("settings")}
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="z-[60]">
                  <p>Account Settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Stake Mood Meter - Fixed at bottom */}
          <div className="mt-auto p-4 sticky bottom-0 bg-card/50 backdrop-blur-sm">
            <StakeMoodMeter />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <main className="container mx-auto p-4 md:p-6 relative z-10 flex-1 overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h1>
                <p className="text-muted-foreground">
                  {activeTab === "dashboard" &&
                    "Track your Pondo staking performance and optimize your yield strategy."}
                  {activeTab === "analytics" && "Detailed analytics and insights for your staking portfolio."}
                  {activeTab === "staking" && "Stake and unstake your ALEO tokens to earn rewards."}
                  {activeTab === "pndo" && "Explore PNDO token utility and burning mechanisms."}
                  {activeTab === "community" && "Connect with the Pondo community and ecosystem."}
                  {activeTab === "wallet" && "Manage your wallet and transactions."}
                  {activeTab === "settings" && "Configure your account settings and preferences."}
                </p>
              </div>

              {/* PNDO Burn Countdown */}
              {activeTab === "dashboard" && <PndoBurnCountdown />}
            </div>

            {/* Scrollable content area */}
            <div ref={contentRef} className="overflow-auto h-[calc(100vh-12rem)] pb-8">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>

      {/* Explainer Bot */}
      {showExplainer && <ExplainerBot onClose={() => setShowExplainer(false)} />}
    </div>
  )
}
