import BookingList from '@/components/BookingList'
import RefreshButton from '@/components/RefreshButton'
import { getAllBookings } from '@/lib/db/bookings'
import { getAllRooms, isRoomAvailable } from '@/lib/db/rooms'

export default async function AdminPage() {
   const bookings = await getAllBookings()
   const rooms = await getAllRooms()
   console.log(bookings)

   const stats = {
      totalBookings: bookings.length,
      pendingBookings: bookings.filter((b) => b.status === 'CREATE').length,
      confirmedBookings: bookings.filter((b) => b.status === 'CONFIRM').length,
      totalRooms: rooms.length,
      availableRooms: rooms.filter(async (r) => await isRoomAvailable(r.id)).length,
   }

   return (
      <main className="flex-1 py-12 bg-gray-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
               <h1 className="text-4xl font-bold text-gray-900 mb-2">Адміністративна панель</h1>
               <p className="text-gray-600">Управління бронюваннями та кімнатами</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
               <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="text-gray-600 text-sm mb-2">Всього бронювань</div>
                  <div className="text-3xl font-bold text-gray-900">{stats.totalBookings}</div>
               </div>

               <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="text-gray-600 text-sm mb-2">Очікують</div>
                  <div className="text-3xl font-bold text-yellow-600">{stats.pendingBookings}</div>
               </div>

               <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="text-gray-600 text-sm mb-2">Підтверджено</div>
                  <div className="text-3xl font-bold text-green-600">{stats.confirmedBookings}</div>
               </div>

               <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="text-gray-600 text-sm mb-2">Всього кімнат</div>
                  <div className="text-3xl font-bold text-gray-900">{stats.totalRooms}</div>
               </div>

               <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="text-gray-600 text-sm mb-2">Доступно кімнат</div>
                  <div className="text-3xl font-bold text-blue-600">{stats.availableRooms}</div>
               </div>
            </div>

            {/* Bookings Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
               <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Запити на бронювання</h2>
                  <RefreshButton />
               </div>
               <BookingList bookings={bookings} />
            </div>

            {/* Rooms Management */}
            <div className="bg-white rounded-lg shadow-md p-6">
               <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Кімнати</h2>
                  {/* <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        + Додати кімнату
                     </button> */}
               </div>

               <div className="space-y-4">
                  {rooms.map(async (room) => {
                     const isAvailable = await isRoomAvailable(room.id)
                     return (
                        <div
                           key={room.id}
                           className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                        >
                           <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-1">{room.title}</h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                 <span>{room.pricePerNight} ₴/ніч</span>
                                 <span>До {room.capacity} осіб</span>
                              </div>
                           </div>
                           <div className="flex gap-2">
                              <span className={isAvailable ? 'text-green-600' : 'text-red-600'}>
                                 {isAvailable ? 'Доступна' : 'Недоступна'}
                              </span>
                              {/* <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                                 Редагувати
                              </button>
                              <button className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors">
                                 Видалити
                              </button> */}
                           </div>
                        </div>
                     )
                  })}
               </div>
            </div>
         </div>
      </main>
   )
}
