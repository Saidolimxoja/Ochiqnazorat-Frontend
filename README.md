# Ochiq Nazorat

Next.js + React + TypeScript. Ichki boshqaruv paneli UI.

## Talablar

- Node.js 20+
- npm 10+

## Buyruqlar

| Buyruq | Vazifasi |
|--------|----------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Builddan keyin server |
| `npm run lint` | ESLint |
| `npm run format` | Prettier (yozish) |
| `npm run format:check` | Prettier (tekshiruv) |
| `npm run check` | lint + format |

## `src/`

- `app/` — Next.js marshrutlar (login, bosh sahifa)
- `modules/` — sahifalar va layout
- `shared/` — umumiy kod (auth, hooklar, modellar)
- `styles/` — global CSS

Import: `@/*` → `src/*`

```ts
import { HomeDashboard } from '@/modules/home'
```

## Ma'lumotlar (frontend-only)

Hozircha barcha statistikalar va hujjatlar **mock** fayllar orqali beriladi (`*.mock.ts`, `*Repository`).
Backend API ulanganda faqat repository implementatsiyasi va auth almashtiriladi; UI komponentlari o‘zgarishsiz qolishi mo‘ljallangan.

- Kirish: demo rejim — `localStorage` sessiya, istalgan login/parol
- Dashboard filtrlari / sana / yangilash: API kutilmoqda (`disabled` + tooltip)
