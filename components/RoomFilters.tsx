'use client'
import { useState } from 'react'

interface RoomFiltersProps {
  onFilterChange: (filters: { capacity?: number; minPrice?: number; maxPrice?: number }) => void
}

export default function RoomFilters({ onFilterChange }: RoomFiltersProps) {
  const [capacity, setCapacity] = useState<string>('')
  const [minPrice, setMinPrice] = useState<string>('')
  const [maxPrice, setMaxPrice] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const applyFilters = async () => {
    setIsLoading(true)
    
    const filters: { capacity?: number; minPrice?: number; maxPrice?: number } = {}
    
    if (capacity && !isNaN(Number(capacity)) && Number(capacity) > 0) {
      filters.capacity = Number(capacity)
    }
    
    if (minPrice && !isNaN(Number(minPrice)) && Number(minPrice) >= 0) {
      filters.minPrice = Number(minPrice)
    }
    
    if (maxPrice && !isNaN(Number(maxPrice)) && Number(maxPrice) >= 0) {
      filters.maxPrice = Number(maxPrice)
    }
    
    await onFilterChange(filters)
    setIsLoading(false)
  }

  const handleReset = () => {
    setCapacity('')
    setMinPrice('')
    setMaxPrice('')
    onFilterChange({})
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Кількість людей (до)
        </label>
        <input
          type="number"
          placeholder="Наприклад: 4"
          value={capacity}
          onChange={e => setCapacity(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
          min="1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Мінімальна ціна за ніч (грн)
        </label>
        <input
          type="number"
          placeholder="Від"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Максимальна ціна за ніч (грн)
        </label>
        <input
          type="number"
          placeholder="До"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
          min="0"
        />
      </div>

      <div className="flex gap-2 mt-2">
        <button
          onClick={applyFilters}
          disabled={isLoading}
          className="flex-1 bg-blue-600 text-white px-4 py-3 rounded font-medium hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Завантаження...' : 'Застосувати фільтр'}
        </button>
        <button
          onClick={handleReset}
          disabled={isLoading}
          className="flex-1 bg-gray-500 text-white px-4 py-3 rounded font-medium hover:bg-gray-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Скинути
        </button>
      </div>
    </div>
  )
}