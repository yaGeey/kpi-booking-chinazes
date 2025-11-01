export default function Loading() {
   return (
      <div className="flex items-center justify-center min-h-screen">
         <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
               <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full"></div>
               <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-gray-600 text-lg">Завантаження...</p>
         </div>
      </div>
   )
}
