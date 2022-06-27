import { Routes, Route } from 'react-router-dom'

import RouteRegistry from './RouteRegistry'
import Layout from '../components/common/layout'
import Home from '../components/home'
import NotFound from '../components/common/not-found'

const AllRoutes = () => {
  return (
    <Routes>
      <Route exact element={<Layout />} >
        <Route index element={<Home />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AllRoutes
