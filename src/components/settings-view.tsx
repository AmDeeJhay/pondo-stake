"use client"

import { useState } from "react"
import { Settings, Moon, Sun, Languages } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTheme } from "next-themes"

export function SettingsView() {
  const { theme, setTheme } = useTheme()
  const [showApiKey, setShowApiKey] = useState(false)
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                General Settings
              </CardTitle>
              <CardDescription>
                Manage your account preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="display-name">Display Name</Label>
                <Input id="display-name" placeholder="Enter your display name" defaultValue="Pondo User" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter your email address" defaultValue="user@example.com" />
                <div className="text-xs text-muted-foreground">
                  Your email is used for notifications and account recovery
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Theme Preference</Label>
                <div className="flex items-center justify-between rounded-md border p-4">
                  <div className="flex items-center space-x-2">
                    {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    <span>{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
                  </div>
                  <Button variant="outline" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                    Toggle Theme
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <div className="flex items-center justify-between rounded-md border p-4">
                  <div className="flex items-center space-x-2">
                    <Languages className="h-5 w-5" />
                    <span>English (US)</span>
                  </div>
                  <select className="h-10\
