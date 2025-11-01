import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
   const authCookie = request.cookies.get('admin-auth')
   if (authCookie?.value === process.env.ADMIN_PASSWORD_HASH) return NextResponse.json({ authenticated: true })
   return NextResponse.json({ authenticated: false }, { status: 401 })
}
