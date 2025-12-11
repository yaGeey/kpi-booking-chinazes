// app/RoomsPage.tsx
'use client'

import { useState, useEffect } from 'react'
import RoomCard from '@/components/RoomCard'
import RoomFilters from '@/components/RoomFilters'

interface Room {
  id: number
  title: string
  description: string
  capacity: number
  pricePerNight: number
  photos: string[]
  available: boolean
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const loadRooms = async (filters = {}) => {
    setLoading(true)
    try {
      const res = await fetch('/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters),
      })
      const data = await res.json()
      setRooms(data)
    } catch (err) {
      console.error('Error loading rooms:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRooms()
  }, [])

  const handleFilterChange = (filters: { minPrice?: number; maxPrice?: number; capacity?: number; available?: boolean }) => {
    loadRooms(filters)
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Наші кімнати</h1>

      {/* Фільтри */}
      <RoomFilters onFilterChange={handleFilterChange} />

      {/* Список кімнат */}
      {loading ? (
        <p className="text-center text-gray-500">Завантаження кімнат...</p>
      ) : rooms.length === 0 ? (
        <p className="text-center text-gray-500">Немає доступних кімнат за цими параметрами.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {rooms.map(room => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </main>
  )
}
