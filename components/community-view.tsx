"use client"

import { useState } from "react"
import { Users, MessageSquare, Share2, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export function CommunityView() {
  const [message, setMessage] = useState("")

  // Mock community data
  const announcements = [
    {
      id: 1,
      title: "Pondo Protocol Upgrade v2.1",
      content:
        "We're excited to announce the release of Pondo Protocol v2.1 with improved staking rewards and reduced unbonding period.",
      date: "2 days ago",
      author: "Pondo Team",
      authorAvatar: "/team-avatar.png",
      important: true,
    },
    {
      id: 2,
      title: "Community Call - July 15th",
      content: "Join us for our monthly community call to discuss the latest developments and roadmap updates.",
      date: "1 week ago",
      author: "Community Manager",
      authorAvatar: "/community-avatar.png",
    },
    {
      id: 3,
      title: "PNDO Tokenomics Update",
      content: "We've updated our tokenomics model to better incentivize long-term staking and PNDO burning.",
      date: "2 weeks ago",
      author: "Pondo Team",
      authorAvatar: "/team-avatar.png",
    },
  ]

  const discussions = [
    {
      id: 1,
      title: "Best strategy for maximizing PNDO rewards?",
      content:
        "I'm trying to optimize my staking strategy. Should I focus on burning PNDO or increasing my ALEO stake?",
      date: "3 hours ago",
      author: "crypto_whale",
      authorAvatar: "/user1-avatar.png",
      replies: 12,
      likes: 8,
    },
    {
      id: 2,
      title: "pALEO liquidity pools coming soon?",
      content: "Has anyone heard about potential pALEO liquidity pools on DEXes? Would be great for additional yield.",
      date: "1 day ago",
      author: "yield_farmer",
      authorAvatar: "/user2-avatar.png",
      replies: 7,
      likes: 15,
    },
    {
      id: 3,
      title: "Unbonding period too long?",
      content: "The 7-day unbonding period feels excessive. Any chance this will be reduced in future updates?",
      date: "2 days ago",
      author: "impatient_staker",
      authorAvatar: "/user3-avatar.png",
      replies: 23,
      likes: 19,
    },
  ]

  const resources = [
    {
      id: 1,
      title: "Pondo Documentation",
      description: "Comprehensive documentation for the Pondo protocol",
      url: "https://docs.pondo.finance",
      icon: "📚",
    },
    {
      id: 2,
      title: "Staking Guide",
      description: "Step-by-step guide to staking ALEO with Pondo",
      url: "https://docs.pondo.finance/guides/staking",
      icon: "📝",
    },
    {
      id: 3,
      title: "Tokenomics Whitepaper",
      description: "Detailed explanation of PNDO tokenomics",
      url: "https://pondo.finance/whitepaper",
      icon: "📊",
    },
    {
      id: 4,
      title: "Developer Resources",
      description: "APIs, SDKs, and tools for building on Pondo",
      url: "https://developers.pondo.finance",
      icon: "👨‍💻",
    },
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message to a backend
      setMessage("")
      alert("Message sent! (This is a demo)")
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border bg-card/50 backdrop-blur-sm md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Community Hub
            </CardTitle>
            <CardDescription>Connect with the Pondo community and stay updated on the latest news</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="announcements">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="announcements">Announcements</TabsTrigger>
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="announcements" className="space-y-4 pt-4">
                {announcements.map((announcement) => (
                  <Card key={announcement.id} className={announcement.important ? "border-primary/50" : ""}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{announcement.title}</CardTitle>
                          <CardDescription>{announcement.date}</CardDescription>
                        </div>
                        {announcement.important && (
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/50">
                            Important
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{announcement.content}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-0">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>{announcement.author[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{announcement.author}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="discussions" className="space-y-4 pt-4">
                {discussions.map((discussion) => (
                  <Card key={discussion.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{discussion.title}</CardTitle>
                        <CardDescription>{discussion.date}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{discussion.content}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-0">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>{discussion.author[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{discussion.author}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MessageSquare className="h-4 w-4" />
                          <span>{discussion.replies}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          View Thread
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
                <Button className="w-full">Load More Discussions</Button>
              </TabsContent>

              <TabsContent value="resources" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  {resources.map((resource) => (
                    <Card key={resource.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <div className="text-2xl">{resource.icon}</div>
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="w-full">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Visit Resource
                          </Button>
                        </a>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Community Chat</CardTitle>
            <CardDescription>Connect with other Pondo users</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] flex flex-col">
            <div className="flex-1 overflow-auto mb-4 border rounded-md p-4 space-y-4">
              <div className="flex gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>PT</AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-md p-2 max-w-[80%]">
                  <div className="text-xs font-medium mb-1">Pondo Team</div>
                  <div className="text-sm">
                    Welcome to the Pondo community chat! Ask questions and connect with other users.
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>CW</AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-md p-2 max-w-[80%]">
                  <div className="text-xs font-medium mb-1">crypto_whale</div>
                  <div className="text-sm">Has anyone tried the new reward simulator? It's pretty accurate!</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>YF</AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-md p-2 max-w-[80%]">
                  <div className="text-xs font-medium mb-1">yield_farmer</div>
                  <div className="text-sm">
                    I'm getting about 15% APR after burning some PNDO. Pretty happy with the results.
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="bg-primary text-primary-foreground rounded-md p-2 max-w-[80%]">
                  <div className="text-sm">That's impressive! How much PNDO did you burn?</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>YF</AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-md p-2 max-w-[80%]">
                  <div className="text-xs font-medium mb-1">yield_farmer</div>
                  <div className="text-sm">About 500 PNDO. It gave me a 2.5% boost on top of the base APR.</div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} disabled={!message.trim()}>
                Send
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Join Our Social Channels</CardTitle>
          <CardDescription>Stay connected with the Pondo community across various platforms</CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  )
}
