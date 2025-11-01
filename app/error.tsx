'use client'

import { useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
   useEffect(() => {
      console.error(error)
   }, [error])

   return (
      <>
         <Header />
         <main className="flex-1 flex items-center justify-center py-20">
            <div className="text-center px-4 max-w-2xl">
               <div className="text-9xl mb-4">⚠️</div>
               <h1 className="text-4xl font-bold text-gray-900 mb-4">Щось пішло не так!</h1>
               <p className="text-xl text-gray-600 mb-8">Вибачте, сталася помилка при завантаженні сторінки.</p>
               {error.message && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
                     <p className="text-red-800 font-mono text-sm">{error.message}</p>
                  </div>
               )}
               <div className="flex gap-4 justify-center">
                  <button
                     onClick={reset}
                     className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                     Спробувати знову
                  </button>
                  <a href="/" className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium">
                     На головну
                  </a>
               </div>
            </div>
         </main>
         <Footer />
      </>
   )
}
