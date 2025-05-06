"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { ArrowRight, ChevronDown, Flame, Rocket, Wallet } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LandingPage() {
  const { theme, setTheme } = useTheme()
  const [isHovered, setIsHovered] = useState(false)

  // Refs for scrolling
  const featuresRef = useRef<HTMLElement>(null)
  const howItWorksRef = useRef<HTMLElement>(null)
  const tokenomicsRef = useRef<HTMLElement>(null)
  const communityRef = useRef<HTMLElement>(null)

  // Scroll to section
  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.03]"></div>
        <div className="particle-container">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 20 + 10}s`,
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                opacity: Math.random() * 0.5 + 0.1,
              }}
            ></div>
          ))}
        </div>
      </div>

      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-md px-6">
        <div className="flex items-center gap-2 font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-orange-600 text-primary-foreground">
            P
          </div>
          <span>Pondo Insights</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 ml-10">
          <button
            onClick={() => scrollToSection(featuresRef)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection(howItWorksRef)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection(tokenomicsRef)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Tokenomics
          </button>
          <button
            onClick={() => scrollToSection(communityRef)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Community
          </button>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="hidden md:flex">
              Launch App
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="sm">
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center px-3 py-1 mb-6 text-xs font-medium rounded-full bg-primary/10 text-primary">
              <Flame className="mr-1 h-3 w-3" />
              <span>Powered by Aleo</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-600">
              Unlock the Power of Liquid Staking
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10">
              Track rewards. Optimize yield. Own your staking journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="relative overflow-hidden group"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span className="relative z-10 flex items-center">
                    Launch Dashboard
                    <ArrowRight
                      className={`ml-2 h-4 w-4 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
                    />
                  </span>
                  <span
                    className={`absolute inset-0 bg-gradient-to-r from-orange-600 to-primary transition-opacity duration-300 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  ></span>
                </Button>
              </Link>
              <Button variant="outline" size="lg" onClick={() => scrollToSection(featuresRef)}>
                Learn More
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-20 relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-primary rounded-xl blur opacity-30"></div>
            <div className="relative bg-card rounded-lg shadow-2xl border overflow-hidden">
              <img
                src="/dashboard-preview.png"
                alt="Pondo Insights Dashboard Preview"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-card px-4 py-2 rounded-full border shadow-lg">
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                Live Network: 2,453 Stakers Online
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} id="features" className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to maximize your staking rewards and optimize your strategy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Portfolio Analytics",
                description: "Track your staked ALEO, pALEO holdings, and PNDO rewards in real-time.",
                icon: "📊",
              },
              {
                title: "Performance Comparison",
                description: "Compare pALEO liquid staking vs direct ALEO staking to optimize your strategy.",
                icon: "📈",
              },
              {
                title: "Yield Forecasting",
                description: "Simulate potential earnings based on different staking amounts and timeframes.",
                icon: "🔮",
              },
              {
                title: "Staking Alerts",
                description: "Get notified about optimal staking opportunities and high burn activity.",
                icon: "🔔",
              },
              {
                title: "PNDO Tokenomics",
                description: "Track PNDO supply, burns, and utility metrics to make informed decisions.",
                icon: "🔥",
              },
              {
                title: "Network Insights",
                description: "Monitor network congestion, gas fees, and epoch progress in real-time.",
                icon: "⛓️",
              },
            ].map((feature, index) => (
              <Card key={index} className="border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
                <CardContent className="pt-6">
                  <div className="mb-4 text-4xl">{feature.icon}</div>
                  <CardTitle className="mb-2">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section ref={howItWorksRef} id="how-it-works" className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get started with Pondo Insights in three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

            {[
              {
                step: "01",
                title: "Connect Wallet",
                description: "Connect your Aleo wallet to access your staking data and analytics.",
                icon: <Wallet className="h-10 w-10 text-primary" />,
              },
              {
                step: "02",
                title: "View Dashboard",
                description: "Explore your portfolio, performance metrics, and staking opportunities.",
                icon: <Rocket className="h-10 w-10 text-primary" />,
              },
              {
                step: "03",
                title: "Optimize Staking",
                description: "Use insights and alerts to maximize your staking rewards.",
                icon: <Flame className="h-10 w-10 text-primary" />,
              },
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center relative z-10">
                <div className="mb-6 rounded-full bg-card p-6 border shadow-lg">{step.icon}</div>
                <div className="text-sm font-medium text-primary mb-2">{step.step}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tokenomics Section */}
        <section ref={tokenomicsRef} id="tokenomics" className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">PNDO Tokenomics</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Understanding how PNDO works and why it matters to your staking strategy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">The Power of PNDO</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    01
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Deflationary Mechanism</h4>
                    <p className="text-muted-foreground">
                      PNDO tokens can be burned to increase your staking rewards, creating deflationary pressure.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    02
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Reward Amplification</h4>
                    <p className="text-muted-foreground">
                      Burning PNDO increases your share of the reward pool without requiring additional ALEO stake.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    03
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Governance Utility</h4>
                    <p className="text-muted-foreground">
                      PNDO holders can participate in governance decisions that shape the future of the protocol.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg p-6 border">
              <Tabs defaultValue="distribution">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="distribution">Token Distribution</TabsTrigger>
                  <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
                </TabsList>
                <TabsContent value="distribution" className="pt-6">
                  <div className="aspect-square max-w-md mx-auto relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold">10M</div>
                        <div className="text-sm text-muted-foreground">Total Supply</div>
                      </div>
                    </div>
                    <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                      <circle
                        r="25"
                        cx="50"
                        cy="50"
                        fill="transparent"
                        stroke="#ff7b00"
                        strokeWidth="50"
                        strokeDasharray="39.27 157.08"
                      />
                      <circle
                        r="25"
                        cx="50"
                        cy="50"
                        fill="transparent"
                        stroke="#ff9f45"
                        strokeWidth="50"
                        strokeDasharray="31.42 157.08"
                        strokeDashoffset="-39.27"
                      />
                      <circle
                        r="25"
                        cx="50"
                        cy="50"
                        fill="transparent"
                        stroke="#ffbc80"
                        strokeWidth="50"
                        strokeDasharray="23.56 157.08"
                        strokeDashoffset="-70.69"
                      />
                      <circle
                        r="25"
                        cx="50"
                        cy="50"
                        fill="transparent"
                        stroke="#ffd9b7"
                        strokeWidth="50"
                        strokeDasharray="62.83 157.08"
                        strokeDashoffset="-94.25"
                      />
                    </svg>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ff7b00]"></div>
                      <div className="text-sm">Staking Rewards (25%)</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ff9f45]"></div>
                      <div className="text-sm">Ecosystem Fund (20%)</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ffbc80]"></div>
                      <div className="text-sm">Team & Advisors (15%)</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ffd9b7]"></div>
                      <div className="text-sm">Community & Treasury (40%)</div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="metrics" className="space-y-6 pt-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">Circulating Supply</div>
                      <div className="text-2xl font-bold">7.5M PNDO</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">Total Burned</div>
                      <div className="text-2xl font-bold">2.5M PNDO</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">Current APR</div>
                      <div className="text-2xl font-bold">12.5%</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">Reward Pool</div>
                      <div className="text-2xl font-bold">500K PNDO</div>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm font-medium">Burn Rate (30-day avg)</div>
                      <div className="text-sm font-medium">25K PNDO/day</div>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-orange-600 w-[65%]"></div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-orange-600 opacity-90"></div>
            <div className="relative z-10 py-16 px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Optimize Your Staking?</h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                Join thousands of stakers who are maximizing their rewards with Pondo Insights.
              </p>
              <Link href="/dashboard">
                <Button size="lg" variant="secondary" className="font-medium">
                  Launch Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section ref={communityRef} id="community" className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with other stakers, get support, and stay updated on the latest developments.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "Discord",
                icon: "discord.svg",
                color: "bg-[#5865F2]/10 text-[#5865F2]",
                url: "https://discord.gg/pondo",
              },
              {
                name: "Twitter",
                icon: "twitter.svg",
                color: "bg-[#1DA1F2]/10 text-[#1DA1F2]",
                url: "https://twitter.com/PondoFinance",
              },
              {
                name: "Telegram",
                icon: "telegram.svg",
                color: "bg-[#0088cc]/10 text-[#0088cc]",
                url: "https://t.me/pondofinance",
              },
              {
                name: "GitHub",
                icon: "github.svg",
                color: "bg-gray-500/10 text-gray-500",
                url: "https://github.com/pondo-finance",
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-6 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors"
              >
                <div className={`w-12 h-12 rounded-full ${social.color} flex items-center justify-center mb-4`}>
                  <img src={`/${social.icon}`} alt={social.name} className="w-6 h-6" />
                </div>
                <div className="font-medium">{social.name}</div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t py-12 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 font-semibold mb-6 md:mb-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-orange-600 text-primary-foreground">
                P
              </div>
              <span>Pondo Insights</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Pondo Insights. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
