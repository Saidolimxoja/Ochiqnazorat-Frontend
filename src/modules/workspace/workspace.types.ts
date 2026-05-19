import type { MAIN_FILTERS } from './workspace.config'

export type MainFilterId = (typeof MAIN_FILTERS)[number]['id']
export type FilterId = MainFilterId | 'internal'
export type ListDensity = 'grid' | 'list'
