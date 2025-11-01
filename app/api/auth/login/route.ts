import { verifyAdmin } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
   try {
      const { username, password } = await request.json()
      const isValid = await verifyAdmin(username, password)
      if (!isValid) return NextResponse.json({ error: 'Невірні дані для входу' }, { status: 401 })

      const response = NextResponse.json({ success: true })
      response.cookies.set('admin-auth', process.env.ADMIN_PASSWORD_HASH!, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'strict',
         maxAge: 60 * 60 * 24 * 7,
         path: '/',
      })

      return response
   } catch (error) {
      return NextResponse.json({ error: 'Помилка сервера' }, { status: 500 })
   }
}
