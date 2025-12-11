// lib/db/rooms.ts
import db from './db'
import { Room, NewRoom } from '../types'

export async function createRoom(newRoom: NewRoom): Promise<Room> {
  const [room] = await db.query(
    `INSERT INTO room (capacity, "pricePerNight", title, description, photos)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [newRoom.capacity, newRoom.pricePerNight, newRoom.title, newRoom.description, newRoom.photos]
  )
  return room as Room
}

export async function getRoomById(id: number): Promise<Room | null> {
  const [room] = await db.query('SELECT * FROM room WHERE id = $1', [id])
  return (room as Room) || null
}

export async function getAllRooms(): Promise<Room[]> {
  const rooms = await db.query('SELECT * FROM room')
  return rooms as Room[]
}

export async function getFilteredRooms(filters: {
  capacity?: number
  minPrice?: number
  maxPrice?: number
} = {}): Promise<Room[]> {
  let query = 'SELECT * FROM room WHERE 1=1'
  const params: any[] = []

  if (filters.capacity != null && !Number.isNaN(filters.capacity)) {
    params.push(filters.capacity)
    query += ` AND capacity >= $${params.length}`
  }

  if (filters.minPrice != null && !Number.isNaN(filters.minPrice)) {
    params.push(filters.minPrice)
    query += ` AND "pricePerNight" >= $${params.length}`
  }

  if (filters.maxPrice != null && !Number.isNaN(filters.maxPrice)) {
    params.push(filters.maxPrice)
    query += ` AND "pricePerNight" <= $${params.length}`
  }

  const rooms = await db.query(query, params)
  return rooms as Room[]
}

export async function isRoomAvailable(
  roomId: number,
  startDate?: Date,
  endDate?: Date
): Promise<boolean> {
  if (!startDate || !endDate) {
    startDate = new Date()
    endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + 1)
  }

  const result = await db.query(
    `SELECT COUNT(*) as count FROM booking
     WHERE "roomId" = $1
       AND status='CONFIRM'
       AND ("startDate" <= $2 AND "endDate" >= $3)`,
    [roomId, endDate, startDate]
  )

  return Number(result[0]?.count ?? 0) === 0
}
