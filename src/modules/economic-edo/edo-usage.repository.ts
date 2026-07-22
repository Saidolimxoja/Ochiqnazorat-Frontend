import type { EdoUsageRow } from './edo-usage.types'
import { EDO_USAGE_MOCK } from './edo-mock-data'
import { httpClient, type HttpClient } from '@/shared/api/http-client'

export type EdoUsageRepository = {
  fetchUsageRows(signal?: AbortSignal): Promise<EdoUsageRow[]>
}

export function createMockEdoUsageRepository(): EdoUsageRepository {
  return {
    async fetchUsageRows(signal) {
      if (signal?.aborted) throw new DOMException('Aborted', 'AbortError')
      await Promise.resolve()
      if (signal?.aborted) throw new DOMException('Aborted', 'AbortError')
      return [...EDO_USAGE_MOCK]
    },
  }
}

export function createHttpEdoUsageRepository(
  client: HttpClient = httpClient,
  path: string = '/edo/usage',
): EdoUsageRepository {
  return {
    fetchUsageRows(signal) {
      return client.get<EdoUsageRow[]>(path, signal)
    },
  }
}

export const defaultEdoUsageRepository: EdoUsageRepository = createMockEdoUsageRepository()
