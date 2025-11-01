import { getAllRooms } from '@/lib/db/rooms'
import RoomCard from '@/components/RoomCard'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default async function Home() {
   const rooms = await getAllRooms()

   return (
      <main className="flex-1">
         {/* Hero Section */}
         <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
               <h1 className="text-4xl md:text-5xl font-bold mb-4">Ласкаво просимо до Booking Room</h1>
               <p className="text-xl md:text-2xl text-blue-100 mb-4">Знайдіть ідеальну кімнату для вашого відпочинку</p>
               {/* <div className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold">
                     <span>🏨</span>
                     <span>Доступно кімнат: {rooms.length}</span>
                  </div> */}
            </div>
         </section>

         {/* Rooms Section */}
         <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Наші кімнати</h2>
                  <p className="text-gray-600 text-lg">Оберіть кімнату, яка найкраще підходить для вас</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {rooms.map((room) => (
                     <RoomCard key={room.id} room={room} />
                  ))}
               </div>
            </div>
         </section>

         {/* Features Section */}
         <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                     <div className="text-4xl mb-4">⚡</div>
                     <h3 className="text-xl font-semibold mb-2">Швидке бронювання</h3>
                     <p className="text-gray-600">Забронюйте кімнату всього за кілька кліків</p>
                  </div>
                  <div className="text-center">
                     <div className="text-4xl mb-4">💰</div>
                     <h3 className="text-xl font-semibold mb-2">Прозорі ціни</h3>
                     <p className="text-gray-600">Без прихованих платежів та додаткових зборів</p>
                  </div>
                  <div className="text-center">
                     <div className="text-4xl mb-4">🛡️</div>
                     <h3 className="text-xl font-semibold mb-2">Безпека даних</h3>
                     <p className="text-gray-600">Ваші дані надійно захищені</p>
                  </div>
               </div>
            </div>
         </section>
      </main>
   )
}
