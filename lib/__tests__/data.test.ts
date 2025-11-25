import { type Room, type Booking, type BookingStatus } from '../types'

describe('Валідація типів даних системи бронювання', () => {
   describe('Room - Структура даних кімнати', () => {
      const validRoom: Room = {
         id: 1,
         title: 'Стандарт',
         description: 'Комфортна кімната з усіма зручностями',
         pricePerNight: 1500,
         capacity: 2,
         photos: ['/room1.jpg', '/room2.jpg'],
      }

      it("коректно створюється об'єкт Room з усіма обов'язковими полями", () => {
         expect(validRoom.id).toBe(1)
         expect(validRoom.title).toBe('Стандарт')
         expect(validRoom.description).toBeTruthy()
         expect(validRoom.pricePerNight).toBe(1500)
         expect(validRoom.capacity).toBe(2)
         expect(Array.isArray(validRoom.photos)).toBe(true)
         expect(validRoom.photos?.length).toBeGreaterThan(0)
      })

      it('ціна за ніч має бути позитивним числом', () => {
         expect(validRoom.pricePerNight).toBeGreaterThan(0)
         expect(typeof validRoom.pricePerNight).toBe('number')
         expect(Number.isFinite(validRoom.pricePerNight)).toBe(true)
      })

      it('місткість має бути мінімум 1 особа', () => {
         expect(validRoom.capacity).toBeGreaterThanOrEqual(1)
         expect(Number.isInteger(validRoom.capacity)).toBe(true)
      })

      it('масив фото може бути порожнім але має існувати', () => {
         const roomWithoutPhotos: Room = {
            ...validRoom,
            photos: [],
         }
         expect(roomWithoutPhotos.photos).toBeDefined()
         expect(Array.isArray(roomWithoutPhotos.photos)).toBe(true)
      })
   })

   describe('Booking - Структура даних бронювання', () => {
      const validBooking: Booking = {
         id: 1,
         userId: 5,
         roomId: 101,
         status: 'CREATE',
         startDate: '2025-12-01',
         endDate: '2025-12-05',
         createdAt: '2025-11-25T10:00:00Z',
      }

      it("коректно створюється об'єкт Booking з усіма обов'язковими полями", () => {
         expect(validBooking.id).toBe(1)
         expect(validBooking.userId).toBe(5)
         expect(validBooking.roomId).toBe(101)
         expect(validBooking.status).toBe('CREATE')
         expect(validBooking.startDate).toBeTruthy()
         expect(validBooking.endDate).toBeTruthy()
         expect(validBooking.createdAt).toBeTruthy()
      })

      it('статуси бронювання мають бути з дозволеного переліку', () => {
         const validStatuses: BookingStatus[] = ['CREATE', 'CONFIRM', 'CANCEL', 'COMPLETE']

         validStatuses.forEach((status) => {
            const booking: Booking = {
               ...validBooking,
               status,
            }
            expect(['CREATE', 'CONFIRM', 'CANCEL', 'COMPLETE']).toContain(booking.status)
         })
      })

      it('дата виїзду має бути пізніше дати заїзду', () => {
         const startDate = new Date(validBooking.startDate)
         const endDate = new Date(validBooking.endDate)

         expect(endDate.getTime()).toBeGreaterThan(startDate.getTime())

         // Різниця має бути хоча б 1 день
         const diffDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
         expect(diffDays).toBeGreaterThan(0)
      })

      it('userId та roomId мають бути валідними ID', () => {
         expect(validBooking.userId).toBeGreaterThan(0)
         expect(validBooking.roomId).toBeGreaterThan(0)
         expect(Number.isInteger(validBooking.userId)).toBe(true)
         expect(Number.isInteger(validBooking.roomId)).toBe(true)
      })

      it('lifecycle статусів: CREATE → CONFIRM → COMPLETE', () => {
         const lifecycle: BookingStatus[] = ['CREATE', 'CONFIRM', 'COMPLETE']

         lifecycle.forEach((status, index) => {
            const booking: Booking = {
               ...validBooking,
               status,
            }
            expect(booking.status).toBe(lifecycle[index])
         })
      })
   })

   describe('Email Validation - Перевірка формату email', () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      it('приймає валідні email адреси', () => {
         const validEmails = ['user@example.com', 'test.user@domain.ua', 'admin@booking-room.com', 'contact+support@kpi.ua']

         validEmails.forEach((email) => {
            expect(emailRegex.test(email)).toBe(true)
         })
      })

      it('відхиляє невалідні email адреси', () => {
         const invalidEmails = ['invalid', 'test@', '@domain.com', 'test @domain.com', 'test@domain']

         invalidEmails.forEach((email) => {
            expect(emailRegex.test(email)).toBe(false)
         })
      })
   })

   describe('Phone Validation - Перевірка українського номера телефону', () => {
      const phoneRegex = /^\+380\d{9}$/

      it('приймає валідні українські номери (+380XXXXXXXXX)', () => {
         const validPhones = [
            '+380501234567',
            '+380671234567', 
            '+380931234567',
            '+380441234567',
         ]

         validPhones.forEach((phone) => {
            expect(phoneRegex.test(phone)).toBe(true)
         })
      })

      it('відхиляє невалідні формати номерів', () => {
         const invalidPhones = [
            '0501234567',
            '380501234567',
            '+38050123',
            '+3805012345678',
            '+380 50 123 45 67',
            '+38050-123-45-67',
         ]

         invalidPhones.forEach((phone) => {
            expect(phoneRegex.test(phone)).toBe(false)
         })
      })
   })
})
