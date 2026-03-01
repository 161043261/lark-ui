import { lazy, Suspense, type ComponentType } from 'react'
import type { RouteObject } from 'react-router'

type DynamicImport = () => Promise<{ default: ComponentType }>

const withLazy = (cb: DynamicImport) => {
  const Page = lazy(cb)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  )
}

const routes: Required<Pick<RouteObject, 'path' | 'id' | 'element'>>[] = [
  {
    path: '/',
    id: 'index',
    element: withLazy(() => import('../pages')),
  },
  {
    path: '/alert',
    id: 'alert',
    element: withLazy(() => import('../pages/alert')),
  },
  {
    path: '/button',
    id: 'button',
    element: withLazy(() => import('../pages/button')),
  },
  {
    path: '/collapse',
    id: 'collapse',
    element: withLazy(() => import('../pages/collapse')),
  },
  {
    path: '/message',
    id: 'message',
    element: withLazy(() => import('../pages/message')),
  },
  {
    path: '/form',
    id: 'form',
    element: withLazy(() => import('../pages/form')),
  },
]

export default routes
