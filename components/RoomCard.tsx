'use server'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import { Room } from '@/lib/types'
import { isRoomAvailable } from '@/lib/db/rooms'

export default async function RoomCard({ room }: { room: Room }) {
   return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
         <div className="relative h-64 w-full">
            <Image
               src={room.photos ? room.photos?.[0] : 'https://craftsnippets.com/articles_images/placeholder/placeholder.jpg'}
               alt={room.title}
               fill
               className="object-cover"
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {!(await isRoomAvailable(room.id, new Date(), new Date())) && (
               <div className="absolute inset-0 bg-black/75 flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">Недоступно</span>
               </div>
            )}
         </div>

         <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{room.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{room.description}</p>

            <div className="flex items-center justify-between mb-4">
               <span className="text-2xl font-bold text-blue-600">
                  {formatPrice(room.pricePerNight)}
                  <span className="text-sm text-gray-500 font-normal">/ніч</span>
               </span>
               <span className="text-gray-600">
                  До {room.capacity} {room.capacity === 1 ? 'особи' : 'осіб'}
               </span>
            </div>

            <Link
               href={`/rooms/${room.id}`}
               className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
               Переглянути деталі
            </Link>
         </div>
      </div>
   )
}
