import { notFound } from 'next/navigation'
import { formatPrice } from '@/lib/utils'
import BookingForm from '@/components/BookingForm'
import ImageGallery from '@/components/ImageGallery'
import RoomCalendar from '@/components/RoomCalendar'
import Link from 'next/link'
import { getRoomById, isRoomAvailable } from '@/lib/db/rooms'
import { getBookedDatesByRoomId } from '@/lib/db/bookings'

export default async function RoomPage({ params }: { params: Promise<{ id: string }> }) {
   const { id } = await params
   const room = await getRoomById(Number(id))
   if (!room) notFound()
   const isAvailable = await isRoomAvailable(room.id)
   const bookedDates = await getBookedDatesByRoomId(room.id)

   return (
      <main className="flex-1 py-12">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors">
               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
               </svg>
               Назад до списку кімнат
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               {/* Images Section */}
               {room.photos?.length && (
                  <div className="space-y-6">
                     <ImageGallery images={room.photos} roomName={room.title} />
                     <RoomCalendar bookedDates={bookedDates} />
                  </div>
               )}

               {/* Details Section */}
               <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">{room.title}</h1>

                  <div className="flex items-baseline gap-2 mb-6">
                     <span className="text-4xl font-bold text-blue-600">{formatPrice(room.pricePerNight)}</span>
                     <span className="text-xl text-gray-500">/за ніч</span>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <div className="text-gray-600 text-sm">Кількість осіб</div>
                           <div className="text-2xl font-semibold text-gray-900">До {room.capacity}</div>
                        </div>
                        <div>
                           <div className="text-gray-600 text-sm">Статус</div>
                           <div className="text-2xl font-semibold">
                              {isAvailable ? (
                                 <span className="text-green-600">Доступно</span>
                              ) : (
                                 <span className="text-red-600">Недоступно</span>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="mb-6">
                     <h2 className="text-2xl font-semibold text-gray-900 mb-3">Опис</h2>
                     <p className="text-gray-600 leading-relaxed">{room.description}</p>
                  </div>

                  {/* Booking Form */}
                  {isAvailable && (
                     <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Забронювати номер</h2>
                        <BookingForm room={room} />
                     </div>
                  )}
               </div>
            </div>
         </div>
      </main>
   )
}
