import { render, type VNode } from 'vue'
import LarkMessage from '../index.vue'
import { useZIndexV2 as useZIndex } from '@/hooks'
import {
  messageContexts,
  closeAll,
  type IExpose,
  type IMessageContext,
  type IProps,
  type IToast,
} from '../types'
import { createHash } from '@/utils'

function createToast(type: IProps['type'], message: string, closable?: boolean, duration?: number) {
  const { nextZIndex } = useZIndex()
  const messageId = createHash()

  // const container = document.body
  const container = document.createElement('div')
  document.body.appendChild(container)

  const handleClose = () => {
    const idx = messageContexts.findIndex((ctx) => ctx.id === messageId)
    if (idx != -1) {
      messageContexts.splice(idx, 1)
    }
    render(null, container)
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

  const vNode: VNode = <LarkMessage {...newProps} />
  const ctx: IMessageContext = {
    id: messageId,
    onClose: handleClose,
  }
  messageContexts.push(ctx)
  render(vNode, container)
  ctx.expose = vNode.component?.exposed as IExpose
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
