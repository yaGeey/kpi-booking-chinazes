'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function RefreshButton({ label = 'Оновити' }: { label?: string }) {
   const router = useRouter()
   const [isRefreshing, setIsRefreshing] = useState(false)

   const handleRefresh = async () => {
      setIsRefreshing(true)
      router.refresh()
      setTimeout(() => setIsRefreshing(false), 500)
   }

   return (
      <button
         onClick={handleRefresh}
         disabled={isRefreshing}
         className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
         {isRefreshing && (
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
               <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
               ></path>
            </svg>
         )}
         {label}
      </button>
   )
}
