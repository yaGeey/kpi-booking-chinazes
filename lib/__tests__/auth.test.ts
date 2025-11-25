import { verifyAdmin, hashPassword } from '../auth'

describe('Auth - verifyAdmin', () => {
   it('приймає правильний логін та пароль', async () => {
      const result = await verifyAdmin('admin', 'admin')
      expect(result).toBe(true)
   })

   it('відхиляє неправильний логін', async () => {
      const result = await verifyAdmin('wronguser', 'admin')
      expect(result).toBe(false)
   })

   it('відхиляє неправильний пароль', async () => {
      const result = await verifyAdmin('admin', 'wrongpassword')
      expect(result).toBe(false)
   })

   it('відхиляє порожній логін', async () => {
      const result = await verifyAdmin('', 'admin')
      expect(result).toBe(false)
   })

   it('відхиляє порожній пароль', async () => {
      const result = await verifyAdmin('admin', '')
      expect(result).toBe(false)
   })

   it('чутливий до регістру для логіну', async () => {
      const result = await verifyAdmin('Admin', 'admin')
      expect(result).toBe(false)
   })
})

describe('Auth - hashPassword', () => {
   it('генерує хеш для паролю', async () => {
      const hash = await hashPassword('testpassword')
      expect(hash).toBeDefined()
      expect(hash.length).toBeGreaterThan(20)
   })

   it('генерує різні хеші для одного паролю (salt)', async () => {
      const hash1 = await hashPassword('testpassword')
      const hash2 = await hashPassword('testpassword')
      expect(hash1).not.toBe(hash2)
   })

   it('генерує хеш для порожнього рядка', async () => {
      const hash = await hashPassword('')
      expect(hash).toBeDefined()
   })

   it('генерує хеш для складного паролю', async () => {
      const complexPassword = 'P@ssw0rd!123#$%'
      const hash = await hashPassword(complexPassword)
      expect(hash).toBeDefined()
      expect(hash.length).toBeGreaterThan(20)
   })
})
