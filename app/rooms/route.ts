// app/api/rooms/route.ts
import { NextResponse } from 'next/server'
import { getFilteredRooms } from '@/lib/db/rooms'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { capacity, minPrice, maxPrice } = body ?? {}

    const capacityNum = capacity !== undefined ? Number(capacity) : undefined
    const minPriceNum = minPrice !== undefined ? Number(minPrice) : undefined
    const maxPriceNum = maxPrice !== undefined ? Number(maxPrice) : undefined

    if (capacity !== undefined && Number.isNaN(capacityNum)) {
      return NextResponse.json({ error: 'Invalid capacity' }, { status: 400 })
    }
    if (minPrice !== undefined && Number.isNaN(minPriceNum)) {
      return NextResponse.json({ error: 'Invalid minPrice' }, { status: 400 })
    }
    if (maxPrice !== undefined && Number.isNaN(maxPriceNum)) {
      return NextResponse.json({ error: 'Invalid maxPrice' }, { status: 400 })
    }

    const rooms = await getFilteredRooms({
      capacity: capacityNum,
      minPrice: minPriceNum,
      maxPrice: maxPriceNum,
    })

    return NextResponse.json(rooms)
  } catch (err: any) {
    console.error('Error in POST /api/rooms:', err)
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const rooms = await getFilteredRooms({})
    return NextResponse.json(rooms)
  } catch (err) {
    console.error('Error in GET /api/rooms:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
