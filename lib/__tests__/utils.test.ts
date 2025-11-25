import { formatDate, formatPrice, calculateDays, calculateTotalPrice } from '../utils'

describe('Utils - formatDate', () => {
   it('форматує дату в український формат', () => {
      const result = formatDate('2024-03-15')
      expect(result).toContain('2024')
      expect(result).toContain('березня')
   })

   it('коректно обробляє різні дати', () => {
      const result = formatDate('2024-12-31')
      expect(result).toContain('2024')
   })

   it('обробляє високосний рік', () => {
      const result = formatDate('2024-02-29')
      expect(result).toContain('2024')
      expect(result).toContain('лютого')
   })
})

describe('Utils - formatPrice', () => {
   it('форматує ціну з символом гривні', () => {
      expect(formatPrice(1500)).toBe('1\u00A0500 ₴') // non-breaking space U+00A0
   })

   it('форматує великі числа з пробілами', () => {
      expect(formatPrice(15000)).toBe('15\u00A0000 ₴')
   })

   it('коректно обробляє нульову ціну', () => {
      expect(formatPrice(0)).toBe('0 ₴')
   })

   it('форматує числа з десятковими знаками', () => {
      const result = formatPrice(1500.5)
      expect(result).toContain('₴')
   })
})

describe('Utils - calculateDays', () => {
   it('обчислює різницю між датами в днях', () => {
      const result = calculateDays('2024-03-10', '2024-03-15')
      expect(result).toBe(5)
   })

   it('обчислює один день', () => {
      const result = calculateDays('2024-03-10', '2024-03-11')
      expect(result).toBe(1)
   })

   it('обчислює різницю через місяць', () => {
      const result = calculateDays('2024-03-15', '2024-04-15')
      expect(result).toBe(31)
   })

   it('коректно обробляє однакові дати', () => {
      const result = calculateDays('2024-03-10', '2024-03-10')
      expect(result).toBe(0)
   })

   it('обчислює різницю через рік', () => {
      const result = calculateDays('2024-01-01', '2025-01-01')
      expect(result).toBe(366)
   })

   it('обробляє межі місяців', () => {
      const result = calculateDays('2024-03-30', '2024-04-02')
      expect(result).toBe(3)
   })
})

describe('Utils - calculateTotalPrice', () => {
   it('обчислює загальну вартість за 3 ночі', () => {
      const result = calculateTotalPrice(1000, '2024-03-10', '2024-03-13')
      expect(result).toBe(3000)
   })

   it('обчислює вартість за 1 ніч', () => {
      const result = calculateTotalPrice(1500, '2024-03-10', '2024-03-11')
      expect(result).toBe(1500)
   })

   it('обчислює вартість за тиждень', () => {
      const result = calculateTotalPrice(2000, '2024-03-10', '2024-03-17')
      expect(result).toBe(14000)
   })

   it('повертає 0 для однакових дат', () => {
      const result = calculateTotalPrice(1000, '2024-03-10', '2024-03-10')
      expect(result).toBe(0)
   })

   it('коректно обробляє високі ціни', () => {
      const result = calculateTotalPrice(5000, '2024-03-10', '2024-03-15')
      expect(result).toBe(25000)
   })

   it('обробляє довгі періоди', () => {
      const result = calculateTotalPrice(2000, '2024-03-01', '2024-03-31')
      expect(result).toBe(60000)
   })
})
