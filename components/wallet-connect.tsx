"use client"

import { useState } from "react"
import { Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface WalletConnectProps {
  onConnect: () => void
}

export function WalletConnect({ onConnect }: WalletConnectProps) {
  const [open, setOpen] = useState(false)
  const [address, setAddress] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = () => {
    // Simulate connection delay
    setIsConnecting(true)
    setTimeout(() => {
      setIsConnecting(false)
      setOpen(false)
      onConnect()
    }, 1500)
  }

  const handleManualConnect = () => {
    if (address.length > 0) {
      setIsConnecting(true)
      setTimeout(() => {
        setIsConnecting(false)
        setOpen(false)
        onConnect()
      }, 1000)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Wallet className="h-4 w-4" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect wallet</DialogTitle>
          <DialogDescription>Connect your Aleo wallet to view your staking analytics</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button onClick={handleConnect} className="w-full relative overflow-hidden" disabled={isConnecting}>
            {isConnecting && (
              <div className="absolute inset-0 flex items-center justify-center bg-primary">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
              </div>
            )}
            <span className="flex items-center gap-2">
              <img src="/leo-wallet-icon.svg" alt="Leo Wallet" className="h-4 w-4" />
              Connect Leo Wallet
            </span>
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or enter address manually</span>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Aleo Address</Label>
            <Input id="address" placeholder="aleo1..." value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleManualConnect} disabled={!address || isConnecting}>
            {isConnecting ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
            ) : (
              "Connect"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
