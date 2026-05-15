import { DEFAULT_SESSION_DISPLAY } from '@/shared/config/session-display'

type Props = {
  className: string
  size: number
}

export function HeaderUserAvatar({ className, size }: Props) {
  return (
    <img
      src={DEFAULT_SESSION_DISPLAY.avatarSrc}
      alt=""
      className={className}
      width={size}
      height={size}
      decoding="async"
    />
  )
}
