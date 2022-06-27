import { BrowserRouter } from 'react-router-dom'

import AllRoutes from './routes/routes'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
    </>
  )
}

export default App
