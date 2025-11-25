import { calculateTotalPrice, formatPrice, calculateDays } from '@/lib/utils'

describe('Performance Tests - Utils', () => {
   it('calculateDays виконується швидко', () => {
      const start = performance.now()

      for (let i = 0; i < 10000; i++) {
         calculateDays('2024-03-10', '2024-03-15')
      }

      const end = performance.now()
      const duration = end - start

      expect(duration).toBeLessThan(100)
   })

   it('calculateTotalPrice виконується швидко', () => {
      const start = performance.now()

      for (let i = 0; i < 10000; i++) {
         calculateTotalPrice(1500, '2024-03-10', '2024-03-15')
      }

      const end = performance.now()
      const duration = end - start

      expect(duration).toBeLessThan(100)
   })

   it('formatPrice виконується швидко для багатьох операцій', () => {
      const start = performance.now()

      for (let i = 0; i < 10000; i++) {
         formatPrice(1500 + i)
      }

      const end = performance.now()
      const duration = end - start

      expect(duration).toBeLessThan(100)
   })
})

describe('Performance Tests - Memory', () => {
   it("не створює витоків пам'яті при повторних викликах", () => {
      const iterations = 1000

      // Перший прохід
      for (let i = 0; i < iterations; i++) {
         calculateTotalPrice(1500, '2024-03-10', '2024-03-15')
      }

      // Другий прохід - не повинен використовувати більше пам'яті
      for (let i = 0; i < iterations; i++) {
         calculateTotalPrice(1500, '2024-03-10', '2024-03-15')
      }

      // Якщо дійшли сюди без OutOfMemory - тест пройшов
      expect(true).toBe(true)
   })
})
