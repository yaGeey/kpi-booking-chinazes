import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookingForm from '../BookingForm'

const mockRoom = {
   id: '1',
   name: 'Люкс',
   price: 2500,
}

describe('BookingForm Component', () => {
   it('should render all form fields', () => {
      render(<BookingForm roomId={mockRoom.id} roomName={mockRoom.name} pricePerDay={mockRoom.price} />)

      expect(screen.getByLabelText(/ім'я/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/телефон/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/дата заїзду/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/дата виїзду/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/кількість гостей/i)).toBeInTheDocument()
   })

   it('should display room name and price', () => {
      render(<BookingForm roomId={mockRoom.id} roomName={mockRoom.name} pricePerDay={mockRoom.price} />)

      expect(screen.getByText(/Люкс/)).toBeInTheDocument()
      expect(screen.getByText(/2 500 ₴/)).toBeInTheDocument()
   })

   it('should update form fields on input', async () => {
      const user = userEvent.setup()
      render(<BookingForm roomId={mockRoom.id} roomName={mockRoom.name} pricePerDay={mockRoom.price} />)

      const nameInput = screen.getByLabelText(/ім'я/i)
      await user.type(nameInput, 'Іван Петренко')
      expect(nameInput).toHaveValue('Іван Петренко')

      const emailInput = screen.getByLabelText(/email/i)
      await user.type(emailInput, 'ivan@example.com')
      expect(emailInput).toHaveValue('ivan@example.com')
   })

   it('should show validation errors for empty required fields', async () => {
      const user = userEvent.setup()
      render(<BookingForm roomId={mockRoom.id} roomName={mockRoom.name} pricePerDay={mockRoom.price} />)

      const submitButton = screen.getByRole('button', { name: /забронювати/i })
      await user.click(submitButton)

      await waitFor(() => {
         expect(screen.getByText(/будь ласка, заповніть всі поля/i)).toBeInTheDocument()
      })
   })

   it('should validate date range', async () => {
      const user = userEvent.setup()
      render(<BookingForm roomId={mockRoom.id} roomName={mockRoom.name} pricePerDay={mockRoom.price} />)

      const checkinInput = screen.getByLabelText(/дата заїзду/i)
      const checkoutInput = screen.getByLabelText(/дата виїзду/i)

      // Set checkout before checkin
      await user.type(checkinInput, '2024-03-20')
      await user.type(checkoutInput, '2024-03-15')

      const submitButton = screen.getByRole('button', { name: /забронювати/i })
      await user.click(submitButton)

      await waitFor(() => {
         expect(screen.getByText(/дата виїзду повинна бути після дати заїзду/i)).toBeInTheDocument()
      })
   })

   it('should calculate total price correctly', async () => {
      const user = userEvent.setup()
      render(<BookingForm roomId={mockRoom.id} roomName={mockRoom.name} pricePerDay={mockRoom.price} />)

      const checkinInput = screen.getByLabelText(/дата заїзду/i)
      const checkoutInput = screen.getByLabelText(/дата виїзду/i)

      // Set dates (5 days)
      await user.type(checkinInput, '2024-03-15')
      await user.type(checkoutInput, '2024-03-20')

      // Total should be 5 days * 2500 = 12,500
      await waitFor(() => {
         expect(screen.getByText(/12 500 ₴/)).toBeInTheDocument()
      })
   })

   it('should disable past dates', () => {
      render(<BookingForm roomId={mockRoom.id} roomName={mockRoom.name} pricePerDay={mockRoom.price} />)

      const checkinInput = screen.getByLabelText(/дата заїзду/i) as HTMLInputElement
      const today = new Date().toISOString().split('T')[0]

      expect(checkinInput.min).toBe(today)
   })

   it('should handle form submission successfully', async () => {
      const user = userEvent.setup()
      render(<BookingForm roomId={mockRoom.id} roomName={mockRoom.name} pricePerDay={mockRoom.price} />)

      // Fill all fields
      await user.type(screen.getByLabelText(/ім'я/i), 'Іван Петренко')
      await user.type(screen.getByLabelText(/email/i), 'ivan@example.com')
      await user.type(screen.getByLabelText(/телефон/i), '+380501234567')
      await user.type(screen.getByLabelText(/дата заїзду/i), '2024-03-15')
      await user.type(screen.getByLabelText(/дата виїзду/i), '2024-03-20')
      await user.selectOptions(screen.getByLabelText(/кількість гостей/i), '2')

      const submitButton = screen.getByRole('button', { name: /забронювати/i })
      await user.click(submitButton)

      await waitFor(() => {
         expect(screen.getByText(/бронювання успішно створено/i)).toBeInTheDocument()
      })
   })

   it('should reset form after successful submission', async () => {
      const user = userEvent.setup()
      render(<BookingForm roomId={mockRoom.id} roomName={mockRoom.name} pricePerDay={mockRoom.price} />)

      // Fill and submit form
      await user.type(screen.getByLabelText(/ім'я/i), 'Іван Петренко')
      await user.type(screen.getByLabelText(/email/i), 'ivan@example.com')
      await user.type(screen.getByLabelText(/телефон/i), '+380501234567')
      await user.type(screen.getByLabelText(/дата заїзду/i), '2024-03-15')
      await user.type(screen.getByLabelText(/дата виїзду/i), '2024-03-20')

      const submitButton = screen.getByRole('button', { name: /забронювати/i })
      await user.click(submitButton)

      await waitFor(() => {
         const nameInput = screen.getByLabelText(/ім'я/i) as HTMLInputElement
         expect(nameInput.value).toBe('')
      })
   })
})
