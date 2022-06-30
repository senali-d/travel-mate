import { BrowserRouter } from 'react-router-dom'

import AuthService from './container/auth'
import AllRoutes from './routes/routes'

const App = () => {
  return (
    <AuthService.Provider>
      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
    </AuthService.Provider>
  )
}

export default App
