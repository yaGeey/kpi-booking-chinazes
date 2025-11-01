'use server'
import sql from './db'
import { Booking, NewBooking, BookingStatus, BookingJoined } from '../types'
import { sendBookingStatusEmail } from '../email'
import { getRoomById } from './rooms'
import { getUserById } from './users'

export async function createBooking(newBooking: NewBooking): Promise<Booking> {
   const [booking] = await sql`
      INSERT INTO booking ("userId", "roomId", status, "endDate", "startDate")
      VALUES (${newBooking.userId}, ${newBooking.roomId}, ${newBooking.status}, ${newBooking.endDate}, ${newBooking.startDate})
      RETURNING *;
   `
   return booking as Booking
}

export async function getBookingById(bookingId: number): Promise<Booking | null> {
   const [booking] = await sql`
      SELECT * FROM booking b
      WHERE id = ${bookingId};
   `
   return (booking as Booking) || null
}

export async function getBookingsByUserId(userId: number): Promise<Booking[]> {
   const bookings = await sql`
      SELECT * FROM booking WHERE "userId" = ${userId} ORDER BY "startDate" DESC;
   `
   return bookings as Booking[]
}

export async function updateBookingStatus(bookingId: number, status: BookingStatus): Promise<Booking | null> {
   const [booking] = await sql`
      UPDATE booking SET status = ${status}
      WHERE id = ${bookingId}
      RETURNING *;
   `

   if (booking) {
      try {
         const user = await getUserById(booking.userId)
         const room = await getRoomById(booking.roomId)

         if (user && room) {
            await sendBookingStatusEmail({
               to: user.email,
               userName: user.name,
               bookingId: booking.id,
               roomTitle: room.title,
               status: booking.status,
               startDate: booking.startDate,
               endDate: booking.endDate,
            })
         }
      } catch (error) {
         console.error('Failed to send email notification:', error)
      }
   }

   return (booking as Booking) || null
}

export async function cancelBooking(bookingId: number): Promise<Booking | null> {
   return updateBookingStatus(bookingId, 'CANCEL')
}

export async function getAllBookings(): Promise<BookingJoined[]> {
   const bookings = await sql`
      SELECT b.id, b."roomId", b."startDate", b."endDate", b.status, u.name as "userName", u.phone as "userPhone", b."createdAt"  FROM booking b
      JOIN "user" u ON b."userId" = u.id
      JOIN room r ON b."roomId" = r.id
      ORDER BY b."createdAt" DESC
   `
   return bookings as BookingJoined[]
}

export async function getBookedDatesByRoomId(roomId: number): Promise<{ startDate: string; endDate: string }[]> {
   const bookings = await sql`
      SELECT "startDate", "endDate"
      FROM booking
      WHERE "roomId" = ${roomId}
      AND status IN ('CREATE', 'CONFIRM')
      ORDER BY "startDate" ASC
   `
   return bookings.map((b) => ({
      startDate: b.startDate,
      endDate: b.endDate,
   }))
}
