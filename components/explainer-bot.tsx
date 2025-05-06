"use client"

import { useState } from "react"
import { X, Send, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ExplainerBotProps {
  onClose: () => void
}

export function ExplainerBot({ onClose }: ExplainerBotProps) {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "👋 Hi there! I'm your Pondo Insights assistant. Ask me anything about liquid staking, PNDO tokens, or how to use this dashboard!",
    },
  ])
  const [input, setInput] = useState("")

  // Predefined answers for common questions
  const answers: Record<string, string> = {
    "what is pondo":
      "Pondo is a liquid staking protocol for Aleo that allows you to stake your ALEO tokens and receive pALEO tokens in return. These pALEO tokens represent your staked ALEO and can be used in other DeFi applications while your original ALEO continues earning staking rewards.",
    "what is paleo":
      "pALEO is the liquid staking token you receive when you stake ALEO through Pondo. It represents your staked ALEO and can be used in other DeFi applications while your original ALEO continues earning staking rewards.",
    "what is pndo":
      "PNDO is the utility token of the Pondo ecosystem. It can be earned through staking ALEO, and can be burned to increase your staking rewards. PNDO also grants governance rights over the protocol.",
    "how does burning work":
      "Burning PNDO tokens increases your share of the staking rewards without requiring you to stake more ALEO. When you burn PNDO, you're effectively reducing the total supply, which creates deflationary pressure and potentially increases the value of remaining PNDO tokens.",
    "what is apr":
      "APR (Annual Percentage Rate) represents the yearly interest earned on your staked assets. In Pondo, your APR consists of both the base staking rewards from the Aleo network and additional PNDO rewards.",
    "what is liquid staking":
      "Liquid staking allows you to stake your tokens while maintaining liquidity. When you stake ALEO with Pondo, you receive pALEO tokens that represent your staked position. You can use these pALEO tokens in other DeFi applications while your original ALEO continues to earn staking rewards.",
    "how to stake":
      "To stake ALEO with Pondo, connect your wallet, navigate to the Staking tab, enter the amount you want to stake, and confirm the transaction. You'll receive pALEO tokens representing your staked position.",
    "how to unstake":
      "To unstake your ALEO, go to the Staking tab, select the 'Unstake' option, enter the amount of pALEO you want to convert back to ALEO, and confirm the transaction. Note that there may be an unbonding period before you receive your ALEO tokens.",
  }

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    setMessages([...messages, { role: "user", content: input }])

    // Find answer
    const question = input.toLowerCase()
    let answer =
      "I'm sorry, I don't have information about that yet. Please check the documentation or ask a more specific question about Pondo, liquid staking, or PNDO tokens."

    for (const [key, value] of Object.entries(answers)) {
      if (question.includes(key)) {
        answer = value
        break
      }
    }

    // Add bot response after a short delay
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", content: answer }])
    }, 500)

    setInput("")
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 md:w-96">
      <Card className="border shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <div className="font-medium">Pondo Assistant</div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[300px] p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`rounded-lg px-3 py-2 max-w-[80%] ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex w-full items-center gap-2">
            <Input
              placeholder="Ask about staking, PNDO, etc..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Button size="icon" onClick={handleSend}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
