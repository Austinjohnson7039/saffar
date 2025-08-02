// AWS Configuration and API calls
export interface UserPreferences {
  cuisineTypes: string[]
  transportModes: string[]
  activityTypes: string[]
  budgetRange: { min: number; max: number }
  accommodationTypes: string[]
}

export interface TripBooking {
  id: string
  userId: string
  destination: string
  checkInDate: string
  checkOutDate: string
  selectedOptions: {
    accommodation: any
    cuisine: any
    transport: any
  }
  totalCost: number
  status: "pending" | "confirmed" | "completed"
}

// AWS API Gateway endpoints
const AWS_API_BASE = process.env.NEXT_PUBLIC_AWS_API_URL || "https://your-api-gateway-url.amazonaws.com"

export const awsAPI = {
  // Get user preferences from DynamoDB
  getUserPreferences: async (userId: string): Promise<UserPreferences> => {
    const response = await fetch(`${AWS_API_BASE}/users/${userId}/preferences`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
    return response.json()
  },

  // Get AI recommendations from AWS Lambda
  getRecommendations: async (
    destination: string,
    preferences: UserPreferences,
    dates: { checkIn: string; checkOut: string },
  ) => {
    const response = await fetch(`${AWS_API_BASE}/recommendations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({
        destination,
        preferences,
        dates,
        requestType: "full_recommendations",
      }),
    })
    return response.json()
  },

  // Save booking to DynamoDB
  saveBooking: async (booking: TripBooking) => {
    const response = await fetch(`${AWS_API_BASE}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify(booking),
    })
    return response.json()
  },

  // Get optimized route from AWS Lambda
  getOptimizedRoute: async (userId: string, destination: string, hotelLocation: any) => {
    const response = await fetch(`${AWS_API_BASE}/route/optimize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({
        userId,
        destination,
        hotelLocation,
        includePreferences: true,
      }),
    })
    return response.json()
  },

  // Process payment via AWS Lambda + Stripe
  processPayment: async (bookingId: string, paymentDetails: any) => {
    const response = await fetch(`${AWS_API_BASE}/payments/process`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({
        bookingId,
        paymentDetails,
      }),
    })
    return response.json()
  },
}
