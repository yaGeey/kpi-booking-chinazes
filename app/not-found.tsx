import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
   return (
      <>
         <Header />
         <main className="flex-1 flex items-center justify-center py-20">
            <div className="text-center px-4">
               <div className="text-9xl font-bold text-blue-600 mb-4">404</div>
               <h1 className="text-4xl font-bold text-gray-900 mb-4">Сторінку не знайдено</h1>
               <p className="text-xl text-gray-600 mb-8">На жаль, сторінка, яку ви шукаєте, не існує або була видалена.</p>
               <Link
                  href="/"
                  className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
               >
                  Повернутися на головну
               </Link>
            </div>
         </main>
         <Footer />
      </>
   )
}
