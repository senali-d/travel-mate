import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import AuthService from './containers/auth'
import AllRoutes from './routes/routes'

const App = () => {

  return (
    <AuthService.Provider>
      <BrowserRouter>
        <ToastContainer />
        <AllRoutes />
      </BrowserRouter>
    </AuthService.Provider>
  )
}

export default App
