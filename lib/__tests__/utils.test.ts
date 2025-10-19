import { formatDate, formatPrice, calculateDays, calculateTotalPrice } from '../utils'

describe('Utils Functions', () => {
   describe('formatDate', () => {
      it('should format date in Ukrainian locale', () => {
         const date = new Date('2024-03-15')
         const formatted = formatDate(date)
         expect(formatted).toBe('15.03.2024')
      })

      it('should handle different date formats', () => {
         const date = new Date('2024-01-01')
         const formatted = formatDate(date)
         expect(formatted).toBe('01.01.2024')
      })

      it('should handle leap year dates', () => {
         const date = new Date('2024-02-29')
         const formatted = formatDate(date)
         expect(formatted).toBe('29.02.2024')
      })
   })

   describe('formatPrice', () => {
      it('should format price with hryvnia symbol', () => {
         const formatted = formatPrice(1500)
         expect(formatted).toBe('1 500 ₴')
      })

      it('should format large numbers correctly', () => {
         const formatted = formatPrice(10000)
         expect(formatted).toBe('10 000 ₴')
      })

      it('should handle zero price', () => {
         const formatted = formatPrice(0)
         expect(formatted).toBe('0 ₴')
      })

      it('should format decimal numbers', () => {
         const formatted = formatPrice(1500.5)
         expect(formatted).toBe('1 500,5 ₴')
      })
   })

   describe('calculateDays', () => {
      it('should calculate days between two dates', () => {
         const checkin = '2024-03-15'
         const checkout = '2024-03-20'
         const days = calculateDays(checkin, checkout)
         expect(days).toBe(5)
      })

      it('should return 1 for same day', () => {
         const checkin = '2024-03-15'
         const checkout = '2024-03-15'
         const days = calculateDays(checkin, checkout)
         expect(days).toBe(0)
      })

      it('should handle one day difference', () => {
         const checkin = '2024-03-15'
         const checkout = '2024-03-16'
         const days = calculateDays(checkin, checkout)
         expect(days).toBe(1)
      })

      it('should handle month boundaries', () => {
         const checkin = '2024-03-30'
         const checkout = '2024-04-02'
         const days = calculateDays(checkin, checkout)
         expect(days).toBe(3)
      })

      it('should handle year boundaries', () => {
         const checkin = '2024-12-30'
         const checkout = '2025-01-02'
         const days = calculateDays(checkin, checkout)
         expect(days).toBe(3)
      })
   })

   describe('calculateTotalPrice', () => {
      it('should calculate total price for multiple days', () => {
         const checkin = '2024-03-15'
         const checkout = '2024-03-20'
         const pricePerDay = 1500
         const total = calculateTotalPrice(checkin, checkout, pricePerDay)
         expect(total).toBe(7500) // 5 days * 1500
      })

      it('should return price per day for one night', () => {
         const checkin = '2024-03-15'
         const checkout = '2024-03-16'
         const pricePerDay = 1500
         const total = calculateTotalPrice(checkin, checkout, pricePerDay)
         expect(total).toBe(1500) // 1 day * 1500
      })

      it('should return 0 for same day checkin/checkout', () => {
         const checkin = '2024-03-15'
         const checkout = '2024-03-15'
         const pricePerDay = 1500
         const total = calculateTotalPrice(checkin, checkout, pricePerDay)
         expect(total).toBe(0) // 0 days * 1500
      })

      it('should handle expensive rooms', () => {
         const checkin = '2024-03-15'
         const checkout = '2024-03-18'
         const pricePerDay = 5000
         const total = calculateTotalPrice(checkin, checkout, pricePerDay)
         expect(total).toBe(15000) // 3 days * 5000
      })

      it('should handle long stays', () => {
         const checkin = '2024-03-01'
         const checkout = '2024-03-31'
         const pricePerDay = 2000
         const total = calculateTotalPrice(checkin, checkout, pricePerDay)
         expect(total).toBe(60000) // 30 days * 2000
      })
   })
})
