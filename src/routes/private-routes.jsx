import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import AuthService from '../containers/auth'
import RouteRegistry from './RouteRegistry'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = AuthService.useContainer()

  const auth = isAuthenticated()
  return auth ? children : <Navigate to={RouteRegistry.home.path} />
}

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default PrivateRoute
