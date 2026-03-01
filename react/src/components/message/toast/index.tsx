import { useZIndex } from '@/hooks'
import {
  type IExpose,
  type IMessageContext,
  type IProps,
  type IToast,
  closeAll,
  messageContexts,
} from '../types'
import { createHash } from '@/utils'
import LarkMessage from '..'
import { createRef, type FC, type ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
// import { flushSync } from 'react-dom'

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
    // ========== Vue ==========
    // render(null, container)
    // ========== React ==========

    // <CSSTransition /> 组件的 onExited 回调函数中
    // 同步调用 root.unmount() 卸载 React 组件
    // 但此时 React 正在渲染
    // 使用 setTimeout(cb, 0) 或 queueMicrotask(cb)
    // 将卸载操作推迟到下一个事件循环

    // root.unmount()
    // container.remove()

    queueMicrotask(() => {
      root.unmount()
      container.remove()
    })
  }

  const newProps: IProps = {
    ...{ type, message, duration, showClose: closable },
    id: messageId,
    zIndex: nextZIndex(),
    onClose: handleClose,
  }

  if (import.meta.env.DEV) {
    // Will be tree shaken in production
    console.log('[createToast] newProps', newProps)
  }

  const ctx: IMessageContext = {
    id: messageId,
    onClose: handleClose,
    expose: null,
  }

  const ref = createRef<IExpose>()

  // ComponentType: Class Component, Function Component
  // FC: Function Component
  const element: ReactElement<IProps, FC<IProps>> = (
    <LarkMessage {...newProps} ref={ref} shouldHandleExited />
  )

  messageContexts.push(ctx)
  // render(elem, container)
  root.render(element)

  if (import.meta.env.DEV) {
    console.log('[createToast] current event loop ref.current', ref.current)
  }

  // Using flushSync is uncommon and can hurt the performance of your app.
  // flushSync(() => {
  //   root.render(element)
  // })
  // ctx.expose = ref.current

  requestAnimationFrame(() => {
    if (import.meta.env.DEV) {
      console.log('[createToast] requestAnimationFrame ref.current', ref.current)
    }
    ctx.expose = ref.current
  })
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
