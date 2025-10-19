import { render, screen } from '@testing-library/react'
import RoomCard from '../RoomCard'
import { Room } from '@/types'

const mockRoom: Room = {
   id: '1',
   name: 'Люкс',
   description: 'Розкішний номер з видом на місто',
   price: 2500,
   capacity: 2,
   images: ['/images/room1.jpg', '/images/room2.jpg'],
   amenities: ['Wi-Fi', 'Кондиціонер', 'Міні-бар'],
   available: true,
}

describe('RoomCard Component', () => {
   it('should render room name', () => {
      render(<RoomCard room={mockRoom} />)

      const roomName = screen.getByText('Люкс')
      expect(roomName).toBeInTheDocument()
   })

   it('should render room price', () => {
      render(<RoomCard room={mockRoom} />)

      const price = screen.getByText(/2 500 ₴/)
      expect(price).toBeInTheDocument()
      expect(screen.getByText(/за ніч/i)).toBeInTheDocument()
   })

   it('should render room capacity', () => {
      render(<RoomCard room={mockRoom} />)

      const capacity = screen.getByText(/2 гостей/i)
      expect(capacity).toBeInTheDocument()
   })

   it('should render amenities', () => {
      render(<RoomCard room={mockRoom} />)

      expect(screen.getByText('Wi-Fi')).toBeInTheDocument()
      expect(screen.getByText('Кондиціонер')).toBeInTheDocument()
      expect(screen.getByText('Міні-бар')).toBeInTheDocument()
   })

   it('should render room image', () => {
      render(<RoomCard room={mockRoom} />)

      const image = screen.getByAltText('Люкс')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', '/images/room1.jpg')
   })

   it('should have link to room details page', () => {
      render(<RoomCard room={mockRoom} />)

      const link = screen.getByRole('link', { name: /детальніше/i })
      expect(link).toHaveAttribute('href', '/rooms/1')
   })

   it('should render truncated description', () => {
      render(<RoomCard room={mockRoom} />)

      const description = screen.getByText(/Розкішний номер з видом на місто/i)
      expect(description).toHaveClass('line-clamp-2')
   })

   it('should handle unavailable rooms', () => {
      const unavailableRoom: Room = { ...mockRoom, available: false }
      render(<RoomCard room={unavailableRoom} />)

      // Card should still render but might have different styling
      expect(screen.getByText('Люкс')).toBeInTheDocument()
   })

   it('should handle rooms with many amenities', () => {
      const roomWithManyAmenities: Room = {
         ...mockRoom,
         amenities: ['Wi-Fi', 'TV', 'Кондиціонер', 'Міні-бар', 'Сейф', 'Балкон'],
      }
      render(<RoomCard room={roomWithManyAmenities} />)

      // Should only show first 3 amenities
      expect(screen.getByText('Wi-Fi')).toBeInTheDocument()
      expect(screen.getByText('TV')).toBeInTheDocument()
      expect(screen.getByText('Кондиціонер')).toBeInTheDocument()
   })
})
