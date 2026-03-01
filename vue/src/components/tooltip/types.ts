import type { Options, Placement } from '@popperjs/core'

export interface IProps {
  content?: string
  trigger?: 'hover' | 'click'
  placement?: Placement
  manual?: boolean // 是否手动控制显示隐藏
  popperOptions?: Partial<Options>
  transition?: string
  openDelay?: number
  closeDelay?: number
}

export interface IEmits {
  (eventName: 'visibleChange', value: boolean): void
  (eventName: 'clickOutside', value: boolean): void
}

export interface ITooltipInstance {
  show: () => void
  hide: () => void
}

export const DEFAULT_CLOSE_DELAY = 50
