import { shallowReactive, type Ref, type VNode } from 'vue'

export interface IProps {
  id: string
  message?: string | VNode
  duration?: number
  showClose?: boolean
  type?: 'success' | 'warning' | 'error' | 'info'
  zIndex?: number
  offset?: number
  onClose?: () => void
}

export interface IMessageContext {
  id: string
  expose?: IExpose
  onClose: () => void
}

export interface IExpose {
  bottomOffset: number
  alive: Ref<boolean>
}

export type TToastFunc = (message: string, closable?: boolean, duration?: number) => void

export interface IToast {
  success: TToastFunc
  error: TToastFunc
  warning: TToastFunc
  info: TToastFunc
  closeAll: () => void
}

export const messageContexts = shallowReactive<IMessageContext[]>([])

export function getPrevBottomOffset(id: string) {
  const idx = messageContexts.findIndex((item) => item.id === id)
  if (idx <= 0) {
    return 0
  }
  const prev = messageContexts[idx - 1]
  return prev?.expose?.bottomOffset ?? 0
}

export function closeAll() {
  messageContexts.forEach((item) => item.onClose())
}
