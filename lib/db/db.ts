import { neon, NeonQueryFunction } from '@neondatabase/serverless'
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL environment variable is not set')
export default neon(process.env.DATABASE_URL) as NeonQueryFunction<false, false>
