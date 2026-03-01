import type { ReactNode } from 'react'

export interface IProps {
  id: string
  message?: ReactNode
  duration?: number
  showClose?: boolean
  type?: 'success' | 'warning' | 'error' | 'info'
  zIndex?: number
  offset?: number
  shouldHandleExited?: boolean
  onClose?: () => void
}

export interface IMessageContext {
  id: string
  expose: IExpose | null
  onClose: () => void
}

export interface IExpose {
  bottomOffset: number
  alive: boolean
}

type TToastFunc = (message: string, showClose?: boolean, duration?: number) => void

export interface IToast {
  success: TToastFunc
  error: TToastFunc
  warning: TToastFunc
  info: TToastFunc
  closeAll: () => void
}

export const messageContexts: IMessageContext[] = []

export function getPrevBottomOffset(id: string) {
  const index = messageContexts.findIndex((item) => item.id === id)
  if (index === -1) return 0
  const prev = messageContexts[index - 1]
  return prev?.expose?.bottomOffset ?? 0
}

export function closeAll() {
  messageContexts.forEach((item) => {
    // item.root?.unmount()
    // item.container?.remove()

    item.onClose()
  })
}
