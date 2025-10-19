'use client'

import { useState } from 'react'

interface RoomFiltersProps {
   onFilterChange?: (filters: FilterState) => void
}

export interface FilterState {
   minPrice: number
   maxPrice: number
   capacity: number
   searchQuery: string
}

export default function RoomFilters({ onFilterChange }: RoomFiltersProps) {
   const [filters, setFilters] = useState<FilterState>({
      minPrice: 0,
      maxPrice: 10000,
      capacity: 0,
      searchQuery: '',
   })

   const handleFilterChange = (key: keyof FilterState, value: number | string) => {
      const newFilters = { ...filters, [key]: value }
      setFilters(newFilters)
      onFilterChange?.(newFilters)
   }

   const resetFilters = () => {
      const defaultFilters: FilterState = {
         minPrice: 0,
         maxPrice: 10000,
         capacity: 0,
         searchQuery: '',
      }
      setFilters(defaultFilters)
      onFilterChange?.(defaultFilters)
   }

   return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
         <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Фільтри пошуку</h3>
            <button onClick={resetFilters} className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
               Скинути
            </button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">Пошук</label>
               <input
                  type="text"
                  value={filters.searchQuery}
                  onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                  placeholder="Назва кімнати..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
               />
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">Мін. ціна (₴)</label>
               <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
               />
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">Макс. ціна (₴)</label>
               <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
               />
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">Кількість осіб</label>
               <select
                  value={filters.capacity}
                  onChange={(e) => handleFilterChange('capacity', Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
               >
                  <option value="0">Будь-яка</option>
                  <option value="1">1 особа</option>
                  <option value="2">2 особи</option>
                  <option value="3">3 особи</option>
                  <option value="4">4+ особи</option>
               </select>
            </div>
         </div>
      </div>
   )
}
