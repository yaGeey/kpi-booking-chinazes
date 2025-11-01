# Design System - Booking Room

**Дизайнер**: Хоменко Катерина  
**Версія**: 1.0  
**Дата**: Жовтень 2025

---

## 1. Кольорова палітра

### Primary Colors (Основні)

```css
/* Blue - Основний колір бренду */
--blue-50:  #eff6ff
--blue-100: #dbeafe
--blue-200: #bfdbfe
--blue-300: #93c5fd
--blue-400: #60a5fa
--blue-500: #3b82f6
--blue-600: #2563eb  /* PRIMARY */
--blue-700: #1d4ed8
--blue-800: #1e40af
--blue-900: #1e3a8a
```

### Neutral Colors (Нейтральні)

```css
/* Gray - Для тексту та фонів */
--gray-50:  #f9fafb
--gray-100: #f3f4f6
--gray-200: #e5e7eb
--gray-300: #d1d5db
--gray-400: #9ca3af
--gray-500: #6b7280
--gray-600: #4b5563
--gray-700: #374151
--gray-800: #1f2937
--gray-900: #111827  /* TEXT PRIMARY */
```

### Semantic Colors (Семантичні)

```css
/* Success - для підтверджень */
--green-100: #dcfce7
--green-600: #16a34a
--green-800: #166534

/* Warning - для очікування */
--yellow-100: #fef3c7
--yellow-600: #ca8a04
--yellow-800: #854d0e

/* Error - для помилок */
--red-50:  #fef2f2
--red-100: #fee2e2
--red-200: #fecaca
--red-600: #dc2626
--red-700: #b91c1c
--red-800: #991b1b

/* White & Black */
--white: #ffffff
--black: #000000
```

---

## 2. Типографіка

### Font Family

```css
/* Primary Font */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Secondary Font (Tight) */
font-family: 'Inter Tight', sans-serif;
```

### Font Sizes

```css
/* Headings */
--text-5xl: 3rem     /* 48px */ - Hero titles
--text-4xl: 2.25rem  /* 36px */ - Page titles (H1)
--text-3xl: 1.875rem /* 30px */ - Section titles (H2)
--text-2xl: 1.5rem   /* 24px */ - Card titles (H3)
--text-xl:  1.25rem  /* 20px */ - Subtitles

/* Body */
--text-base: 1rem    /* 16px */ - Body text
--text-sm:   0.875rem /* 14px */ - Small text
--text-xs:   0.75rem  /* 12px */ - Captions
```

### Font Weights

```css
--font-normal:   400  /* Body text */
--font-medium:   500  /* Buttons, labels */
--font-semibold: 600  /* Card titles */
--font-bold:     700  /* Headings */
```

### Line Heights

```css
--leading-tight:   1.25
--leading-normal:  1.5
--leading-relaxed: 1.75
```

---

## 3. Spacing System

Базовий модуль: **4px**

```css
--space-1:  0.25rem   /* 4px */
--space-2:  0.5rem    /* 8px */
--space-3:  0.75rem   /* 12px */
--space-4:  1rem      /* 16px */
--space-5:  1.25rem   /* 20px */
--space-6:  1.5rem    /* 24px */
--space-8:  2rem      /* 32px */
--space-10: 2.5rem    /* 40px */
--space-12: 3rem      /* 48px */
--space-16: 4rem      /* 64px */
--space-20: 5rem      /* 80px */
```

### Використання

-  **Padding в картках**: 24px (space-6)
-  **Margin між секціями**: 64px (space-16)
-  **Gap в grid**: 32px (space-8)

---

## 4. Border Radius

```css
--rounded-none: 0
--rounded-sm:   0.125rem  /* 2px */
--rounded:      0.25rem   /* 4px */
--rounded-md:   0.375rem  /* 6px */
--rounded-lg:   0.5rem    /* 8px */  /* PRIMARY */
--rounded-xl:   0.75rem   /* 12px */
--rounded-2xl:  1rem      /* 16px */
--rounded-full: 9999px    /* Circles */
```

### Використання

-  **Кнопки**: rounded-lg (8px)
-  **Картки**: rounded-lg (8px)
-  **Інпути**: rounded-lg (8px)
-  **Badges**: rounded-full

---

## 5. Shadows

```css
/* Small - для карток при hover */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)

/* Medium - для основних карток */
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1),
             0 2px 4px -2px rgb(0 0 0 / 0.1)

/* Large - для модальних вікон */
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1),
             0 4px 6px -4px rgb(0 0 0 / 0.1)

/* XL - для випадаючих меню */
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1),
             0 8px 10px -6px rgb(0 0 0 / 0.1)
```

---

## 6. Компоненти UI

### Buttons (Кнопки)

#### Primary Button

```css
background: #2563eb (blue-600)
color: #ffffff
padding: 12px 32px (py-3 px-8)
border-radius: 8px (rounded-lg)
font-weight: 500 (medium)

/* Hover */
background: #1d4ed8 (blue-700)

/* Disabled */
opacity: 0.5
cursor: not-allowed
```

#### Secondary Button

```css
background: transparent
color: #2563eb (blue-600)
border: 2px solid #2563eb
padding: 10px 30px
border-radius: 8px

/* Hover */
background: #eff6ff (blue-50)
```

#### Danger Button

```css
background: #dc2626 (red-600)
color: #ffffff
padding: 12px 32px
border-radius: 8px

/* Hover */
background: #b91c1c (red-700)
```

### Cards (Картки)

```css
background: #ffffff
border-radius: 8px (rounded-lg)
padding: 24px (p-6)
box-shadow: 0 4px 6px rgba(0,0,0,0.1) (shadow-md)

/* Hover */
box-shadow: 0 10px 15px rgba(0,0,0,0.1) (shadow-xl)
transform: translateY(-2px)
transition: all 0.3s ease
```

### Input Fields (Поля вводу)

```css
background: #ffffff
border: 1px solid #d1d5db (gray-300)
border-radius: 8px (rounded-lg)
padding: 8px 16px (py-2 px-4)
font-size: 16px

/* Focus */
border-color: #2563eb (blue-600)
box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1)
outline: none
```

### Badges (Бейджі)

```css
/* Pending */
background: #fef3c7 (yellow-100)
color: #854d0e (yellow-800)

/* Confirmed */
background: #dcfce7 (green-100)
color: #166534 (green-800)

/* Rejected */
background: #fee2e2 (red-100)
color: #991b1b (red-800)

/* Cancelled */
background: #f3f4f6 (gray-100)
color: #374151 (gray-700)

/* Common styles */
padding: 4px 12px (px-3 py-1)
border-radius: 9999px (rounded-full)
font-size: 14px (text-sm)
font-weight: 500
```

---

## 7. Layout

### Container

```css
max-width: 1280px (max-w-7xl)
margin: 0 auto
padding: 0 16px (px-4)

/* Responsive */
@media (min-width: 640px) {
   padding: 0 24px (sm: px-6);
}

@media (min-width: 1024px) {
   padding: 0 32px (lg: px-8);
}
```

### Grid System

```css
/* Mobile First */
grid-template-columns:
   1 column
   /* Tablet */
   @media (min-width: 768px) {
   grid-template-columns: 2 columns (md: grid-cols-2);
}

/* Desktop */
@media (min-width: 1024px) {
   grid-template-columns: 3 columns (lg: grid-cols-3);
}

/* Gap */
gap: 32px (gap-8);
```

### Header

```css
height: 64px (h-16)
background: #ffffff
box-shadow: 0 1px 2px rgba(0,0,0,0.05) (shadow-sm)
position: sticky
top: 0
z-index: 50
```

### Footer

```css
background: #111827 (gray-900)
color: #ffffff
padding: 32px 0 (py-8)
```

---

## 8. Іконографія

### Icon Size

```css
--icon-xs: 16px
--icon-sm: 20px
--icon-md: 24px  /* DEFAULT */
--icon-lg: 32px
--icon-xl: 48px
```

### Icon Style

-  **Type**: Outline (пріоритет)
-  **Stroke width**: 2px
-  **Sources**: Heroicons, Lucide Icons, або Material Icons

### Рекомендовані іконки

-  **Check**: ✓ (успіх, підтвердження)
-  **X**: ✕ (закриття, помилка)
-  **Arrow Left**: ← (назад)
-  **Arrow Right**: → (вперед)
-  **Calendar**: 📅 (дати)
-  **User**: 👤 (профіль)
-  **Home**: 🏠 (головна)
-  **Settings**: ⚙️ (налаштування)

---

## 9. Анімації та Переходи

### Transition Duration

```css
--duration-75:   75ms    /* Hover підсвічування */
--duration-150:  150ms   /* Швидкі зміни */
--duration-300:  300ms   /* DEFAULT - кнопки, картки */
--duration-500:  500ms   /* Модальні вікна */
--duration-1000: 1000ms  /* Складні анімації */
```

### Easing Functions

```css
--ease-linear:     linear
--ease-in:         cubic-bezier(0.4, 0, 1, 1)
--ease-out:        cubic-bezier(0, 0, 0.2, 1)  /* DEFAULT */
--ease-in-out:     cubic-bezier(0.4, 0, 0.2, 1)
```

### Приклади використання

```css
/* Button hover */
transition: all 300ms ease-out;

/* Card hover */
transition: transform 300ms ease-out, box-shadow 300ms ease-out;

/* Modal появлення */
transition: opacity 500ms ease-out;
```

---

## 10. Responsive Breakpoints

```css
/* Mobile (default) */
min-width: 320px /* Small (sm) - Великі телефони */ @media (min-width: 640px) {

}

/* Medium (md) - Планшети */
@media (min-width: 768px) {
}

/* Large (lg) - Маленькі ноутбуки */
@media (min-width: 1024px) {
}

/* XLarge (xl) - Десктопи */
@media (min-width: 1280px) {
}

/* 2XLarge (2xl) - Великі екрани */
@media (min-width: 1536px) {
}
```

---

## 11. Accessibility (Доступність)

### Мінімальні вимоги

-  **Contrast ratio**: 4.5:1 для звичайного тексту
-  **Contrast ratio**: 3:1 для великого тексту (18px+)
-  **Touch target size**: мінімум 44x44px
-  **Focus visible**: обов'язкова видима рамка при фокусі з клавіатури

### Focus Styles

```css
/* Кнопки та посилання */
outline: 2px solid #2563eb
outline-offset: 2px

/* Інпути */
box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1)
```

---

## 12. Imagery (Зображення)

### Пропорції

-  **Room cards**: 16:9 (горизонтальні)
-  **Room details**: 16:9 (головне), 4:3 (мініатюри)
-  **Hero banner**: 21:9 (широкоформатні)

### Оптимізація

-  **Format**: WebP з fallback на JPEG
-  **Quality**: 80-85%
-  **Max width**: 1920px
-  **Lazy loading**: так

### Placeholder

```css
background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)
animation: shimmer 1.5s infinite
```

---

## 13. Емоційний дизайн

### Tone of Voice

-  **Дружній**: використовуємо прості слова
-  **Професійний**: але не занадто формальний
-  **Підтримуючий**: допомагаємо користувачу

### Мікроінтеракції

-  **Hover на кнопках**: зміна кольору + легкий підйом
-  **Hover на картках**: збільшення shadow + легкий підйом
-  **Loading states**: skeleton screens або spinner
-  **Success states**: зелена галочка + повідомлення
-  **Error states**: червоний текст + іконка помилки

---

## 14. Дизайн-токени (для експорту в код)

```json
{
   "colors": {
      "primary": "#2563eb",
      "success": "#16a34a",
      "warning": "#ca8a04",
      "error": "#dc2626"
   },
   "spacing": {
      "xs": "4px",
      "sm": "8px",
      "md": "16px",
      "lg": "24px",
      "xl": "32px"
   },
   "borderRadius": {
      "sm": "4px",
      "md": "8px",
      "lg": "12px",
      "full": "9999px"
   }
}
```

---

## 15. Інструменти дизайнера

### Рекомендовані інструменти

-  **Figma**: для створення макетів
-  **Adobe Color**: для палітри
-  **Coolors**: для підбору кольорів
-  **Google Fonts**: Inter, Inter Tight
-  **Unsplash**: для placeholder зображень

### Експорт для розробників

-  Експортувати компоненти як SVG
-  Використовувати 1x, 2x, 3x для растрових зображень
-  Надавати CSS code snippets
-  Документувати всі стани (hover, active, disabled)

---

## 16. Checklist для дизайнера

-  [ ] Всі кольори відповідають палітрі
-  [ ] Використано правильні шрифти та розміри
-  [ ] Відступи кратні 4px
-  [ ] Всі інтерактивні елементи мають hover стан
-  [ ] Контраст тексту достатній (WCAG AA)
-  [ ] Дизайн адаптивний (mobile, tablet, desktop)
-  [ ] Всі іконки однакового стилю
-  [ ] Тіні використані послідовно
-  [ ] Rounded corners послідовні
-  [ ] Є states для форм (focus, error, success)

---

**Контакт дизайнера**: Хоменко Катерина (ІК-32)

**Останнє оновлення**: Жовтень 2025

---

**Примітка**: Цей design system є living document і буде оновлюватись по мірі розвитку проекту.
