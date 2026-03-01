import { useZIndex } from '@/hooks'
import {
  type IExpose,
  type IMessageContext,
  type IProps,
  type IToast,
  closeAll,
  messageContexts,
} from '@/components/message/types'
import { createHash } from '@/utils'
import LarkMessage from '@/components/message'
import { type FC, type ReactElement } from 'react'
import { createRoot } from 'react-dom/client'

function createToast(type: IProps['type'], message: string, closable?: boolean, duration?: number) {
  const { nextZIndex } = useZIndex()
  const messageId = createHash()

  // const container = document.body
  const container = document.createElement('div')
  document.body.appendChild(container)

  // ========== React ==========
  const root = createRoot(container)

  const handleClose = () => {
    const idx = messageContexts.findIndex((ctx) => ctx.id === messageId)
    if (idx != -1) {
      messageContexts.splice(idx, 1)
    }
    root.unmount()
    container.remove()
  }

  const newProps: IProps = {
    ...{ type, message, duration, showClose: closable },
    id: messageId,
    zIndex: nextZIndex(),
    onClose: handleClose,
  }

  if (import.meta.env.DEV) {
    // Will be tree shaken in production
    console.log('ToastComponent', newProps)
  }

  const ctx: IMessageContext = {
    id: messageId,
    onClose: handleClose,
    expose: null,
  }

  const refCallback = (expose: IExpose) => {
    if (import.meta.env.DEV) {
      console.log('Attached', expose)
    }
    ctx.expose = expose
    return () => {
      if (import.meta.env.DEV) {
        console.log('Clean up', expose)
      }
      // handleClose();
      queueMicrotask(handleClose)
    }
  }

  // ComponentType: Class Component, Function Component
  // FC: Function Component
  const element: ReactElement<IProps, FC<IProps>> = <LarkMessage {...newProps} ref={refCallback} />

  messageContexts.push(ctx)
  root.render(element)
}

const LarkToast: IToast = {
  success: (message: string, closable?: boolean, duration?: number) => {
    createToast('success', message, closable, duration)
  },
  error: (message: string, closable?: boolean, duration?: number) => {
    createToast('error', message, closable, duration)
  },
  warning: (message: string, closable?: boolean, duration?: number) => {
    createToast('warning', message, closable, duration)
  },
  info: (message: string, closable?: boolean, duration?: number) => {
    createToast('info', message, closable, duration)
  },
  closeAll,
}

export default LarkToast
