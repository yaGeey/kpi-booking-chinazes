export type Role = 'Admin' | 'User'
export type BookingStatus = 'CREATE' | 'CONFIRM' | 'CANCEL' | 'COMPLETE'

export interface User {
   id: number
   name: string
   email: string
   passwordHash?: string
   salt?: string
   role?: Role
   phone: string
}

export interface Room {
   id: number
   capacity: number
   pricePerNight: number
   title: string
   description: string
   photos?: string[]
}

export interface Booking {
   id: number
   userId: number
   roomId: number
   status: BookingStatus
   createdAt: string
   endDate: string
   startDate: string
}
export interface BookingJoined {
   id: number
   roomId: number
   status: BookingStatus
   createdAt: string
   endDate: string
   startDate: string
   userName: string
   userPhone: string
}

export interface Payment {
   id: number
   bookingId: number
   status: BookingStatus
   amount: number
   provider: string
}

export type NewUser = Omit<User, 'id'>
export type NewRoom = Omit<Room, 'id'>
export type NewBooking = Omit<Booking, 'id' | 'createdAt'>
