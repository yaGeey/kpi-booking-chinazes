# Booking Room - Сервіс бронювання кімнат

**Демо:** [https://kpi-booking-chinazes.vercel.app](https://kpi-booking-chinazes.vercel.app)

---

## 1. Інструкції для запуску проекту

```bash
# 1. Клонування репозиторію
git clone https://github.com/yaGeey/kpi-booking-chinazes.git .

# 2. Встановлення залежностей
pnpm install

# 3. Створіть файл .env.local та додайте:
DATABASE_URL=postgresql://...
RESEND_API_KEY=re_...

# 4. Запуск dev сервера на http://localhost:3000
pnpm dev
```

---

## 2. Команда розробників та розподіл ролей

| Роль                                      | Учасник                  | Обов'язки                                                                                          |
| ----------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------- |
| **Fullstack-розробник**                   | Ленченко Ярослав (ІС-34) | Архітектура БД, серверні функції, API routes, інтеграція з NeonDB                                  |
| **Дизайнер / Аналітик / QA-тестувальник** | Непрон Анастасія (ІК-34) | UX/UI дизайн, прототипування інтерфейсів, тестування, написання тест-кейсів, перевірка функціоналу |

---

## 3. Технологічний стек

-  **Next.js 15** (App Router) - React фреймворк з підтримкою SSR (Server-Side Rendering) та RSC (React Server Components), Server Actions.
-  **TypeScript 5** - Типізована надбудова над JavaScript
-  **Tailwind CSS 4** - Utility-first CSS фреймворк

### Зовнішні сервіси

-  **NeonDB (PostgreSQL)** - Serverless PostgreSQL база даних
-  **Resend** - Сервіс для відправки email-повідомлень про статус бронювання
-  **Vercel** - Безкоштовна платформа для хостингу Next.js додатків з автоматичним CI/CD

### Інше

-  **bcryptjs** - Хешування паролів для адмін-панелі
-  **Jest** - Фреймворк для тестування
-  **ESLint** - Лінтер для JavaScript/TypeScript
-  **Prettier** - Швидкий форматер

---

## 4. Архітектура проекту

### 4.1 Особливість архітектури: Serverless підхід

**Ключова особливість проекту** - відсутність традиційного backend-сервера. Замість окремого Express/Fastify сервера використовуються **Server Components** та **Server Actions** з Next.js 15, що робить архітектуру максимально простою та ефективною.

### 4.2 Переваги обраної архітектури

✅ **Безпека "out of the box":**

-  Весь код роботи з БД виконується на сервері
-  Credentials (API keys, database URLs) ніколи не потрапляють на клієнт
-  SQL-запити захищені від injection-атак через параметризовані запити

✅ **Простота розробки:**

-  Немає необхідності в окремому REST API
-  Функції можна викликати напряму з компонентів
-  Менше boilerplate коду

✅ **Продуктивність:**

-  Server-Side Rendering (SSR) для швидкого завантаження
-  Automatic code splitting
-  Optimistic updates на клієнті

### 4.3 Структура проекту

```
booking-new/
├── app/                          # Next.js App Router
│   ├── admin/                    # Адмін-панель
│   │   ├── login/               # Сторінка входу адміністратора
│   │   │   ├── page.tsx         # UI форми входу
│   │   │   └── layout.tsx       # Layout без header
│   │   ├── page.tsx             # Головна сторінка адмін-панелі
│   │   └── layout.tsx           # Layout з кнопкою виходу
│   ├── api/                     # API Routes
│   │   └── auth/                # Endpoints для авторизації
│   │       ├── login/           # POST /api/auth/login
│   │       ├── logout/          # POST /api/auth/logout
│   │       └── check/           # GET /api/auth/check
│   ├── rooms/                   # Сторінки кімнат
│   │   └── [id]/               # Динамічний роут для деталей кімнати
│   │       └── page.tsx
│   ├── layout.tsx              # Головний layout додатку
│   ├── page.tsx                # Головна сторінка зі списком кімнат
│   ├── error.tsx               # Error boundary
│   ├── loading.tsx             # Loading UI
│   └── not-found.tsx           # 404 сторінка
│
├── components/                  # React компоненти
│   ├── BookingForm.tsx         # Форма бронювання
│   ├── BookingList.tsx         # Список бронювань (адмін)
│   ├── RoomCard.tsx            # Картка кімнати
│   ├── RoomCalendar.tsx        # Календар доступності
│   ├── RoomFilters.tsx         # Фільтри для кімнат
│   ├── ImageGallery.tsx        # Галерея зображень
│   ├── Header.tsx              # Шапка сайту
│   ├── Footer.tsx              # Футер сайту
│   ├── AdminLogin.tsx          # Компонент форми входу
│   ├── LogoutButton.tsx        # Кнопка виходу
│   ├── RefreshButton.tsx       # Кнопка оновлення даних
│   └── __tests__/              # Unit тести компонентів
│
├── lib/                         # Бізнес-логіка та утиліти
│   ├── db/                     # Робота з базою даних
│   │   ├── db.ts              # Конфігурація підключення до NeonDB
│   │   ├── bookings.ts        # CRUD операції для бронювань
│   │   ├── rooms.ts           # CRUD операції для кімнат
│   │   └── users.ts           # CRUD операції для користувачів
│   ├── auth.ts                # Логіка авторизації адміна
│   ├── email.ts               # Відправка email-повідомлень
│   ├── types.ts               # TypeScript типи та інтерфейси
│   ├── utils.ts               # Допоміжні функції
│   └── __tests__/             # Unit тести
│
└── Конфігураційні файли
    ├── package.json            # Залежності та скрипти
    ├── tsconfig.json           # TypeScript конфігурація
    ├── next.config.ts          # Next.js конфігурація
    ├── tailwind.config.ts      # Tailwind CSS конфігурація
    ├── jest.config.ts          # Jest конфігурація
    ├── eslint.config.mjs       # ESLint конфігурація
    └── biome.json              # Biome конфігурація
```

---

## 5. База даних: Спрощена архітектура

### 5.1 Структура таблиць

#### Таблиця `user`

```sql
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL
);
```

Первісний дизайн БД передбачав окремі поля `passwordHash` та `salt` для повноцінної системи реєстрації користувачів. Однак, після аналізу вимог, було прийнято рішення спростити архітектуру:

❌ **Видалено** `passwordHash`, `salt`, `role`, адже користувачі не реєструються на сайті, вони просто залишають свої дані при бронюванні

**Співвідношення User ↔ Booking = 1:1**  
Кожен запис у таблиці `user` відповідає одному бронюванню. Якщо людина бронює кімнату двічі - створюється два окремих записи користувача. Це спрощує логіку і усуває необхідність в системі аутентифікації для звичайних користувачів.

#### Таблиця `room`

```sql
CREATE TABLE room (
    id SERIAL PRIMARY KEY,
    capacity INTEGER NOT NULL,
    pricePerNight DECIMAL(10, 2) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    photos TEXT[] -- Масив URL фотографій
);
```

#### Таблиця `booking`

```sql
CREATE TABLE booking (
    id SERIAL PRIMARY KEY,
    userId INTEGER REFERENCES "user"(id),
    roomId INTEGER REFERENCES room(id),
    status VARCHAR(20) NOT NULL, -- 'CREATE', 'CONFIRM', 'CANCEL', 'COMPLETE'
    createdAt TIMESTAMP DEFAULT NOW(),
    startDate DATE NOT NULL,
    endDate DATE NOT NULL
);
```

#### Таблиця `payment` (НЕ ВИКОРИСТОВУЄТЬСЯ)

```sql
CREATE TABLE payment (
    id SERIAL PRIMARY KEY,
    bookingId INTEGER REFERENCES booking(id),
    status VARCHAR(20),
    amount DECIMAL(10, 2),
    provider VARCHAR(100)
);
```

❌ **Чому?** Інтеграція реальної платіжної системи (Stripe, LiqPay, Fondy) вимагає значних витрат часу на інтеграцію. Для навчального проекту це не є доцільним.

---

## 6. Основні модулі та їх відповідальність

### 6.1 Server Actions (lib/db/)

#### `lib/db/bookings.ts` - Управління бронюваннями

```typescript
'use server' - // Next.js 15 директива для серверних функцій
   // Основні функції:
   createBooking() - // Створення нового бронювання
   getBookingById() - // Отримання бронювання за ID
   getBookingsByUserId() - // Всі бронювання користувача
   getAllBookings() - // Всі бронювання (для адміна)
   updateBookingStatus() - // Зміна статусу + відправка email
   cancelBooking() - // Скасування бронювання
   getBookedDatesByRoomId() // Зайняті дати кімнати
```

**Приклад функції:**

```typescript
export async function createBooking(newBooking: NewBooking): Promise<Booking> {
   const [booking] = await sql`
      INSERT INTO booking ("userId", "roomId", status, "endDate", "startDate")
      VALUES (${newBooking.userId}, ${newBooking.roomId}, ${newBooking.status}, 
              ${newBooking.endDate}, ${newBooking.startDate})
      RETURNING *;
   `
   return booking as Booking
}
```

**Безпека:** SQL-інʼєкції неможливі завдяки параметризованим запитам (template literals).

#### `lib/db/rooms.ts` - Управління кімнатами

```typescript
;-createRoom() - // Додавання нової кімнати
   getRoomById() - // Інформація про кімнату
   getAllRooms() - // Список всіх кімнат
   isRoomAvailable() - // Перевірка доступності на дати
   updateRoom() - // Оновлення інформації
   deleteRoom() // Видалення кімнати
```

#### `lib/db/users.ts` - Управління користувачами

```typescript
;-createUser() - // Створення користувача при бронюванні
   getUserById() - // Отримання даних користувача
   getUserByEmail() - // Пошук по email
   getAllUsers() - // Всі користувачі
   updateUser() - // Оновлення даних
   deleteUser() // Видалення користувача
```

### 6.2 Авторизація адміністратора (lib/auth.ts)

**Реалізація:** Проста, але безпечна система входу для адміна.

```typescript
import bcrypt from 'bcryptjs'

// Хеш паролю "admin" (згенерований один раз)
const ADMIN_PASSWORD_HASH = '$2b$10$...'
const ADMIN_USERNAME = 'admin'

export async function verifyAdmin(username: string, password: string): Promise<boolean> {
   if (username !== ADMIN_USERNAME) return false
   return bcrypt.compare(password, ADMIN_PASSWORD_HASH)
}
```

**✅ Безпека:**

1. Пароль **ніколи** не зберігається в plain text
2. Хеш генерується за допомогою bcrypt (salt rounds: 10)
3. Перевірка відбувається **тільки на сервері**
4. Клієнт не має доступу до хешу
5. Cookie встановлюється як `httpOnly` (JavaScript не може прочитати) і зберігається 7 днів (автоматичний вхід)

### 6.3 Email-повідомлення (lib/email.ts)

**Сервіс:** Resend (безкоштовний для невеликих проектів)

```typescript
export async function sendBookingStatusEmail({
   to, userName, bookingId, roomTitle, status, startDate, endDate
}: SendBookingStatusEmailParams) {
   const statusInfo = statusMessages[status]

   await resend.emails.send({
      from: 'Booking Room <booking@resend.dev>',
      to: [to],
      subject: statusInfo.subject,
      html: generateEmailHTML(...)
   })
}
```

**Статуси бронювань:**

-  `CREATE` - Запит отримано, очікує розгляду
-  `CONFIRM` - Бронювання підтверджено адміном
-  `CANCEL` - Бронювання скасовано
-  `COMPLETE` - Бронювання завершено

Користувач отримує email при кожній зміні статусу.

---

## 7. Frontend компоненти

### 7.1 Клієнтські компоненти (Client Components)

#### `components/BookingForm.tsx`

Форма для створення нового бронювання.

**Функціонал:**

-  Вибір дат через календар
-  Валідація вхідних даних
-  Перевірка доступності кімнати
-  Підрахунок загальної вартості
-  Створення користувача + бронювання

```typescript
'use client'

const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault()

   // 1. Створюємо користувача
   const user = await createUser({ name, email, phone })

   // 2. Створюємо бронювання
   const booking = await createBooking({
      userId: user.id,
      roomId: room.id,
      startDate,
      endDate,
      status: 'CREATE',
   })

   // 3. Показуємо успіх
   router.push('/success')
}
```

#### `components/RoomCard.tsx`

Картка кімнати зі списку.

**Показує:**

-  Фото кімнати
-  Назва та опис
-  Ціна за ніч
-  Місткість
-  Кнопка "Забронювати"

#### `components/RoomCalendar.tsx`

Календар доступності кімнати.

**Функції:**

-  Відображення зайнятих дат (сірим кольором)
-  Вибір діапазону дат
-  Блокування минулих дат
-  Інтеграція з `react-day-picker`

#### `components/BookingList.tsx` (Адмін)

Таблиця всіх бронювань для адміністратора.

**Можливості:**

-  Сортування по даті
-  Фільтрація по статусу
-  Підтвердження/скасування бронювань
-  Відображення інформації про користувача та кімнату

### 7.2 Серверні компоненти (Server Components)

**Переваги Server Component:**

-  Дані завантажуються на сервері
-  Швидкий First Contentful Paint
-  SEO-friendly (повний HTML)
-  Менший JavaScript bundle

---

## 8. Дотримання принципів SOLID

### Single Responsibility Principle (SRP)

✅ Кожен модуль має одну відповідальність:

-  `bookings.ts` - тільки операції з бронюваннями
-  `rooms.ts` - тільки операції з кімнатами
-  `auth.ts` - тільки авторизація
-  `email.ts` - тільки відправка email

### Open/Closed Principle (OCP)

✅ Функції можна розширювати без модифікації:

```typescript
// Легко додати новий статус бронювання
const statusMessages: Record<BookingStatus, ...> = {
   CREATE: { ... },
   CONFIRM: { ... },
   NEW_STATUS: { ... } // Розширення
}
```

### Liskov Substitution Principle (LSP)

✅ TypeScript типи забезпечують правильну заміну:

```typescript
type NewBooking = Omit<Booking, 'id' | 'createdAt'>
// NewBooking можна використати скрізь, де очікується Booking
```

### Interface Segregation Principle (ISP)

✅ Компоненти отримують тільки потрібні props:

```typescript
// RoomCard не потребує всіх даних про бронювання
interface RoomCardProps {
   room: Room // Тільки дані кімнати
}
```

### Dependency Inversion Principle (DIP)

✅ Залежність від абстракцій, а не реалізацій:

```typescript
// Компоненти не знають про NeonDB
// Вони використовують абстрактні функції
import { getAllRooms } from '@/lib/db/rooms'

// Легко змінити БД, не змінюючи компоненти
```

---

## 9. Deployment на Vercel

-  Push в `main` → Production deployment
-  PR → Preview deployment

```bash
pnpm build
```

---

## 10. Висновки

✅ **Повнофункціональний веб-додаток** для бронювання кімнат  
✅ **Serverless архітектура** без традиційного backend-сервера  
✅ **Безпечна авторизація** адміністратора з bcrypt хешуванням  
✅ **Email-повідомлення** про зміну статусу бронювання  
✅ **Responsive дизайн** з Tailwind CSS  
✅ **Типобезпека** з TypeScript  
✅ **Unit тести** для критичних компонентів  
✅ **CI/CD** через Vercel

### Посилання

-  **GitHub:** https://github.com/yaGeey/kpi-booking-chinazes
-  **Live Demo:** https://kpi-booking-chinazes.vercel.app
-  **Next.js Docs:** https://nextjs.org/docs
-  **Tailwind CSS:** https://tailwindcss.com/docs
-  **NeonDB:** https://neon.tech/docs
-  **Resend:** https://resend.com/docs

---

**Дата:** 2 листопада 2025
