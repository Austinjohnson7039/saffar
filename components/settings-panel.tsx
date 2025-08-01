"use client"

import { useState } from "react"
import { User, Bell, Shield, Globe, Save } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export function SettingsPanel() {
  const [budget, setBudget] = useState([1500])
  const [notifications, setNotifications] = useState(true)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Settings & Preferences</h1>

        <div className="grid gap-6">
          {/* Profile Settings */}
          <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <User className="w-5 h-5 mr-2" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">
                    Full Name
                  </Label>
                  <Input id="name" defaultValue="Alex Johnson" className="bg-white/5 border-white/20 text-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="alex@example.com"
                    className="bg-white/5 border-white/20 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Travel Preferences */}
          <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Travel Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-gray-300">Preferred Hotel Type</Label>
                  <Select defaultValue="luxury">
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">Budget Hotels</SelectItem>
                      <SelectItem value="mid-range">Mid-range Hotels</SelectItem>
                      <SelectItem value="luxury">Luxury Hotels</SelectItem>
                      <SelectItem value="boutique">Boutique Hotels</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Transportation Mode</Label>
                  <Select defaultValue="mixed">
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="walking">Walking</SelectItem>
                      <SelectItem value="public">Public Transport</SelectItem>
                      <SelectItem value="car">Car/Taxi</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Default Budget Range</Label>
                <div className="px-3">
                  <Slider value={budget} onValueChange={setBudget} max={5000} min={500} step={100} className="w-full" />
                  <div className="flex justify-between text-sm text-gray-400 mt-1">
                    <span>$500</span>
                    <span className="text-purple-400 font-semibold">${budget[0]}</span>
                    <span>$5000</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-gray-300">Cuisine Preference</Label>
                  <Select defaultValue="local">
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Local Cuisine</SelectItem>
                      <SelectItem value="international">International</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="fine-dining">Fine Dining</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Activity Level</Label>
                  <Select defaultValue="moderate">
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relaxed">Relaxed</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="active">Very Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Trip Updates</Label>
                  <p className="text-sm text-gray-400">Get notified about changes to your itinerary</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Weather Alerts</Label>
                  <p className="text-sm text-gray-400">Receive weather-related travel advisories</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Price Drops</Label>
                  <p className="text-sm text-gray-400">Alert me when prices drop for saved trips</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Data Sharing</Label>
                  <p className="text-sm text-gray-400">Allow AI to learn from your travel patterns</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Location Services</Label>
                  <p className="text-sm text-gray-400">Enable location-based recommendations</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 px-8">
              <Save className="w-4 h-4 mr-2" />
              Save Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
