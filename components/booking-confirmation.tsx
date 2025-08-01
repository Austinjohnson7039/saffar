"use client"

import { CheckCircle, Calendar, Clock, Users, DollarSign, Download, Share, Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface BookingConfirmationProps {
  booking: any
  onConfirm: () => void
}

export function BookingConfirmation({ booking, onConfirm }: BookingConfirmationProps) {
  const bookingId = "TRV-" + Math.random().toString(36).substr(2, 9).toUpperCase()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h1>
          <p className="text-gray-400">Your experience has been successfully booked</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  Booking Details
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Confirmed</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4">
                  <img
                    src="/placeholder.svg?height=100&width=150"
                    alt={booking.activity.title}
                    className="w-24 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg">{booking.activity.title}</h3>
                    <p className="text-gray-400">{booking.activity.location}</p>
                  </div>
                </div>

                <Separator className="bg-white/20" />

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="text-white font-medium">Date</div>
                      <div className="text-gray-400">{booking.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-cyan-400" />
                    <div>
                      <div className="text-white font-medium">Time</div>
                      <div className="text-gray-400">{booking.time}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-green-400" />
                    <div>
                      <div className="text-white font-medium">Tickets</div>
                      <div className="text-gray-400">{booking.tickets} person(s)</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-yellow-400" />
                    <div>
                      <div className="text-white font-medium">Total Paid</div>
                      <div className="text-gray-400">${booking.totalPrice}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Information */}
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Important Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <h4 className="text-blue-400 font-semibold mb-2">What to Bring</h4>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Valid photo ID or passport</li>
                    <li>• Comfortable walking shoes</li>
                    <li>• Camera for memorable photos</li>
                    <li>• Light jacket (it can be windy at height)</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                  <h4 className="text-yellow-400 font-semibold mb-2">Meeting Point</h4>
                  <p className="text-gray-300 text-sm">
                    Meet at the Tokyo Skytree main entrance, 4th floor ticket counter. Please arrive 15 minutes before
                    your scheduled time.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <h4 className="text-green-400 font-semibold mb-2">Cancellation Policy</h4>
                  <p className="text-gray-300 text-sm">
                    Free cancellation up to 24 hours before the experience. 50% refund for cancellations within 24
                    hours.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary & Actions */}
          <div className="space-y-6">
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Booking Reference</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-2xl font-bold text-white font-mono">{bookingId}</div>
                  <div className="text-sm text-gray-400 mt-1">Keep this for your records</div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600">
                    <Download className="w-4 h-4 mr-2" />
                    Download Ticket
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email Confirmation
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Share className="w-4 h-4 mr-2" />
                    Share Experience
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-400 text-sm">
                  Our support team is available 24/7 to assist you with any questions.
                </p>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 text-sm bg-transparent"
                  >
                    Chat with Support
                  </Button>
                  <div className="text-center">
                    <p className="text-xs text-gray-400">or call +1-800-TRAVEL</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
              <CardHeader>
                <CardTitle className="text-white">What's Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Check your email for detailed instructions</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Add the experience to your calendar</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Arrive 15 minutes early at the meeting point</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Continue Planning */}
        <div className="text-center mt-8">
          <Button
            onClick={onConfirm}
            className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 px-8 py-3"
          >
            Continue Planning Your Trip
          </Button>
        </div>
      </div>
    </div>
  )
}
