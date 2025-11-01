import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

describe('Footer Component', () => {
   it('should render company name', () => {
      render(<Footer />)

      const companyName = screen.getByText(/booking room/i)
      expect(companyName).toBeInTheDocument()
   })

   it('should render all sections', () => {
      render(<Footer />)

      expect(screen.getByText(/про компанію/i)).toBeInTheDocument()
      expect(screen.getByText(/контакти/i)).toBeInTheDocument()
      expect(screen.getByText(/години роботи/i)).toBeInTheDocument()
   })

   it('should display contact information', () => {
      render(<Footer />)

      expect(screen.getByText(/\+380 \(44\) 123-45-67/)).toBeInTheDocument()
      expect(screen.getByText(/info@bookingroom\.com/)).toBeInTheDocument()
      expect(screen.getByText(/вул\. Хрещатик, 1/i)).toBeInTheDocument()
   })

   it('should display working hours', () => {
      render(<Footer />)

      expect(screen.getByText(/пн-пт: 9:00 - 18:00/i)).toBeInTheDocument()
      expect(screen.getByText(/сб-нд: 10:00 - 16:00/i)).toBeInTheDocument()
   })

   it('should display copyright', () => {
      render(<Footer />)

      const currentYear = new Date().getFullYear()
      const copyright = screen.getByText(new RegExp(`© ${currentYear}`, 'i'))
      expect(copyright).toBeInTheDocument()
   })

   it('should have correct background color', () => {
      const { container } = render(<Footer />)
      const footer = container.querySelector('footer')

      expect(footer).toHaveClass('bg-gray-900', 'text-white')
   })
})
