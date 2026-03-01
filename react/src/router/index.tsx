import App from '@/App'
import { createBrowserRouter } from 'react-router'
import routes from './routes'

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: routes,
  },
])

export default router
