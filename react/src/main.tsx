import { createRoot } from 'react-dom/client'

import { RouterProvider } from 'react-router'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import './index.css'

library.add(fas)

const container = document.getElementById('root')

if (container) {
  const root = createRoot(container)
  root.render(<RouterProvider router={router} />)
}
