import Image from 'next/image'
import Link from 'next/link'
import { Room } from '@/types'
import { formatPrice } from '@/lib/utils'

interface RoomCardProps {
   room: Room
}

export default function RoomCard({ room }: RoomCardProps) {
   return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
         <div className="relative h-64 w-full">
            <Image
               src={room.images[0]}
               alt={room.name}
               fill
               className="object-cover"
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {!room.available && (
               <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">Недоступно</span>
               </div>
            )}
         </div>

         <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{room.name}</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{room.description}</p>

            <div className="flex items-center justify-between mb-4">
               <span className="text-2xl font-bold text-blue-600">
                  {formatPrice(room.price)}
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
