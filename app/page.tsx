'use client'

import { useState, useEffect } from 'react'
import RoomFilters from '@/components/RoomFilters'
import RoomCard from '@/components/RoomCard'
import type { Room } from '@/lib/types'

export default function HomePage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [hasFiltersApplied, setHasFiltersApplied] = useState(false)

  const loadRooms = async (filters = {}) => {
    setIsLoading(true)
    setError(null)
    
    const hasActiveFilters = Object.keys(filters).length > 0
    setHasFiltersApplied(hasActiveFilters)
    
    try {
      const res = await fetch('/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters),
      })
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.error || `HTTP ${res.status}`)
      }
      
      const data = await res.json()
      setRooms(Array.isArray(data) ? data : [])
      setShowFilters(false)
    } catch (err: any) {
      console.error('Error loading rooms:', err)
      setError(err?.message || 'Помилка при завантаженні кімнат')
      setRooms([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadRooms()
  }, [])

  useEffect(() => {
    const handleOpenFilters = () => setShowFilters(true)
    window.addEventListener('openFilters', handleOpenFilters)
    return () => window.removeEventListener('openFilters', handleOpenFilters)
  }, [])

  return (
    <main className="flex-1">
      
      {/* Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Фільтр кімнат</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-600 hover:text-gray-900 text-2xl leading-none"
              >
                ✕
              </button>
            </div>
            <RoomFilters onFilterChange={loadRooms} />
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            ⚠️ {error}
          </div>
        </div>
      )}

      {/* Rooms Section */}
      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title and Filter Info */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Доступні кімнати</h1>
            {hasFiltersApplied && !isLoading && (
              <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded inline-flex items-center gap-2">
                <span>🔍</span>
                <span>Застосовано фільтр</span>
                <button
                  onClick={() => loadRooms()}
                  className="ml-2 text-blue-800 hover:text-blue-900 underline font-medium"
                >
                  Скинути
                </button>
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-gray-600">
              <div className="inline-block animate-spin text-4xl mb-2">⏳</div>
              <p className="text-lg">Завантаження кімнат...</p>
            </div>
          ) : rooms.length > 0 ? (
            <div>
              <div className="mb-6 text-gray-600">
                <p>
                  Знайдено кімнат: <span className="font-bold text-gray-900">{rooms.length}</span>
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {rooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏠</div>
              <p className="text-xl text-gray-700 font-medium mb-2">
                {hasFiltersApplied 
                  ? 'Кімнат за заданим фільтром не знайдено'
                  : 'Кімнат не знайдено'}
              </p>
              {hasFiltersApplied && (
                <button
                  onClick={() => loadRooms()}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                  Показати всі кімнати
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
