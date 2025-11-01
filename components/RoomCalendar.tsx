'use client'

import { useState } from 'react'

interface BookedDate {
   startDate: string
   endDate: string
}

interface RoomCalendarProps {}

export default function RoomCalendar({ bookedDates }: { bookedDates: BookedDate[] }) {
   const [currentMonth, setCurrentMonth] = useState(new Date())

   const getDaysInMonth = (date: Date) => {
      const year = date.getFullYear()
      const month = date.getMonth()
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      const daysInMonth = lastDay.getDate()
      const startingDayOfWeek = firstDay.getDay()

      return { daysInMonth, startingDayOfWeek, year, month }
   }

   const isDateBooked = (date: Date) => {
      const dateStr = date.toISOString().split('T')[0]
      return bookedDates.some((booking) => {
         const start = new Date(booking.startDate)
         const end = new Date(booking.endDate)
         return date >= start && date <= end
      })
   }

   const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth)

   const previousMonth = () => {
      setCurrentMonth(new Date(year, month - 1, 1))
   }

   const nextMonth = () => {
      setCurrentMonth(new Date(year, month + 1, 1))
   }

   const monthNames = [
      'Січень',
      'Лютий',
      'Березень',
      'Квітень',
      'Травень',
      'Червень',
      'Липень',
      'Серпень',
      'Вересень',
      'Жовтень',
      'Листопад',
      'Грудень',
   ]

   const dayNames = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

   const days = []
   for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square" />)
   }

   for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isBooked = isDateBooked(date)
      const isToday =
         date.getDate() === new Date().getDate() &&
         date.getMonth() === new Date().getMonth() &&
         date.getFullYear() === new Date().getFullYear()

      days.push(
         <div
            key={day}
            className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
               isBooked ? 'bg-red-100 text-red-800 cursor-not-allowed' : 'bg-green-50 text-green-800 hover:bg-green-100'
            } ${isToday ? 'ring-2 ring-blue-500' : ''}`}
            title={isBooked ? 'Заброньовано' : 'Вільно'}
         >
            {day}
         </div>
      )
   }

   return (
      <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
         <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Календар доступності</h3>
            <div className="flex gap-2">
               <button
                  onClick={previousMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Попередній місяць"
               >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
               </button>
               <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Наступний місяць">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
               </button>
            </div>
         </div>

         <div className="text-center font-semibold text-lg mb-4 text-gray-800">
            {monthNames[month]} {year}
         </div>

         <div className="grid grid-cols-7 gap-2 mb-2">
            {dayNames.map((day) => (
               <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                  {day}
               </div>
            ))}
         </div>

         <div className="grid grid-cols-7 gap-2">{days}</div>

         <div className="flex gap-4 mt-6 text-sm">
            <div className="flex items-center gap-2">
               <div className="w-4 h-4 bg-green-50 border border-green-200 rounded" />
               <span className="text-gray-600">Вільно</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-4 h-4 bg-red-100 border border-red-200 rounded" />
               <span className="text-gray-600">Заброньовано</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-4 h-4 bg-white border-2 border-blue-500 rounded" />
               <span className="text-gray-600">Сьогодні</span>
            </div>
         </div>
      </div>
   )
}
