"use client"

import { Phone, MapPin, Hospital, Shield, AlertTriangle, Copy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function EmergencyInfo() {
  const emergencyContacts = [
    {
      country: "Japan",
      police: "110",
      fire: "119",
      medical: "119",
      tourist: "+81-3-3201-3331",
    },
    {
      country: "Spain",
      police: "112",
      fire: "112",
      medical: "112",
      tourist: "+34-902-102-112",
    },
    {
      country: "USA",
      police: "911",
      fire: "911",
      medical: "911",
      tourist: "1-888-407-4747",
    },
  ]

  const personalContacts = [
    {
      name: "Emergency Contact",
      relationship: "Spouse",
      phone: "+1-555-0123",
      email: "emergency@example.com",
    },
    {
      name: "Dr. Sarah Johnson",
      relationship: "Family Doctor",
      phone: "+1-555-0456",
      email: "dr.johnson@clinic.com",
    },
  ]

  const importantInfo = [
    {
      title: "Travel Insurance",
      company: "Global Travel Insurance",
      policy: "GTI-2024-789456",
      phone: "+1-800-TRAVEL",
      coverage: "Medical, Trip Cancellation, Lost Luggage",
    },
    {
      title: "Embassy Information",
      location: "US Embassy Tokyo",
      address: "1-10-5 Akasaka, Minato-ku, Tokyo",
      phone: "+81-3-3224-5000",
      hours: "8:30 AM - 5:30 PM",
    },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
              <Shield className="w-8 h-8 mr-3 text-red-400" />
              Emergency Information
            </h1>
            <p className="text-gray-400">Important contacts and information for your safety</p>
          </div>
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            <AlertTriangle className="w-4 h-4 mr-1" />
            Keep Accessible
          </Badge>
        </div>

        {/* Quick Actions */}
        <Card className="backdrop-blur-xl bg-red-500/10 border border-red-500/30 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
              Emergency Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button className="bg-red-600 hover:bg-red-700 text-white h-16 text-lg">
                <Phone className="w-6 h-6 mr-2" />
                Call 911
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white h-16 text-lg">
                <Hospital className="w-6 h-6 mr-2" />
                Find Hospital
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white h-16 text-lg">
                <MapPin className="w-6 h-6 mr-2" />
                Share Location
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Emergency Numbers by Country */}
          <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Emergency Numbers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {emergencyContacts.map((country, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-purple-400" />
                    {country.country}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center justify-between p-2 rounded bg-white/5">
                      <span className="text-gray-400">Police</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-mono">{country.police}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(country.police)}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-white/5">
                      <span className="text-gray-400">Fire</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-mono">{country.fire}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(country.fire)}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-white/5">
                      <span className="text-gray-400">Medical</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-mono">{country.medical}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(country.medical)}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-white/5">
                      <span className="text-gray-400">Tourist Help</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-mono text-xs">{country.tourist}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(country.tourist)}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {index < emergencyContacts.length - 1 && <Separator className="bg-white/10" />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Personal Emergency Contacts */}
          <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Personal Contacts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {personalContacts.map((contact, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold">{contact.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {contact.relationship}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Phone</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-mono">{contact.phone}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(contact.phone)}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Email</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-white text-sm">{contact.email}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(contact.email)}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Important Information */}
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {importantInfo.map((info, index) => (
            <Card key={index} className="backdrop-blur-xl bg-white/10 border border-white/20">
              <CardHeader>
                <CardTitle className="text-white">{info.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {info.company && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Company</span>
                    <span className="text-white">{info.company}</span>
                  </div>
                )}
                {info.policy && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Policy #</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-mono">{info.policy}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(info.policy)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                )}
                {info.location && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Location</span>
                    <span className="text-white">{info.location}</span>
                  </div>
                )}
                {info.address && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Address</span>
                    <span className="text-white text-right text-sm">{info.address}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">Phone</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-mono">{info.phone}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(info.phone)}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                {info.coverage && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Coverage</span>
                    <span className="text-white text-right text-sm">{info.coverage}</span>
                  </div>
                )}
                {info.hours && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Hours</span>
                    <span className="text-white">{info.hours}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Medical Information */}
        <Card className="backdrop-blur-xl bg-white/10 border border-white/20 mt-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Hospital className="w-5 h-5 mr-2" />
              Medical Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-white font-semibold">Allergies</h3>
              <div className="space-y-2">
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Peanuts</Badge>
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Shellfish</Badge>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-white font-semibold">Medications</h3>
              <div className="space-y-2">
                <div className="text-white">Lisinopril 10mg - Daily</div>
                <div className="text-white">Metformin 500mg - Twice daily</div>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-white font-semibold">Blood Type</h3>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">O+</Badge>
            </div>
            <div className="space-y-3">
              <h3 className="text-white font-semibold">Emergency Medical ID</h3>
              <div className="text-white font-mono">EMI-2024-456789</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
