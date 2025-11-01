# Документація розробника

## Архітектура проекту

### Структура файлів

#### `/app`

Next.js App Router - основна структура застосунку:

-  **`layout.tsx`** - головний layout з шрифтами та метаданими
-  **`page.tsx`** - головна сторінка зі списком кімнат
-  **`loading.tsx`** - UI під час завантаження
-  **`error.tsx`** - обробка помилок
-  **`not-found.tsx`** - сторінка 404
-  **`/rooms/[id]/page.tsx`** - динамічна сторінка деталей кімнати
-  **`/admin/page.tsx`** - адміністративна панель

#### `/components`

Реюзабельні React компоненти:

-  **`Header.tsx`** - навігаційна шапка
-  **`Footer.tsx`** - підвал сайту
-  **`RoomCard.tsx`** - картка кімнати для списку
-  **`RoomFilters.tsx`** - фільтри пошуку кімнат (client-side)
-  **`BookingForm.tsx`** - форма бронювання (client-side)
-  **`BookingList.tsx`** - список бронювань для адміна (client-side)
-  **`ImageGallery.tsx`** - галерея зображень з модальним вікном (client-side)

#### `/lib`

Утилітарні функції:

-  **`data.ts`** - функції для роботи з даними (mock API)
-  **`utils.ts`** - допоміжні функції (форматування)

#### `/types`

TypeScript типи та інтерфейси:

-  **`index.ts`** - основні типи (Room, Booking, User)

## Server-Side Rendering (SSR)

### Використання SSR в проекті

1. **Головна сторінка** (`app/page.tsx`):

```typescript
export default async function Home() {
   const rooms = await getRooms() // Виконується на сервері
   // ...
}
```

2. **Сторінка деталей** (`app/rooms/[id]/page.tsx`):

```typescript
export default async function RoomPage({ params }: PageProps) {
   const { id } = await params
   const room = await getRoomById(id) // Виконується на сервері
   // ...
}
```

3. **Адмін панель** (`app/admin/page.tsx`):

```typescript
export default async function AdminPage() {
   const bookings = await getBookings() // Виконується на сервері
   const rooms = await getRooms()
   // ...
}
```

### Переваги SSR

-  **SEO оптимізація** - пошукові системи отримують повністю відрендерений HTML
-  **Швидше початкове завантаження** - користувач бачить контент швидше
-  **Кращий UX** - немає "моргання" під час завантаження даних

## Client Components

Компоненти з інтерактивністю використовують директиву `'use client'`:

```typescript
'use client'

export default function BookingForm() {
   const [formData, setFormData] = useState(/* ... */)
   // ...
}
```

## Робота з даними

### Поточна реалізація (Mock Data)

Файл `lib/data.ts` містить тимчасові mock-дані та функції:

```typescript
export async function getRooms(): Promise<Room[]> {
   await new Promise((resolve) => setTimeout(resolve, 100))
   return mockRooms
}
```

### Майбутня інтеграція з NeonDB

1. Встановити необхідні пакети:

```bash
pnpm add @neondatabase/serverless
pnpm add drizzle-orm
pnpm add -D drizzle-kit
```

2. Створити схему бази даних:

```typescript
// lib/db/schema.ts
import { pgTable, serial, varchar, integer, boolean } from 'drizzle-orm/pg-core'

export const rooms = pgTable('rooms', {
   id: serial('id').primaryKey(),
   name: varchar('name', { length: 255 }).notNull(),
   description: text('description').notNull(),
   price: integer('price').notNull(),
   // ...
})
```

3. Оновити функції в `lib/data.ts`:

```typescript
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export async function getRooms(): Promise<Room[]> {
   const result = await sql`SELECT * FROM rooms WHERE available = true`
   return result as Room[]
}
```

## Стилізація

### Tailwind CSS

Проект використовує Tailwind CSS 4 для стилізації.

Основні класи, що використовуються:

-  **Layout**: `flex`, `grid`, `max-w-7xl`, `mx-auto`
-  **Colors**: `bg-blue-600`, `text-white`, `border-gray-200`
-  **Spacing**: `p-6`, `mb-4`, `gap-8`
-  **Responsive**: `md:grid-cols-2`, `lg:grid-cols-3`

### Кастомні стилі

Файл `app/globals.css` містить глобальні стилі та утиліти.

## TypeScript

### Конфігурація

Файл `tsconfig.json` налаштований з:

-  Path aliases: `@/` вказує на корінь проекту
-  Strict mode: увімкнено для кращої типізації

### Типи

Всі основні типи описані в `types/index.ts`:

-  `Room` - інформація про кімнату
-  `Booking` - бронювання
-  `User` - користувач

## Розгортання

### Vercel (рекомендовано)

1. Підключіть GitHub репозиторій до Vercel
2. Vercel автоматично визначить Next.js проект
3. Додайте змінні середовища (якщо потрібно)
4. Проект автоматично деплоїться при push в main/master

### Інші платформи

Проект можна розгорнути на будь-якій платформі, що підтримує Node.js:

-  Railway
-  Render
-  AWS Amplify
-  DigitalOcean App Platform

Команди для збірки:

```bash
pnpm build
pnpm start
```

## Тестування

### План тестування (для QA)

1. **Функціональні тести**:

   -  [ ] Перегляд списку кімнат
   -  [ ] Перегляд деталей кімнати
   -  [ ] Відправлення форми бронювання
   -  [ ] Валідація форми (неправильні дати, порожні поля)
   -  [ ] Перегляд бронювань в адмін панелі
   -  [ ] Підтвердження/відхилення бронювання

2. **Адаптивність**:

   -  [ ] Мобільні пристрої (320px - 768px)
   -  [ ] Планшети (768px - 1024px)
   -  [ ] Десктопи (1024px+)

3. **Продуктивність**:

   -  [ ] Час завантаження головної сторінки < 2с
   -  [ ] Оптимізація зображень
   -  [ ] Lighthouse score > 90

4. **Доступність**:
   -  [ ] Навігація з клавіатури
   -  [ ] Alt текст для зображень
   -  [ ] ARIA labels

## Часті проблеми та рішення

### Помилки TypeScript

Якщо виникають помилки з типами Next.js:

```bash
rm -rf .next
pnpm dev
```

### Проблеми з Tailwind

Якщо стилі не застосовуються:

```bash
pnpm build
```

### Повільне завантаження зображень

Використовуйте Next.js Image компонент, який автоматично оптимізує зображення.

## Подальші вдосконалення

### Короткостроково

-  [ ] Додати валідацію на стороні сервера
-  [ ] Реалізувати пошук та фільтрацію кімнат
-  [ ] Додати пагінацію для списку кімнат
-  [ ] Створити форму додавання/редагування кімнат

### Середньостроково

-  [ ] Інтегрувати NeonDB PostgreSQL
-  [ ] Додати автентифікацію (NextAuth.js)
-  [ ] Реалізувати API routes для CRUD операцій
-  [ ] Додати email нотифікації (Resend/SendGrid)

### Довгостроково

-  [ ] Система платежів (Stripe/LiqPay)
-  [ ] Календар доступності кімнат
-  [ ] Відгуки та рейтинги
-  [ ] Мультимовність (i18n)
-  [ ] Адміністративні звіти та аналітика

## Контакти команди

-  **Гончаренко Вероніка** - Frontend
-  **Ленченко Ярослав** - Backend
-  **Непрон Анастасія** - QA/Analytics
-  **Хоменко Катерина** - Design

---

**Останнє оновлення**: Жовтень 2025
