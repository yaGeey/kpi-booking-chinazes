export default function Footer() {
   return (
      <footer className="bg-gray-900 text-white mt-auto">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col justify-center items-center">
               <div className="flex gap-10">
                  <ul className="space-y-2 text-gray-400 flex mt-1 gap-7">
                     <li>Київ, Україна</li>
                     <li>Телефон: +380 (50) 123-45-67</li>
                     <li>Email: info@bookingroom.ua</li>
                  </ul>
               </div>
               <div className=" text-gray-400 flex gap-7">
                  <p>&copy; 2025 Booking Room. Всі права захищені.</p>
                  <p>КПІ ім. Ігоря Сікорського</p>
               </div>
            </div>
         </div>
      </footer>
   )
}
