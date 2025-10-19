import Link from 'next/link'

export default function Header() {
   return (
      <header className="bg-white shadow-sm sticky top-0 z-50">
         <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
               <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">B</span>
               </div>
               <span className="text-xl font-bold text-gray-900">Booking Room</span>
            </Link>

            <div className="flex items-center space-x-6">
               <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Кімнати
               </Link>
               <Link href="/admin" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Адмін панель
               </Link>
            </div>
         </nav>
      </header>
   )
}
