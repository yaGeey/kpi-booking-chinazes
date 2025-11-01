import { notFound } from 'next/navigation'
import { getRoomById } from '@/lib/data'
import { formatPrice } from '@/lib/utils'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BookingForm from '@/components/BookingForm'
import ImageGallery from '@/components/ImageGallery'

export default async function RoomPage({ params }: { params: Promise<{ id: string }> }) {
   const { id } = await params
   const room = await getRoomById(id)
   if (!room) notFound()

   return (
      <>
         <Header />
         <main className="flex-1 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               {/* Back Button */}
               <a href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Назад до списку кімнат
               </a>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Images Section */}
                  <div>
                     <ImageGallery images={room.images} roomName={room.name} />
                  </div>

                  {/* Details Section */}
                  <div>
                     <h1 className="text-4xl font-bold text-gray-900 mb-4">{room.name}</h1>

                     <div className="flex items-baseline gap-2 mb-6">
                        <span className="text-4xl font-bold text-blue-600">{formatPrice(room.price)}</span>
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
                                 {room.available ? (
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

                     {/* <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Зручності</h2>
                        <div className="grid grid-cols-2 gap-3">
                           {room.amenities.map((amenity) => (
                              <div key={amenity} className="flex items-center gap-2 text-gray-700">
                                 <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                 </svg>
                                 {amenity}
                              </div>
                           ))}
                        </div>
                     </div> */}

                     {/* Booking Form */}
                     {room.available && (
                        <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                           <h2 className="text-2xl font-semibold text-gray-900 mb-4">Забронювати номер</h2>
                           <BookingForm roomId={room.id} roomName={room.name} pricePerNight={room.price} />
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </main>
         <Footer />
      </>
   )
}
