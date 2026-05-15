export type HttpClientConfig = {
  baseUrl: string
  getAuthToken?: () => string | null
}

export function createHttpClient(config: HttpClientConfig) {
  const base = config.baseUrl.replace(/\/$/, '')

  async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const url = `${base}/${path.replace(/^\//, '')}`
    const headers = new Headers(init?.headers)
    const token = config.getAuthToken?.()
    if (token) headers.set('Authorization', `Bearer ${token}`)
    const res = await fetch(url, { ...init, headers })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`)
    }
    return res.json() as Promise<T>
  }

  return {
    get: <T>(path: string, signal?: AbortSignal) =>
      request<T>(path, { method: 'GET', signal }) as Promise<T>,
  }
}

export type HttpClient = ReturnType<typeof createHttpClient>
