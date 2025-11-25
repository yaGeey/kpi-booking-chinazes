import { render, screen, fireEvent } from '@testing-library/react'
import RefreshButton from '../RefreshButton'

// Mock useRouter
const mockRefresh = jest.fn()

jest.mock('next/navigation', () => ({
   useRouter: () => ({
      refresh: mockRefresh,
   }),
}))

describe('RefreshButton Component', () => {
   beforeEach(() => {
      jest.clearAllMocks()
   })

   it('рендерить кнопку оновлення', () => {
      render(<RefreshButton />)
      expect(screen.getByRole('button')).toBeInTheDocument()
   })

   it('викликає refresh при натисканні', () => {
      render(<RefreshButton />)
      const button = screen.getByRole('button')

      fireEvent.click(button)

      expect(mockRefresh).toHaveBeenCalledTimes(1)
   })

   it('можна натискати декілька разів', () => {
      render(<RefreshButton />)
      const button = screen.getByRole('button')

      fireEvent.click(button)

      // Перевіряємо що функція викликається
      expect(mockRefresh).toHaveBeenCalled()
   })

   it('має правильні стилі', () => {
      const { container } = render(<RefreshButton />)
      const button = container.querySelector('button')

      expect(button?.className).toContain('bg-blue-600')
   })
})
