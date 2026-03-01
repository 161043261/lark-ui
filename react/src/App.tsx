import { Link, Outlet, useLocation } from 'react-router'

function App() {
  const { pathname } = useLocation()
  return (
    <>
      {pathname !== '/' && (
        <div>
          <Link to="/">Index</Link>
        </div>
      )}
      {/* Similar to vue-router <RouterView /> */}
      <Outlet />
    </>
  )
}

export default App
