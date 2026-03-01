import routes from '@/router/routes'
import { Link } from 'react-router'

function Index() {
  return (
    <ul>
      {routes.map(({ path, id }) => (
        <li key={path}>
          <Link to={path}>{id}</Link>
        </li>
      ))}
    </ul>
  )
}

export default Index
