import { Routes, Route } from 'react-router-dom'

import RouteRegistry from './RouteRegistry'
import Layout from '../components/common/layout'
import Home from '../components/home'
import About from '../components/about'
import Contact from '../components/contact'
import Places from '../components/places'
import Guides from '../components/guides'
import NotFound from '../components/common/not-found'
import AdminLayout from '../components/admin/common/layout'
import AdminDashboard from '../components/admin/dashboard'
import AdminPlaces from '../components/admin/places'
import AdminGuides from '../components/admin/guides'
import PrivateRoute from './private-routes'

const AllRoutes = () => {
  return (
    <Routes>
      <Route exact element={<Layout />} >
        <Route index element={<Home />} />
        <Route path={RouteRegistry.places.path} element={<Places />} />
        <Route path={RouteRegistry.guides.path} element={<Guides />} />
        <Route path={RouteRegistry.about.path} element={<About />} />
        <Route path={RouteRegistry.contact.path} element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route 
        path={RouteRegistry.adminDashboard.path} 
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route 
          path={RouteRegistry.adminDashboard.path}
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path={RouteRegistry.adminPlaces.path}
          element={
            <PrivateRoute>
              <AdminPlaces />
            </PrivateRoute>
          } 
        />
        <Route 
          path={RouteRegistry.adminGuides.path}
          element={
            <PrivateRoute>
              <AdminGuides />
            </PrivateRoute>
          } 
        />
      </Route>
    </Routes>
  )
}

export default AllRoutes
