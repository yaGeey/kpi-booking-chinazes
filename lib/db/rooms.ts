'use server'
import sql from './db'
import { Room, NewRoom } from '../types'

export async function createRoom(newRoom: NewRoom): Promise<Room> {
   const [room] = await sql`
      INSERT INTO room (capacity, "pricePerNight", title, description, photos)
      VALUES (${newRoom.capacity}, ${newRoom.pricePerNight}, ${newRoom.title}, ${newRoom.description}, ${newRoom.photos})
      RETURNING *;
   `
   return room as Room
}

export async function getRoomById(id: number): Promise<Room | null> {
   const [room] = await sql`SELECT * FROM room WHERE id = ${id};`
   return (room as Room) || null
}

export async function getAllRooms(): Promise<Room[]> {
   const rooms = await sql`SELECT * FROM room;`
   return rooms as Room[]
}

export async function isRoomAvailable(roomId: number, startDate?: Date, endDate?: Date): Promise<boolean> {
   if (!startDate || !endDate) {
      startDate = new Date()
      endDate = new Date(startDate)
      endDate.setDate(endDate.getDate() + 1)
   }
   const conflicts = await sql`
      SELECT COUNT(*) as count FROM booking
      WHERE "id" = ${roomId}
      AND status IN ('CONFIRM')
      AND (
         ("startDate" <= ${endDate}) AND ("endDate" >= ${startDate})
      );
   `
   return Number(conflicts[0].count) === 0
}

export async function updateRoom(id: number, updates: Partial<NewRoom>): Promise<Room | null> {
   const currentRoom = await getRoomById(id)
   if (!currentRoom) return null

   const [room] = await sql`
      UPDATE room 
      SET 
         capacity = ${updates.capacity ?? currentRoom.capacity},
         pricePerNight = ${updates.pricePerNight ?? currentRoom.pricePerNight},
         title = ${updates.title ?? currentRoom.title},
         description = ${updates.description ?? currentRoom.description},
         photos = ${updates.photos ?? currentRoom.photos}
      WHERE id = ${id}
      RETURNING *;
   `
   return (room as Room) || null
}

export async function deleteRoom(id: number): Promise<boolean> {
   const result = await sql`DELETE FROM room WHERE id = ${id};`
   return result.length > 0
}
