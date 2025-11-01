export function formatDate(dateString: string): string {
   const date = new Date(dateString)
   return date.toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
   })
}

export function formatPrice(price: number): string {
   return `${price.toLocaleString('uk-UA')} ₴`
}

export function calculateDays(checkIn: string, checkOut: string): number {
   const start = new Date(checkIn)
   const end = new Date(checkOut)
   const diffTime = Math.abs(end.getTime() - start.getTime())
   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
   return diffDays
}

export function calculateTotalPrice(pricePerNight: number, checkIn: string, checkOut: string): number {
   const days = calculateDays(checkIn, checkOut)
   return pricePerNight * days
}
