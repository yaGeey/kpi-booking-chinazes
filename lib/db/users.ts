'use server'
import { User, NewUser } from '../types'
import sql from './db'

export async function createUser(newUser: NewUser): Promise<User> {
   const [user] = await sql`
      INSERT INTO "user" (name, email, phone)
      VALUES (${newUser.name}, ${newUser.email}, ${newUser.phone})
      RETURNING *;
   `
   return user as User
}

export async function getUserById(userId: number): Promise<User | null> {
   const [user] = await sql`SELECT * FROM "user" WHERE id = ${userId};`
   return (user as User) || null
}

export async function getUserByEmail(email: string): Promise<User | null> {
   const [user] = await sql`SELECT * FROM "user" WHERE email = ${email};`
   return (user as User) || null
}

export async function getAllUsers(): Promise<User[]> {
   const users = await sql`SELECT * FROM "user";`
   return users as User[]
}

export async function updateUser(userId: number, updates: Partial<Omit<User, 'id'>>): Promise<User | null> {
   const currentUser = await getUserById(userId)
   if (!currentUser) return null

   const [user] = await sql`
      UPDATE "user" 
      SET 
         name = ${updates.name ?? currentUser.name},
         email = ${updates.email ?? currentUser.email},
         passwordHash = ${updates.passwordHash ?? currentUser.passwordHash},
         salt = ${updates.salt ?? currentUser.salt},
         role = ${updates.role ?? currentUser.role},
         phone = ${updates.phone ?? currentUser.phone}
      WHERE id = ${userId}
      RETURNING *;
   `
   return (user as User) || null
}

export async function deleteUser(userId: number): Promise<boolean> {
   const result = await sql`
    DELETE FROM "user" WHERE id = ${userId};
  `
   return result.length > 0
}
