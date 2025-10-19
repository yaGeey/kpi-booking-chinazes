import { Room, Booking } from '@/types'

// Тимчасові дані для демонстрації (пізніше буде замінено на API з NeonDB)
export const mockRooms: Room[] = [
   {
      id: '1',
      name: 'Стандартний номер',
      description: 'Затишний номер з одним двоспальним ліжком, ідеальний для пар або індивідуальних мандрівників.',
      price: 1200,
      capacity: 2,
      images: [
         'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
         'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
      ],
      amenities: ['Wi-Fi', 'Кондиціонер', 'Телевізор', 'Міні-бар'],
      available: true,
   },
   {
      id: '2',
      name: 'Сімейний номер',
      description: 'Просторий номер з двома спальнями, ідеальний для сімей з дітьми.',
      price: 2400,
      capacity: 4,
      images: [
         'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
         'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
      ],
      amenities: ['Wi-Fi', 'Кондиціонер', 'Телевізор', 'Кухня', 'Балкон'],
      available: true,
   },
   {
      id: '3',
      name: 'Люкс',
      description: 'Розкішний номер з панорамним видом, окремою вітальнею та преміум зручностями.',
      price: 4500,
      capacity: 2,
      images: [
         'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
         'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
      ],
      amenities: ['Wi-Fi', 'Кондиціонер', 'Телевізор', 'Міні-бар', 'Джакузі', 'Балкон', 'Панорамний вид'],
      available: true,
   },
   {
      id: '4',
      name: 'Економ номер',
      description: 'Доступний номер з основними зручностями для бюджетних мандрівників.',
      price: 800,
      capacity: 1,
      images: ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800'],
      amenities: ['Wi-Fi', 'Телевізор'],
      available: true,
   },
   {
      id: '5',
      name: 'Президентський люкс',
      description: 'Найрозкішніший номер готелю з окремою їдальнею, кабінетом та ексклюзивними послугами.',
      price: 8000,
      capacity: 4,
      images: [
         'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800',
         'https://images.unsplash.com/photo-1631049035182-249067d7618e?w=800',
      ],
      amenities: ['Wi-Fi', 'Кондиціонер', 'Телевізор', 'Міні-бар', 'Джакузі', 'Балкон', 'Панорамний вид', 'Особистий консьєрж', 'Кухня'],
      available: true,
   },
]

export const mockBookings: Booking[] = [
   {
      id: '1',
      roomId: '1',
      userId: 'user1',
      userName: 'Іван Петренко',
      userEmail: 'ivan@example.com',
      userPhone: '+380501234567',
      checkIn: '2025-10-15',
      checkOut: '2025-10-18',
      status: 'pending',
      totalPrice: 3600,
      createdAt: '2025-10-06T10:00:00Z',
   },
   {
      id: '2',
      roomId: '2',
      userId: 'user2',
      userName: 'Марія Коваленко',
      userEmail: 'maria@example.com',
      userPhone: '+380507654321',
      checkIn: '2025-10-20',
      checkOut: '2025-10-23',
      status: 'confirmed',
      totalPrice: 7200,
      createdAt: '2025-10-05T14:30:00Z',
   },
]

// Функції для роботи з даними (пізніше будуть замінені на API запити)
export async function getRooms(): Promise<Room[]> {
   // Симуляція затримки мережі
   await new Promise((resolve) => setTimeout(resolve, 100))
   return mockRooms
}

export async function getRoomById(id: string): Promise<Room | undefined> {
   await new Promise((resolve) => setTimeout(resolve, 100))
   return mockRooms.find((room) => room.id === id)
}

export async function getBookings(): Promise<Booking[]> {
   await new Promise((resolve) => setTimeout(resolve, 100))
   return mockBookings
}

export async function createBooking(booking: Omit<Booking, 'id' | 'createdAt' | 'status'>): Promise<Booking> {
   await new Promise((resolve) => setTimeout(resolve, 100))
   const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
   }
   mockBookings.push(newBooking)
   return newBooking
}

export async function updateBookingStatus(id: string, status: Booking['status']): Promise<Booking | undefined> {
   await new Promise((resolve) => setTimeout(resolve, 100))
   const booking = mockBookings.find((b) => b.id === id)
   if (booking) {
      booking.status = status
   }
   return booking
}
