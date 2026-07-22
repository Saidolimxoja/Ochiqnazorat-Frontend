const DEFAULT_BASE_URL = 'http://localhost:3000/api/v1'

/**
 * Базовый URL API. Префикс /api/v1 добавляется автоматически, если его нет
 * в NEXT_PUBLIC_API_URL — переменную можно задавать в обоих видах.
 */
export function resolveApiBaseUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_API_URL || DEFAULT_BASE_URL).replace(/\/+$/, '')
  return raw.includes('/api/v1') ? raw : `${raw}/api/v1`
}

function readAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('access_token')
}

export type HttpClientConfig = {
  baseUrl?: string
  getAuthToken?: () => string | null
}

async function readError(res: Response): Promise<string> {
  const body = (await res.json().catch(() => null)) as { message?: string | string[] } | null
  const message = body?.message
  if (Array.isArray(message)) return message.join(', ')
  return message || `HTTP ${res.status}`
}

export function createHttpClient(config: HttpClientConfig = {}) {
  const base = (config.baseUrl ?? resolveApiBaseUrl()).replace(/\/+$/, '')
  const getAuthToken = config.getAuthToken ?? readAuthToken

  async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const headers = new Headers(init?.headers)
    if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json')

    const token = getAuthToken()
    if (token) headers.set('Authorization', `Bearer ${token}`)

    const res = await fetch(`${base}/${path.replace(/^\//, '')}`, { ...init, headers })
    if (!res.ok) throw new Error(await readError(res))
    if (res.status === 204) return undefined as T

    return res.json() as Promise<T>
  }

  const withBody = (method: string) => (
    <T,>(path: string, body?: unknown) =>
      request<T>(path, {
        method,
        body: body === undefined ? undefined : JSON.stringify(body),
      })
  )

  return {
    get: <T,>(path: string, signal?: AbortSignal) => request<T>(path, { method: 'GET', signal }),
    post: withBody('POST'),
    patch: withBody('PATCH'),
    delete: withBody('DELETE'),
  }
}

export type HttpClient = ReturnType<typeof createHttpClient>

/** Общий клиент, используемый всеми доменными API-модулями. */
export const httpClient = createHttpClient()
