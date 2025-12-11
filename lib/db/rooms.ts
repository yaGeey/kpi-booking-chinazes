// lib/db/rooms.ts
'use server'
import sql from './db'
import { Room, NewRoom } from '../types'

export async function createRoom(newRoom: NewRoom): Promise<Room> {
   const result = await sql`
    INSERT INTO room (capacity, "pricePerNight", title, description, photos)
    VALUES (${newRoom.capacity}, ${newRoom.pricePerNight}, ${newRoom.title}, ${newRoom.description}, ${newRoom.photos})
    RETURNING *;
  `
   return result[0] as Room
}

export async function getRoomById(id: number): Promise<Room | null> {
   const result = await sql`SELECT * FROM room WHERE id = ${id};`
   return (result[0] as Room) || null
}

export async function getAllRooms(): Promise<Room[]> {
   const result = await sql`SELECT * FROM room`
   return result as Room[]
}

export async function getFilteredRooms(
   filters: {
      capacity?: number
      minPrice?: number
      maxPrice?: number
   } = {}
): Promise<Room[]> {
   // Якщо немає фільтрів - повертаємо всі кімнати
   if (!filters.capacity && !filters.minPrice && !filters.maxPrice) {
      return (await sql`SELECT * FROM room ORDER BY id`) as Room[]
   }

   // Застосовуємо фільтри
   let rooms: any[]

   if (filters.capacity && filters.minPrice && filters.maxPrice) {
      rooms = await sql`
      SELECT * FROM room 
      WHERE capacity >= ${filters.capacity} 
        AND "pricePerNight" >= ${filters.minPrice}
        AND "pricePerNight" <= ${filters.maxPrice}
      ORDER BY id
    `
   } else if (filters.capacity && filters.minPrice) {
      rooms = await sql`
      SELECT * FROM room 
      WHERE capacity >= ${filters.capacity} 
        AND "pricePerNight" >= ${filters.minPrice}
      ORDER BY id
    `
   } else if (filters.capacity && filters.maxPrice) {
      rooms = await sql`
      SELECT * FROM room 
      WHERE capacity >= ${filters.capacity} 
        AND "pricePerNight" <= ${filters.maxPrice}
      ORDER BY id
    `
   } else if (filters.minPrice && filters.maxPrice) {
      rooms = await sql`
      SELECT * FROM room 
      WHERE "pricePerNight" >= ${filters.minPrice}
        AND "pricePerNight" <= ${filters.maxPrice}
      ORDER BY id
    `
   } else if (filters.capacity) {
      rooms = await sql`SELECT * FROM room WHERE capacity >= ${filters.capacity} ORDER BY id`
   } else if (filters.minPrice) {
      rooms = await sql`SELECT * FROM room WHERE "pricePerNight" >= ${filters.minPrice} ORDER BY id`
   } else {
      rooms = await sql`SELECT * FROM room WHERE "pricePerNight" <= ${filters.maxPrice} ORDER BY id`
   }

   return rooms as Room[]
}

export async function isRoomAvailable(roomId: number, startDate?: Date, endDate?: Date): Promise<boolean> {
   if (!startDate || !endDate) {
      startDate = new Date()
      endDate = new Date(startDate)
      endDate.setDate(endDate.getDate() + 1)
   }

   const result = await sql`
    SELECT COUNT(*) as count FROM booking
    WHERE "id" = ${roomId}
    AND status IN ('CONFIRM')
    AND (
       ("startDate" <= ${endDate}) AND ("endDate" >= ${startDate})
    );
  `

   return Number(result[0]?.count ?? 0) === 0
}
