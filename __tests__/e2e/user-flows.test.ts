import { calculateDays, calculateTotalPrice, formatPrice, formatDate } from '@/lib/utils'
import { verifyAdmin } from '@/lib/auth'
import type { Room, Booking, BookingStatus } from '@/lib/types'

describe('E2E Tests - Користувацький сценарій бронювання', () => {
   describe('Перегляд та валідація кімнат', () => {
      it("кімната має всі обов'язкові поля для відображення", () => {
         const room: Room = {
            id: 1,
            title: 'Стандарт',
            description: 'Комфортна кімната',
            capacity: 2,
            pricePerNight: 1000,
            photos: ['/room1.jpg'],
         }

         expect(room.title).toBeTruthy()
         expect(room.pricePerNight).toBeGreaterThan(0)
         expect(room.capacity).toBeGreaterThan(0)
         expect(room.photos).toBeInstanceOf(Array)

         const formattedPrice = formatPrice(room.pricePerNight)
         expect(formattedPrice).toContain('1')
         expect(formattedPrice).toContain('000')
         expect(formattedPrice).toContain('₴')
      })

      it('користувач бачить відформатовану ціну', () => {
         const rooms: Room[] = [
            { id: 1, title: 'Стандарт', description: 'Опис', capacity: 2, pricePerNight: 1500, photos: [] },
            { id: 2, title: 'Люкс', description: 'Опис', capacity: 4, pricePerNight: 3000, photos: [] },
         ]

         rooms.forEach((room) => {
            const formatted = formatPrice(room.pricePerNight)
            expect(formatted).toContain('₴')
            expect(typeof formatted).toBe('string')
         })
      })
   })

   describe('Процес бронювання - повний flow', () => {
      it('користувач обирає дати і система розраховує вартість', () => {
         const checkIn = '2025-12-01'
         const checkOut = '2025-12-05'
         const pricePerNight = 1000

         const nights = calculateDays(checkIn, checkOut)
         const totalPrice = calculateTotalPrice(pricePerNight, checkIn, checkOut)

         expect(nights).toBe(4)
         expect(totalPrice).toBe(4000)

         const formattedTotal = formatPrice(totalPrice)
         expect(formattedTotal).toContain('4')
         expect(formattedTotal).toContain('000')
         expect(formattedTotal).toContain('₴')
      })

      it('валідація email формату користувача', () => {
         const validEmails = ['test@gmail.com', 'user@kpi.ua', 'admin@booking.com']
         const invalidEmails = ['invalid', '@test.com', 'test@', 'test']

         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

         validEmails.forEach((email) => {
            expect(emailRegex.test(email)).toBe(true)
         })

         invalidEmails.forEach((email) => {
            expect(emailRegex.test(email)).toBe(false)
         })
      })

      it('валідація українського номера телефону', () => {
         const validPhones = ['+380501234567', '+380671234567', '+380931234567']
         const invalidPhones = ['+38050123', '380501234567', '+3805012345678', '050123456']

         const phoneRegex = /^\+380\d{9}$/

         validPhones.forEach((phone) => {
            expect(phoneRegex.test(phone)).toBe(true)
         })

         invalidPhones.forEach((phone) => {
            expect(phoneRegex.test(phone)).toBe(false)
         })
      })

      it('дата виїзду повинна бути після дати заїзду', () => {
         const validPairs = [
            { checkIn: '2025-12-01', checkOut: '2025-12-05' },
            { checkIn: '2025-12-10', checkOut: '2025-12-11' },
         ]

         const invalidPair = { checkIn: '2025-12-05', checkOut: '2025-12-05' } // однакові дати

         validPairs.forEach(({ checkIn, checkOut }) => {
            const days = calculateDays(checkIn, checkOut)
            expect(days).toBeGreaterThan(0)
         })
         const sameDayBooking = calculateDays(invalidPair.checkIn, invalidPair.checkOut)
         expect(sameDayBooking).toBe(0)
      })

      it('система форматує дати для відображення користувачу', () => {
         const date = '2025-12-01'
         const formatted = formatDate(date)

         expect(formatted).toContain('грудня')
         expect(formatted).toContain('2025')
         expect(typeof formatted).toBe('string')
      })
   })

   describe('Адміністрування - використання реальних функцій', () => {
      it('перевірка credentials адміністратора', async () => {
         expect(await verifyAdmin('admin', 'admin')).toBe(true)
         expect(await verifyAdmin('admin', 'wrongpass')).toBe(false)
         expect(await verifyAdmin('user', 'admin')).toBe(false)
         expect(await verifyAdmin('', '')).toBe(false)
      })

      it('бронювання має валідний статус', () => {
         const validStatuses: BookingStatus[] = ['CREATE', 'CONFIRM', 'CANCEL', 'COMPLETE']
         const booking: Booking = {
            id: 1,
            userId: 1,
            roomId: 101,
            status: 'CONFIRM',
            startDate: '2025-12-01',
            endDate: '2025-12-05',
            createdAt: new Date().toISOString(),
         }

         expect(validStatuses).toContain(booking.status)
         expect(booking.startDate).toBeTruthy()
         expect(booking.endDate).toBeTruthy()
      })

      it('повний flow: обрати кімнату → розрахувати ціну → створити бронювання', () => {
         const room: Room = {
            id: 1,
            title: 'Стандарт',
            description: 'Опис',
            capacity: 2,
            pricePerNight: 1500,
            photos: [],
         }

         const checkIn = '2025-12-01'
         const checkOut = '2025-12-05'

         const nights = calculateDays(checkIn, checkOut)
         const totalPrice = calculateTotalPrice(room.pricePerNight, checkIn, checkOut)

         const booking: Booking = {
            id: 1,
            userId: 1,
            roomId: room.id,
            status: 'CREATE',
            startDate: checkIn,
            endDate: checkOut,
            createdAt: new Date().toISOString(),
         }

         expect(nights).toBe(4)
         expect(totalPrice).toBe(6000) // 1500 * 4
         expect(booking.roomId).toBe(room.id)
         expect(booking.status).toBe('CREATE')

         const formattedPrice = formatPrice(totalPrice)
         expect(formattedPrice).toContain('₴')
      })
   })
})
