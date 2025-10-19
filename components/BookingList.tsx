'use client'

import { useState } from 'react'
import { Booking } from '@/types'
import { formatDate, formatPrice } from '@/lib/utils'

interface BookingListProps {
   bookings: Booking[]
}

const statusLabels = {
   pending: 'Очікує',
   confirmed: 'Підтверджено',
   rejected: 'Відхилено',
   cancelled: 'Скасовано',
}

const statusColors = {
   pending: 'bg-yellow-100 text-yellow-800',
   confirmed: 'bg-green-100 text-green-800',
   rejected: 'bg-red-100 text-red-800',
   cancelled: 'bg-gray-100 text-gray-800',
}

export default function BookingList({ bookings: initialBookings }: BookingListProps) {
   const [bookings, setBookings] = useState(initialBookings)
   const [loading, setLoading] = useState<string | null>(null)

   const handleStatusUpdate = async (bookingId: string, newStatus: Booking['status']) => {
      setLoading(bookingId)

      // Симуляція API запиту
      await new Promise((resolve) => setTimeout(resolve, 500))

      setBookings((prev) => prev.map((booking) => (booking.id === bookingId ? { ...booking, status: newStatus } : booking)))

      setLoading(null)
   }

   if (bookings.length === 0) {
      return (
         <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Бронювань поки немає</p>
         </div>
      )
   }

   return (
      <div className="space-y-4">
         {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                     <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{booking.userName}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[booking.status]}`}>
                           {statusLabels[booking.status]}
                        </span>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                        <div>
                           <span className="font-medium">Email:</span> {booking.userEmail}
                        </div>
                        <div>
                           <span className="font-medium">Телефон:</span> {booking.userPhone}
                        </div>
                        <div>
                           <span className="font-medium">Заїзд:</span> {formatDate(booking.checkIn)}
                        </div>
                        <div>
                           <span className="font-medium">Виїзд:</span> {formatDate(booking.checkOut)}
                        </div>
                     </div>

                     <div className="mt-2">
                        <span className="text-lg font-bold text-blue-600">{formatPrice(booking.totalPrice)}</span>
                     </div>
                  </div>

                  {booking.status === 'pending' && (
                     <div className="flex gap-2">
                        <button
                           onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                           disabled={loading === booking.id}
                           className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                           {loading === booking.id ? 'Обробка...' : 'Підтвердити'}
                        </button>
                        <button
                           onClick={() => handleStatusUpdate(booking.id, 'rejected')}
                           disabled={loading === booking.id}
                           className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                           {loading === booking.id ? 'Обробка...' : 'Відхилити'}
                        </button>
                     </div>
                  )}
               </div>
            </div>
         ))}
      </div>
   )
}
