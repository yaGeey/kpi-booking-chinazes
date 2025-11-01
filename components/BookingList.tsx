'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Booking, BookingStatus, BookingJoined } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { updateBookingStatus } from '@/lib/db/bookings'

const statusLabels: Record<BookingStatus, string> = {
   CREATE: 'Очікує',
   CONFIRM: 'Підтверджено',
   CANCEL: 'Скасовано',
   COMPLETE: 'Завершено',
}

const statusColors: Record<BookingStatus, string> = {
   CREATE: 'bg-yellow-100 text-yellow-800',
   CONFIRM: 'bg-green-100 text-green-800',
   CANCEL: 'bg-red-100 text-red-800',
   COMPLETE: 'bg-blue-100 text-blue-800',
}

export default function BookingList({ bookings }: { bookings: BookingJoined[] }) {
   const router = useRouter()
   const [loading, setLoading] = useState<number | null>(null)

   const handleStatusUpdate = async (bookingId: number, newStatus: BookingStatus) => {
      setLoading(bookingId)

      try {
         await updateBookingStatus(bookingId, newStatus)
         router.refresh()
      } catch (error) {
         alert('Error updating booking status')
         console.error('Error updating booking status:', error)
      } finally {
         setLoading(null)
      }
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
            <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                     <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[booking.status]}`}>
                           {statusLabels[booking.status]}
                        </span>
                        <span className="text-sm text-gray-500">ID: #{booking.id}</span>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-600">
                        <div>
                           <span className="font-medium">Телефон:</span> {booking.userPhone}
                        </div>
                        <div>
                           <span className="font-medium">Ім'я:</span> {booking.userName}
                        </div>
                        <div>
                           <span className="font-medium">Room ID:</span> {booking.roomId}
                        </div>
                        <div>
                           <span className="font-medium">Створено:</span> {formatDate(booking.createdAt)}
                        </div>
                        <div>
                           <span className="font-medium">Заїзд:</span> {formatDate(booking.startDate)}
                        </div>
                        <div>
                           <span className="font-medium">Виїзд:</span> {formatDate(booking.endDate)}
                        </div>
                     </div>
                  </div>

                  {booking.status === 'CREATE' && (
                     <div className="flex gap-2">
                        <button
                           onClick={() => handleStatusUpdate(booking.id, 'CONFIRM')}
                           disabled={loading === booking.id}
                           className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                           {loading === booking.id ? 'Обробка...' : 'Підтвердити'}
                        </button>
                        <button
                           onClick={() => handleStatusUpdate(booking.id, 'CANCEL')}
                           disabled={loading === booking.id}
                           className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                           {loading === booking.id ? 'Обробка...' : 'Скасувати'}
                        </button>
                     </div>
                  )}

                  {booking.status === 'CONFIRM' && (
                     <button
                        onClick={() => {
                           if (window.confirm('⚠️ Ви впевнені, що хочете скасувати підтверджене бронювання?'))
                              handleStatusUpdate(booking.id, 'CANCEL')
                        }}
                        disabled={loading === booking.id}
                        className="px-3 py-1.5 bg-orange-600 text-white text-sm rounded hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                        {loading === booking.id ? 'Обробка...' : 'Скасувати'}
                     </button>
                  )}
               </div>
            </div>
         ))}
      </div>
   )
}
