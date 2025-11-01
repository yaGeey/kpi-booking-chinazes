import bcrypt from 'bcryptjs'
const ADMIN_PASSWORD_HASH = '$2b$10$9pFHmxxJjBs9JjWYyKJr/OfonikN/Hc3bzgX1DZ07J4k4iBYDtZSK'
const ADMIN_USERNAME = 'admin'

export async function verifyAdmin(username: string, password: string): Promise<boolean> {
   if (username !== ADMIN_USERNAME) return false
   return bcrypt.compare(password, ADMIN_PASSWORD_HASH)
}

export async function hashPassword(password: string): Promise<string> {
   return bcrypt.hash(password, 10)
}
