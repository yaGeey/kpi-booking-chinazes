'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ImageGalleryProps {
   images: string[]
   roomName: string
}

export default function ImageGallery({ images, roomName }: ImageGalleryProps) {
   const [selectedImage, setSelectedImage] = useState(0)
   const [isModalOpen, setIsModalOpen] = useState(false)

   const nextImage = () => {
      setSelectedImage((prev) => (prev + 1) % images.length)
   }

   const prevImage = () => {
      setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
   }

   return (
      <>
         <div className="space-y-4">
            {/* Main Image */}
            <div className="relative h-96 rounded-lg overflow-hidden cursor-pointer group" onClick={() => setIsModalOpen(true)}>
               <Image
                  src={images[selectedImage]}
                  alt={`${roomName} - фото ${selectedImage + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                  unoptimized
               />
               <div className="absolute inset-0 group-hover:backdrop-brightness-50 bg-black/0 transition-all flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-lg font-medium">
                     Переглянути у повному розмірі
                  </span>
               </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
               <div className="grid grid-cols-4 gap-4">
                  {images.map((image, index) => (
                     <div
                        key={index}
                        className={`relative h-24 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                           selectedImage === index ? 'border-blue-600 scale-105' : 'border-gray-200 hover:border-blue-400'
                        }`}
                        onClick={() => setSelectedImage(index)}
                     >
                        <Image
                           src={image}
                           alt={`${roomName} - мініатюра ${index + 1}`}
                           fill
                           sizes="(max-width: 768px) 25vw, 200px"
                           className="object-cover"
                        />
                     </div>
                  ))}
               </div>
            )}
         </div>

         {/* Modal */}
         {isModalOpen && (
            <div
               className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
               onClick={() => setIsModalOpen(false)}
            >
               <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors"
               >
                  ×
               </button>

               <div className="relative w-full max-w-5xl h-[80vh]" onClick={(e) => e.stopPropagation()}>
                  <Image
                     src={images[selectedImage]}
                     alt={`${roomName} - фото ${selectedImage + 1}`}
                     fill
                     sizes="(max-width: 768px) 100vw, 1400px"
                     className="object-contain"
                  />

                  {images.length > 1 && (
                     <>
                        <button
                           onClick={prevImage}
                           className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-900 w-12 h-12 rounded-full flex items-center justify-center transition-all"
                        >
                           ←
                        </button>
                        <button
                           onClick={nextImage}
                           className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-900 w-12 h-12 rounded-full flex items-center justify-center transition-all"
                        >
                           →
                        </button>
                     </>
                  )}

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 text-white px-4 py-2 rounded-full">
                     {selectedImage + 1} / {images.length}
                  </div>
               </div>
            </div>
         )}
      </>
   )
}
