import { type Room, type Booking, type NewBooking, type BookingStatus } from '@/lib/types'

// Mock NeonDB client
jest.mock('@/lib/db/db', () => {
   const mockSql = jest.fn()
   return {
      __esModule: true,
      default: mockSql,
   }
})

// Mock Email module
jest.mock('@/lib/email', () => ({
   sendBookingStatusEmail: jest.fn(),
}))

import sql from '@/lib/db/db'
import * as roomsDb from '@/lib/db/rooms'
import * as bookingsDb from '@/lib/db/bookings'

const mockSql = sql as jest.MockedFunction<any>

describe('Компонентне тестування - Database Operations', () => {
   beforeEach(() => {
      jest.clearAllMocks()
   })

   describe('Rooms Database Component', () => {
      it('getAllRooms повертає список всіх кімнат з БД', async () => {
         // Arrange
         const mockRooms: Room[] = [
            {
               id: 1,
               title: 'Стандарт',
               description: 'Комфортний номер',
               capacity: 2,
               pricePerNight: 1000,
               photos: ['/img1.jpg'],
            },
            {
               id: 2,
               title: 'Люкс',
               description: 'VIP номер',
               capacity: 4,
               pricePerNight: 2500,
               photos: ['/img2.jpg'],
            },
         ]

         mockSql.mockResolvedValueOnce(mockRooms)

         // Act
         const rooms = await roomsDb.getAllRooms()

         // Assert
         expect(mockSql).toHaveBeenCalledWith(expect.arrayContaining([expect.stringContaining('SELECT * FROM room')]))
         expect(rooms).toHaveLength(2)
         expect(rooms[0].title).toBe('Стандарт')
         expect(rooms[1].pricePerNight).toBe(2500)
      })

      it('getRoomById повертає конкретну кімнату', async () => {
         // Arrange
         const mockRoom: Room = {
            id: 1,
            title: 'Стандарт',
            description: 'Опис',
            capacity: 2,
            pricePerNight: 1000,
            photos: [],
         }

         mockSql.mockResolvedValueOnce([mockRoom])

         // Act
         const room = await roomsDb.getRoomById(1)

         // Assert
         expect(mockSql).toHaveBeenCalled()
         const callArgs = mockSql.mock.calls[0]
         expect(callArgs.join('')).toContain('SELECT * FROM room WHERE id =')
         expect(room).toBeDefined()
         expect(room?.id).toBe(1)
         expect(room?.title).toBe('Стандарт')
      })

      it('getRoomById повертає null для неіснуючої кімнати', async () => {
         // Arrange
         mockSql.mockResolvedValueOnce([])

         // Act
         const room = await roomsDb.getRoomById(999)

         // Assert
         expect(room).toBeNull()
      })

      it('createRoom додає нову кімнату в БД', async () => {
         // Arrange
         const newRoom = {
            title: 'Нова кімната',
            description: 'Опис нової кімнати',
            capacity: 3,
            pricePerNight: 1500,
            photos: ['/new.jpg'],
         }

         const createdRoom: Room = {
            id: 3,
            ...newRoom,
         }

         mockSql.mockResolvedValueOnce([createdRoom])

         // Act
         const room = await roomsDb.createRoom(newRoom)

         // Assert
         expect(mockSql).toHaveBeenCalled()
         const callArgs = mockSql.mock.calls[0]
         expect(callArgs.join('')).toContain('INSERT INTO room')
         expect(room.id).toBe(3)
         expect(room.title).toBe('Нова кімната')
      })

      it('isRoomAvailable перевіряє доступність кімнати', async () => {
         // Arrange
         mockSql.mockResolvedValueOnce([{ count: 0 }])

         // Act
         const isAvailable = await roomsDb.isRoomAvailable(1, new Date('2025-12-01'), new Date('2025-12-05'))

         // Assert
         expect(mockSql).toHaveBeenCalled()
         const callArgs = mockSql.mock.calls[0]
         expect(callArgs.join('')).toContain('SELECT COUNT(*) as count FROM booking')
         expect(isAvailable).toBe(true)
      })

      it('isRoomAvailable повертає false при конфлікті дат', async () => {
         // Arrange
         mockSql.mockResolvedValueOnce([{ count: 1 }])

         // Act
         const isAvailable = await roomsDb.isRoomAvailable(1, new Date('2025-12-01'), new Date('2025-12-05'))

         // Assert
         expect(isAvailable).toBe(false)
      })
   })

   describe('Bookings Database Component', () => {
      it('createBooking створює нове бронювання в БД', async () => {
         // Arrange
         const newBooking: NewBooking = {
            userId: 1,
            roomId: 101,
            status: 'CREATE',
            startDate: '2025-12-01',
            endDate: '2025-12-05',
         }

         const createdBooking: Booking = {
            id: 1,
            ...newBooking,
            createdAt: new Date().toISOString(),
         }

         mockSql.mockResolvedValueOnce([createdBooking])

         // Act
         const booking = await bookingsDb.createBooking(newBooking)

         // Assert
         expect(mockSql).toHaveBeenCalled()
         const callArgs = mockSql.mock.calls[0]
         expect(callArgs.join('')).toContain('INSERT INTO booking')
         expect(booking.id).toBe(1)
         expect(booking.userId).toBe(1)
         expect(booking.roomId).toBe(101)
         expect(booking.status).toBe('CREATE')
      })

      it('getBookingById повертає бронювання за ID', async () => {
         // Arrange
         const mockBooking: Booking = {
            id: 1,
            userId: 1,
            roomId: 101,
            status: 'CONFIRM',
            startDate: '2025-12-01',
            endDate: '2025-12-05',
            createdAt: '2025-11-25T10:00:00Z',
         }

         mockSql.mockResolvedValueOnce([mockBooking])

         // Act
         const booking = await bookingsDb.getBookingById(1)

         // Assert
         expect(mockSql).toHaveBeenCalled()
         const callArgs = mockSql.mock.calls[0]
         expect(callArgs.join('')).toContain('SELECT * FROM booking')
         expect(booking).toBeDefined()
         expect(booking?.status).toBe('CONFIRM')
      })

      it('getBookingsByUserId повертає всі бронювання користувача', async () => {
         // Arrange
         const mockBookings: Booking[] = [
            {
               id: 1,
               userId: 1,
               roomId: 101,
               status: 'CREATE',
               startDate: '2025-12-01',
               endDate: '2025-12-05',
               createdAt: '2025-11-25T10:00:00Z',
            },
            {
               id: 2,
               userId: 1,
               roomId: 102,
               status: 'CONFIRM',
               startDate: '2025-12-10',
               endDate: '2025-12-15',
               createdAt: '2025-11-24T14:00:00Z',
            },
         ]

         mockSql.mockResolvedValueOnce(mockBookings)

         // Act
         const bookings = await bookingsDb.getBookingsByUserId(1)

         // Assert
         expect(mockSql).toHaveBeenCalled()
         const callArgs = mockSql.mock.calls[0]
         expect(callArgs.join('')).toContain('WHERE "userId" =')
         expect(bookings).toHaveLength(2)
         expect(bookings[0].userId).toBe(1)
         expect(bookings[1].userId).toBe(1)
      })
   })

   describe('Integration - Booking Lifecycle with DB', () => {
      it('повний цикл бронювання через БД', async () => {
         const newBooking: NewBooking = {
            userId: 1,
            roomId: 101,
            status: 'CREATE',
            startDate: '2025-12-01',
            endDate: '2025-12-05',
         }

         mockSql.mockResolvedValueOnce([
            {
               id: 1,
               ...newBooking,
               createdAt: new Date().toISOString(),
            },
         ])

         const booking = await bookingsDb.createBooking(newBooking)
         expect(booking.status).toBe('CREATE')
         expect(mockSql).toHaveBeenCalledTimes(1)

         mockSql.mockResolvedValueOnce([booking])

         const fetchedBooking = await bookingsDb.getBookingById(booking.id)
         expect(fetchedBooking?.id).toBe(booking.id)
         expect(mockSql).toHaveBeenCalledTimes(2)
      })

      it('перевірка доступності кімнати перед бронюванням', async () => {
         mockSql.mockResolvedValueOnce([{ count: 0 }])

         const isAvailable = await roomsDb.isRoomAvailable(101, new Date('2025-12-01'), new Date('2025-12-05'))
         expect(isAvailable).toBe(true)

         if (isAvailable) {
            const newBooking: NewBooking = {
               userId: 1,
               roomId: 101,
               status: 'CREATE',
               startDate: '2025-12-01',
               endDate: '2025-12-05',
            }

            mockSql.mockResolvedValueOnce([{ id: 1, ...newBooking, createdAt: new Date().toISOString() }])

            const booking = await bookingsDb.createBooking(newBooking)
            expect(booking).toBeDefined()
            expect(booking.roomId).toBe(101)
         }

         expect(mockSql).toHaveBeenCalledTimes(2)
      })

      it('система відхиляє бронювання зайнятої кімнати', async () => {
         // Arrange
         mockSql.mockResolvedValueOnce([{ count: 1 }])

         // Act
         const isAvailable = await roomsDb.isRoomAvailable(101, new Date('2025-12-01'), new Date('2025-12-05'))

         // Assert
         expect(isAvailable).toBe(false)

         // Бронювання не повинно бути створене
         expect(mockSql).toHaveBeenCalledTimes(1)
      })
   })

   describe('Error Handling in Database Operations', () => {
      it('обробка помилки при недоступності БД', async () => {
         // Arrange
         mockSql.mockRejectedValueOnce(new Error('Database connection failed'))

         // Act & Assert
         await expect(roomsDb.getAllRooms()).rejects.toThrow('Database connection failed')
      })

      it('обробка помилки при неправильних даних', async () => {
         // Arrange
         mockSql.mockRejectedValueOnce(new Error('Invalid foreign key'))

         const invalidBooking: NewBooking = {
            userId: 999,
            roomId: 999,
            status: 'CREATE',
            startDate: '2025-12-01',
            endDate: '2025-12-05',
         }

         // Act & Assert
         await expect(bookingsDb.createBooking(invalidBooking)).rejects.toThrow('Invalid foreign key')
      })
   })
})
