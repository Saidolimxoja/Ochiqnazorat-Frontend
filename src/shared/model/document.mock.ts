import type { DocumentItem } from './document'

export const MOCK_DOCUMENTS: DocumentItem[] = [
  {
    id: '1',
    category: 'Ichki',
    ref: '01-07/82',
    number: 'EDO-2026-01482',
    dateDisplay: '12 may 2026',
    status: 'Ko‘rib chiqish',
    summary: 'Tashkiliy buyruq — ichki nazorat bo‘limi lavozim yo‘riqnomasi.',
    dateShort: '14.05.2026',
  },
  {
    id: '2',
    category: 'Chiquvchi',
    ref: '01-07/71',
    number: 'EDO-2026-01401',
    dateDisplay: '11 may 2026',
    status: 'Imzolangan',
    summary: 'Moliya bo‘yicha hisobot va bajarilishi bo‘yicha eslatma.',
    dateShort: '12.05.2026',
  },
  {
    id: '3',
    category: 'Javob',
    ref: '01-06/55',
    number: 'EDO-2026-01356',
    dateDisplay: '9 may 2026',
    status: 'Qoralama',
    summary: 'Perimeter xavfsizligi auditidan keyin tuzatish rejalari.',
    dateShort: '09.05.2026',
  },
  {
    id: '4',
    category: 'Murojaat',
    ref: '01-05/40',
    number: 'EDO-2026-01290',
    dateDisplay: '5 may 2026',
    status: 'Yuborilgan',
    summary: 'Huquq bo‘limiga murojaat — shartnoma uzaytirish.',
    dateShort: '05.05.2026',
  },
]
