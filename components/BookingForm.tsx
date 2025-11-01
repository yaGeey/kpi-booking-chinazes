'use client'
import { useState } from 'react'
import { calculateTotalPrice, formatPrice } from '@/lib/utils'
import { Room } from '@/lib/types'
import { createBooking } from '@/lib/db/bookings'
import { isRoomAvailable } from '@/lib/db/rooms'
import { createUser, getUserByEmail } from '@/lib/db/users'

export default function BookingForm({ room }: { room: Room }) {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      checkIn: '',
      checkOut: '',
   })
   const [loading, setLoading] = useState(false)
   const [success, setSuccess] = useState(false)
   const [error, setError] = useState('')

   const isValidDateRange = (checkIn: string, checkOut: string): boolean => {
      if (!checkIn || !checkOut) return false
      const checkInDate = new Date(checkIn)
      const checkOutDate = new Date(checkOut)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (checkInDate < today) return false
      if (checkOutDate <= checkInDate) return false
      return true
   }

   const totalPrice = isValidDateRange(formData.checkIn, formData.checkOut)
      ? calculateTotalPrice(room.pricePerNight, formData.checkIn, formData.checkOut)
      : 0

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)
      setError('')

      try {
         const checkIn = new Date(formData.checkIn)
         const checkOut = new Date(formData.checkOut)
         const today = new Date()
         today.setHours(0, 0, 0, 0)

         if (checkIn < today) {
            setError('Дата заїзду не може бути в минулому')
            setLoading(false)
            return
         }

         if (checkOut <= checkIn) {
            setError('Дата виїзду повинна бути пізніше дати заїзду')
            setLoading(false)
            return
         }

         const available = await isRoomAvailable(room.id, checkIn, checkOut)
         if (!available) {
            setError('Номер вже заброньовано на ці дати. Будь ласка, оберіть інші дати.')
            setLoading(false)
            return
         }

         const user = await createUser({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
         })

         await createBooking({
            userId: user.id,
            roomId: room.id,
            status: 'CREATE',
            startDate: formData.checkIn,
            endDate: formData.checkOut,
         })
         setSuccess(true)
         setLoading(false)
      } catch (err) {
         setError('Помилка при створенні бронювання.')
         setLoading(false)
         console.error(err)
      }
   }

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
         ...prev,
         [e.target.name]: e.target.value,
      }))
   }

   if (success) {
      return (
         <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="text-green-600 text-5xl mb-4">✓</div>
            <h3 className="text-xl font-semibold text-green-900 mb-2">Запит надіслано!</h3>
            <p className="text-green-700">Ваш запит на бронювання успішно надіслано. Адміністратор зв'яжеться з вами найближчим часом.</p>
         </div>
      )
   }

   return (
      <form onSubmit={handleSubmit} className="space-y-4">
         <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
               Повне ім'я *
            </label>
            <input
               type="text"
               id="name"
               name="name"
               required
               value={formData.name}
               onChange={handleChange}
               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
               placeholder="Введіть ваше ім'я"
            />
         </div>

         <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
               Email *
            </label>
            <input
               type="email"
               id="email"
               name="email"
               required
               value={formData.email}
               onChange={handleChange}
               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
               placeholder="your@email.com"
            />
         </div>

         <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
               Телефон *
            </label>
            <input
               type="tel"
               id="phone"
               name="phone"
               required
               value={formData.phone}
               onChange={handleChange}
               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
               placeholder="+380501234567"
            />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
               <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-1">
                  Дата заїзду *
               </label>
               <input
                  type="date"
                  id="checkIn"
                  name="checkIn"
                  required
                  value={formData.checkIn}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
               />
            </div>

            <div>
               <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-1">
                  Дата виїзду *
               </label>
               <input
                  type="date"
                  id="checkOut"
                  name="checkOut"
                  required
                  value={formData.checkOut}
                  onChange={handleChange}
                  min={formData.checkIn || new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
               />
            </div>
         </div>

         {totalPrice > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
               <div className="flex justify-between items-center">
                  <span className="text-gray-700">Загальна вартість:</span>
                  <span className="text-2xl font-bold text-blue-600">{formatPrice(totalPrice)}</span>
               </div>
            </div>
         )}

         {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">{error}</div>}

         <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
         >
            {loading ? 'Відправлення...' : 'Забронювати'}
         </button>
      </form>
   )
}
