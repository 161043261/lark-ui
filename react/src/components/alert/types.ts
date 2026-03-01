import type { MouseEvent } from 'react'

type TAlertType = 'success' | 'warning' | 'info' | 'error'
type TEffectType = 'light' | 'dark'

export interface IProps {
  title: string
  type: TAlertType
  description?: string
  closable?: boolean
  center?: boolean
  showIcon?: boolean
  effect: TEffectType
  closeText?: string
  onClose?: (e: MouseEvent) => void
}

export interface IExpose {
  hide: () => void
}
