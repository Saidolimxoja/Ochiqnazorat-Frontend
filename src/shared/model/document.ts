export type DocumentItem = {
  id: string
  category: string
  ref: string
  number: string
  dateDisplay: string
  status: string
  summary: string
  dateShort: string
}

export { MOCK_DOCUMENTS as documents } from './document.mock'
