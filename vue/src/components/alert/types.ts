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
}

export interface IEmits {
  // (eventName, ...args): void
  (eventName: 'close', e: MouseEvent): void
}

export interface IExpose {
  hide: () => void
}
