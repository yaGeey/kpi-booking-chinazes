import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({
   // Шлях до Next.js app для завантаження next.config.js та .env файлів
   dir: './',
})

// Додаткова конфігурація Jest
const config: Config = {
   coverageProvider: 'v8',
   testEnvironment: 'jsdom',
   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
   moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1',
   },
   testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
   collectCoverageFrom: [
      'app/**/*.{js,jsx,ts,tsx}',
      'components/**/*.{js,jsx,ts,tsx}',
      'lib/**/*.{js,jsx,ts,tsx}',
      '!**/*.d.ts',
      '!**/node_modules/**',
      '!**/.next/**',
      '!**/coverage/**',
      '!**/jest.config.ts',
   ],
}

// createJestConfig експортується так, щоб next/jest міг завантажити конфігурацію Next.js async
export default createJestConfig(config)
