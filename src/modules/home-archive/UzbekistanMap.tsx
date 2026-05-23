import { UZBEKISTAN_MAP_PATHS } from './uzbekistan-map-paths'
import styles from './HomeDashboard.module.css'

type Props = {
  hoveredRegion: string | null
  onHoverRegion: (id: string | null) => void
}

export function UzbekistanMap({ hoveredRegion, onHoverRegion }: Props) {
  return (
    <svg className={styles.uzbMapSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 793 517">
      {UZBEKISTAN_MAP_PATHS.map((path) => {
        if (path.variant === 'sea') {
          return <path key={path.id} id={path.id} className={styles.aralSea} d={path.d} />
        }

        const isCity = path.variant === 'city'
        const hovered = hoveredRegion === path.id
        const className = [
          styles.mapRegion,
          isCity ? styles.tashkentCityPath : '',
          hovered ? styles.hovered : '',
        ]
          .filter(Boolean)
          .join(' ')

        return (
          <path
            key={path.id}
            id={path.id}
            className={className}
            d={path.d}
            onMouseEnter={() => onHoverRegion(path.id)}
            onMouseLeave={() => onHoverRegion(null)}
          />
        )
      })}
    </svg>
  )
}
