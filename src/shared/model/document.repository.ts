import { httpClient, type HttpClient } from '@/shared/api/http-client'
import type { DocumentItem } from './document'
import { MOCK_DOCUMENTS } from './document.mock'

export type DocumentRepository = {
  fetchDocuments(signal?: AbortSignal): Promise<DocumentItem[]>
}

export function createMockDocumentRepository(): DocumentRepository {
  return {
    async fetchDocuments(signal) {
      if (signal?.aborted) throw new DOMException('Aborted', 'AbortError')
      await Promise.resolve()
      if (signal?.aborted) throw new DOMException('Aborted', 'AbortError')
      return [...MOCK_DOCUMENTS]
    },
  }
}

export function createHttpDocumentRepository(
  client: HttpClient = httpClient,
  path: string = '/isign/documents',
): DocumentRepository {
  return {
    fetchDocuments(signal) {
      return client.get<DocumentItem[]>(path, signal)
    },
  }
}

export const defaultDocumentRepository: DocumentRepository = createMockDocumentRepository()
