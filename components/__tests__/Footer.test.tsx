import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

describe('Footer Component', () => {
   it('should render company name', () => {
      render(<Footer />)

      const companyName = screen.getByText(/booking room/i)
      expect(companyName).toBeInTheDocument()
   })

   it('should render contact information', () => {
      render(<Footer />)

      expect(screen.getByText(/Київ, Україна/i)).toBeInTheDocument()
      expect(screen.getByText(/\+380 \(50\) 123-45-67/)).toBeInTheDocument()
      expect(screen.getByText(/info@bookingroom\.ua/)).toBeInTheDocument()
   })

   it('should display copyright', () => {
      render(<Footer />)

      expect(screen.getByText(/© 2025 Booking Room/i)).toBeInTheDocument()
      expect(screen.getByText(/КПІ ім\. Ігоря Сікорського/i)).toBeInTheDocument()
   })

   it('should display copyright', () => {
      render(<Footer />)

      const currentYear = new Date().getFullYear()
      const copyright = screen.getByText(new RegExp(`© ${currentYear}`, 'i'))
      expect(copyright).toBeInTheDocument()
   })
})
