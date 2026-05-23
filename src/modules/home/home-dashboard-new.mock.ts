export interface RegionProgress {
  name: string
  count1: number
  count2: number
  percentage: number
}

export interface AdvanceChartSegment {
  id: 'received' | 'notReceived'
  name: string
  value: number
  count: number
  percent: number
  color: string
}

export const ADVANCE_CHART_MOCK = {
  total: 4800,
  segments: [
    {
      id: 'received',
      name: 'Аванс тушган',
      value: 40,
      count: 1920,
      percent: 40,
      color: '#2fd17f',
    },
    {
      id: 'notReceived',
      name: 'Аванс тушмаган',
      value: 60,
      count: 2880,
      percent: 60,
      color: '#fb5f5f',
    },
  ],
} as const satisfies { total: number; segments: AdvanceChartSegment[] }

export const REGIONS_MOCK: RegionProgress[] = [
  { name: 'Тошкент шаҳар', count1: 1594, count2: 8600.9, percentage: 48 },
  { name: 'Қорақалпоғистон', count1: 1594, count2: 8600.9, percentage: 47 },
  { name: 'Жиззах', count1: 1594, count2: 8600.9, percentage: 46 },
  { name: 'Навоий', count1: 1594, count2: 8600.9, percentage: 46 },
  { name: 'Самарқанд', count1: 1594, count2: 8600.9, percentage: 45 },
  { name: 'Тошкент вилояти', count1: 1482, count2: 8120.4, percentage: 44 },
  { name: 'Наманган', count1: 1420, count2: 7890.2, percentage: 43 },
  { name: 'Андижон', count1: 1388, count2: 7654.1, percentage: 42 },
  { name: 'Фарғона', count1: 1356, count2: 7420.8, percentage: 41 },
  { name: 'Бухоро', count1: 1294, count2: 7180.5, percentage: 40 },
  { name: 'Қашқадарё', count1: 1240, count2: 6920.3, percentage: 39 },
  { name: 'Хоразм', count1: 1188, count2: 6680.7, percentage: 38 },
  { name: 'Сурхондарё', count1: 1124, count2: 6340.2, percentage: 37 },
  { name: 'Сирдарё', count1: 1060, count2: 5980.6, percentage: 36 },
]
