# digital-office-react

React (Vite) + TypeScript. Ichki panel UI namunasi.

## Talablar

- Node.js 20+
- npm 10+

## Buyruqlar

| Buyruq | Vazifasi |
|--------|----------|
| `npm run dev` | Dev server |
| `npm run build` | `tsc` + production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier (yozish) |
| `npm run format:check` | Prettier (tekshiruv) |
| `npm run check` | lint + format + `tsc` |
| `npm run preview` | Buildni mahalliy ko‘rish |

## `src/`

`app/` — kirish, `modules/` — sahifalar/layout, `shared/` — umumiy, `styles/` — global CSS.

Import: `@/*` → `src/*`

```ts
import { EconomicEdoUsage } from '@/modules/economic-edo/EconomicEdoUsage'
```
