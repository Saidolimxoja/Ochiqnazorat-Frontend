# Админ-панель (Admin Panel)

## Описание

Модуль администратора для управления пользователями системы OchiqNazorat. Позволяет:
- Просматривать список всех пользователей
- Создавать новых пользователей
- Удалять пользователей
- Искать пользователей по email, имени или фамилии

## Структура

```
src/modules/admin/
├── AdminPanel.tsx              # Главный компонент админ-панели
├── AdminUsersTable.tsx         # Таблица пользователей
├── CreateUserModal.tsx         # Модальное окно создания пользователя
├── DeleteUserModal.tsx         # Модальное окно подтверждения удаления
├── AdminPanel.module.css       # Стили админ-панели
├── AdminUsersTable.module.css  # Стили таблицы
├── CreateUserModal.module.css  # Стили модального окна создания
├── DeleteUserModal.module.css  # Стили модального окна удаления
└── index.ts                    # Экспорты модуля
```

## API Интеграция

Модуль использует `usersApiClient` для работы с бэкенд API:

### Endpoints

- `GET /api/v1/users` — получить список пользователей
- `POST /api/v1/users` — создать нового пользователя
- `DELETE /api/v1/users/:id` — удалить пользователя
- `POST /api/v1/users/:id/block` — заблокировать пользователя
- `POST /api/v1/users/:id/unblock` — разблокировать пользователя

### Типы данных

Актуальные типы — в [`@/shared/api/users-api-client`](../../shared/api/users-api-client.ts):

```typescript
interface CreateUserRequest {
  full_name: string
  pinfl: string           // 14 цифр
  birthday_date: string
  phone_number: string
  username: string
  password: string        // минимум 6 символов
  responsible_module: string
  level: string           // department | region | district
  org_id: string          // UUID
  role_ids: string[]      // UUID[]
  position_id?: string
  region_id?: string
  district_id?: string
  temporary_modules?: string[]
}

interface UserResponse {
  id: string
  full_name: string
  username: string
  phone_number?: string
  level?: string
  is_blocked: boolean
  created_at: string
  org_name?: string
  region_name?: string
  district_name?: string
  roles?: Array<{ id?: string; name_of_role: string }>
}
```

Справочники для формы создания (организации, роли, регионы, районы, должности)
загружаются через `referencesApiClient`.

## Использование

1. Админ-панель доступна в левой боковой панели под пунктом "Администратор"
2. Нажмите "+ Добавить пользователя" для создания нового пользователя
3. Заполните форму и нажмите "Создать пользователя"
4. Для удаления пользователя нажмите кнопку "Удалить" в таблице

## Тестирование

### Локальное тестирование

1. Убедитесь, что бэкенд запущен на `http://localhost:3000`
2. Запустите фронт: `npm run dev`
3. Перейдите на `http://localhost:3001`
4. Нажмите "Администратор" в левой панели

### Требования к бэкенду

- JWT токен должен быть сохранен в `localStorage` под ключом `access_token`
- API должен возвращать данные в формате, указанном в `UserResponse`
- Все endpoints требуют авторизации (Bearer token)

## Ошибки и обработка

- Ошибки загрузки пользователей отображаются в красном блоке
- Ошибки создания/удаления пользователя показываются в модальном окне
- Все ошибки логируются в консоль браузера

## Следующие шаги

- [ ] Добавить блокировку/разблокировку пользователей
- [ ] Добавить редактирование данных пользователя
- [ ] Добавить пагинацию
- [ ] Добавить фильтры по статусу и ролям
- [ ] Добавить экспорт в CSV
