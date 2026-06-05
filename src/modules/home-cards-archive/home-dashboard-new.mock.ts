export interface RegionProgress {
  name: string
  count1: number
  count2: number
  percentage: number
}

export const REGIONS_MOCK: RegionProgress[] = [
  { name: 'Қорақалпоғистон', count1: 1594, count2: 8600.9, percentage: 45 },
  { name: 'Жиззах', count1: 1594, count2: 8600.9, percentage: 45 },
  { name: 'Навоий', count1: 1594, count2: 8600.9, percentage: 45 },
  { name: 'Самарқанд', count1: 1594, count2: 8600.9, percentage: 45 },
]

export const INVOICE_REGIONS_MOCK = [
  { name: 'Самарқанд', count: 1594 },
  { name: 'Қорақалпоғистон', count: 1594 },
  { name: 'Жиззах', count: 1594 },
]
