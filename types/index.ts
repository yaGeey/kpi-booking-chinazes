export interface Room {
   id: string
   name: string
   description: string
   price: number
   capacity: number
   images: string[]
   amenities: string[]
   available: boolean
}

export interface Booking {
   id: string
   roomId: string
   userId: string
   userName: string
   userEmail: string
   userPhone: string
   checkIn: string
   checkOut: string
   status: 'pending' | 'confirmed' | 'rejected' | 'cancelled'
   totalPrice: number
   createdAt: string
}

export interface User {
   id: string
   name: string
   email: string
   role: 'user' | 'admin'
}
