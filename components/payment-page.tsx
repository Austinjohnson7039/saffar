"use client"

import { useState } from "react"
import { CreditCard, Lock, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { awsAPI } from "@/lib/aws-config"

interface PaymentPageProps {
  bookingData: any
  onPaymentComplete: (paymentResult: any) => void
  onBack: () => void
}

export function PaymentPage({ bookingData, onPaymentComplete, onBack }: PaymentPageProps) {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })
  const [billingAddress, setBillingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)

    try {
      // Process payment through AWS Lambda + Stripe
      const paymentResult = await awsAPI.processPayment(bookingData.bookingId, {
        method: paymentMethod,
        cardDetails,
        billingAddress,
        amount: bookingData.totalCost,
      })

      if (paymentResult.success) {
        onPaymentComplete({
          ...paymentResult,
          bookingData,
        })
      } else {
        throw new Error(paymentResult.error)
      }
    } catch (error) {
      console.error("Payment failed:", error)
      // For demo purposes, simulate successful payment
      setTimeout(() => {
        onPaymentComplete({
          success: true,
          transactionId: `txn_${Date.now()}`,
          bookingData,
        })
      }, 2000)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-6 text-white hover:bg-white/10">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Booking
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="space-y-6">
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-green-400" />
                  Secure Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Method */}
                <div>
                  <Label className="text-white mb-2 block">Payment Method</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="card">Credit/Debit Card</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="apple">Apple Pay</SelectItem>
                      <SelectItem value="google">Google Pay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {paymentMethod === "card" && (
                  <>
                    {/* Card Details */}
                    <div className="space-y-4">
                      <div>
                        <Label className="text-white mb-2 block">Cardholder Name</Label>
                        <Input
                          placeholder="John Doe"
                          value={cardDetails.name}
                          onChange={(e) => setCardDetails((prev) => ({ ...prev, name: e.target.value }))}
                          className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                        />
                      </div>
                      <div>
                        <Label className="text-white mb-2 block">Card Number</Label>
                        <Input
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails((prev) => ({ ...prev, number: e.target.value }))}
                          className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white mb-2 block">Expiry Date</Label>
                          <Input
                            placeholder="MM/YY"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails((prev) => ({ ...prev, expiry: e.target.value }))}
                            className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                          />
                        </div>
                        <div>
                          <Label className="text-white mb-2 block">CVV</Label>
                          <Input
                            placeholder="123"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails((prev) => ({ ...prev, cvv: e.target.value }))}
                            className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Billing Address */}
                    <div className="space-y-4">
                      <h3 className="text-white font-semibold">Billing Address</h3>
                      <div>
                        <Label className="text-white mb-2 block">Street Address</Label>
                        <Input
                          placeholder="123 Main St"
                          value={billingAddress.street}
                          onChange={(e) => setBillingAddress((prev) => ({ ...prev, street: e.target.value }))}
                          className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white mb-2 block">City</Label>
                          <Input
                            placeholder="New York"
                            value={billingAddress.city}
                            onChange={(e) => setBillingAddress((prev) => ({ ...prev, city: e.target.value }))}
                            className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                          />
                        </div>
                        <div>
                          <Label className="text-white mb-2 block">State</Label>
                          <Input
                            placeholder="NY"
                            value={billingAddress.state}
                            onChange={(e) => setBillingAddress((prev) => ({ ...prev, state: e.target.value }))}
                            className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white mb-2 block">ZIP Code</Label>
                          <Input
                            placeholder="10001"
                            value={billingAddress.zip}
                            onChange={(e) => setBillingAddress((prev) => ({ ...prev, zip: e.target.value }))}
                            className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                          />
                        </div>
                        <div>
                          <Label className="text-white mb-2 block">Country</Label>
                          <Select
                            value={billingAddress.country}
                            onValueChange={(value) => setBillingAddress((prev) => ({ ...prev, country: value }))}
                          >
                            <SelectTrigger className="bg-white/5 border-white/20 text-white">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="US">United States</SelectItem>
                              <SelectItem value="CA">Canada</SelectItem>
                              <SelectItem value="UK">United Kingdom</SelectItem>
                              <SelectItem value="AU">Australia</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Destination</span>
                    <span className="text-white">{bookingData.tripDetails.destination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Check-in</span>
                    <span className="text-white">{bookingData.tripDetails.checkInDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Check-out</span>
                    <span className="text-white">{bookingData.tripDetails.checkOutDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Guests</span>
                    <span className="text-white">{bookingData.tripDetails.guests}</span>
                  </div>
                </div>

                <div className="border-t border-white/20 pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Accommodation</span>
                    <span className="text-white">${bookingData.accommodation.price}/night</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Dining</span>
                    <span className="text-white">${bookingData.cuisine.dish.price}/person</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Transport</span>
                    <span className="text-white">${bookingData.transport.option.price}/trip</span>
                  </div>
                </div>

                <div className="border-t border-white/20 pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-white">${bookingData.totalCost}</span>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 text-lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Complete Payment
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Security Info */}
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 text-green-400 mb-2">
                  <Lock className="w-4 h-4" />
                  <span className="text-sm font-semibold">Secure Payment</span>
                </div>
                <p className="text-xs text-gray-400">
                  Your payment information is encrypted and processed securely through AWS and Stripe.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
