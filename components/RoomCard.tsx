'use client'
import Link from 'next/link'

interface Room {
  id: number
  title: string
  description: string
  capacity: number
  pricePerNight: number
  photos?: string[]
}

export default function RoomCard({ room }: { room: Room }) {
  const imageUrl = room.photos?.[0] || '/placeholder-room.jpg'

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Room Image */}
      <div className="relative w-full h-48 bg-gray-200">
        <img
          src={imageUrl}
          alt={room.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-room.jpg'
          }}
        />
      </div>

      {/* Room Info */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{room.title}</h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {room.description}
        </p>

        {/* Room Details */}
        <div className="flex items-center justify-between mb-4 py-2 border-t border-b border-gray-100">
          <div className="flex items-center gap-1">
            <span className="text-lg">👥</span>
            <span className="text-sm text-gray-700">
              До {room.capacity} осіб
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-lg">₴</span>
            <span className="text-sm font-bold text-blue-600">
              {room.pricePerNight}/ніч
            </span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href={`/rooms/${room.id}`}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition text-center font-medium"
        >
          Дізнатися більше
        </Link>
      </div>
    </div>
  )
}