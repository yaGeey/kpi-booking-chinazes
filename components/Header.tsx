//components/Header.tsx
'use client'
import Link from 'next/link'
export default function Header() {
  const handleOpenFilters = () => {
    window.dispatchEvent(new Event('openFilters'))
  }
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600">
            <span className="font-bold text-white">B</span>
          </div>
          <span className="text-lg font-bold text-gray-900">Booking Room</span>
        </Link>
        {/* Filter Button */}
        <button
          onClick={handleOpenFilters}
          className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          <span>🔍</span>
          <span>Фільтр</span>
        </button>
      </nav>
    </header>
  )
}