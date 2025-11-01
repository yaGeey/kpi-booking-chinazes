import type { Metadata } from 'next'
import { Inter, Inter_Tight } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

const inter = Inter({
   variable: '--font-inter',
   subsets: ['latin', 'cyrillic'],
})

const interTight = Inter_Tight({
   variable: '--font-inter-tight',
   subsets: ['latin', 'cyrillic'],
})

export const metadata: Metadata = {
   title: 'Booking Room - Сервіс бронювання кімнат',
   description: 'Простий та зручний сервіс для бронювання кімнат у готелі. КПІ ім. Ігоря Сікорського',
}

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="uk">
         <body className={`${inter.variable} ${interTight.variable} antialiased flex flex-col min-h-screen`}>
            <Header />
            {children}
            <Footer />
         </body>
      </html>
   )
}
