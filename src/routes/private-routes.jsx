import { useState } from 'react'
import PropTypes from 'prop-types'

import { Navigate } from 'react-router-dom'
import AuthContainer from '../containers/auth'
import RouteRegistry from './RouteRegistry'
import { Roles } from '../constants/enums'

const PrivateRoute = ({ children, role }) => {
  const authService = AuthContainer.useContainer()
  const { isAuthenticated, getUserInfo } = authService
  const [isLoading, setIsLoading] = useState(true)

  setTimeout(checkAuthState, 10);
  const auth = isAuthenticated()
  const userInfo = getUserInfo()

  function checkAuthState() {
    setIsLoading(false)
  }

  if(isLoading) {
    <Navigate to={RouteRegistry.home.path} />
  }else {
    if(auth && userInfo.role === role) {
      return children
    }else {
      return <Navigate to={RouteRegistry.home.path} />
    }
  }

}

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  role: PropTypes.string,
}

PrivateRoute.defaultProps = {
  role: Roles.ADMIN,
}

export default PrivateRoute
