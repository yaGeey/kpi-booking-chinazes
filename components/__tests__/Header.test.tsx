import { render, screen } from '@testing-library/react'
import Header from '../Header'

describe('Header Component', () => {
   it('should render header with logo', () => {
      render(<Header />)

      const logo = screen.getByText('B')
      expect(logo).toBeInTheDocument()
   })

   it('should render navigation links', () => {
      render(<Header />)

      const homeLink = screen.getByRole('link', { name: /головна/i })
      const adminLink = screen.getByRole('link', { name: /адмін панель/i })

      expect(homeLink).toBeInTheDocument()
      expect(adminLink).toBeInTheDocument()
   })

   it('should have correct href attributes', () => {
      render(<Header />)

      const homeLink = screen.getByRole('link', { name: /головна/i })
      const adminLink = screen.getByRole('link', { name: /адмін панель/i })

      expect(homeLink).toHaveAttribute('href', '/')
      expect(adminLink).toHaveAttribute('href', '/admin')
   })

   it('should have correct CSS classes', () => {
      render(<Header />)

      const header = screen.getByRole('banner')
      expect(header).toHaveClass('sticky', 'top-0', 'z-50', 'bg-white', 'shadow-sm')
   })
})
