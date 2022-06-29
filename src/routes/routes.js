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
      <Route path={RouteRegistry.adminDashboard.path} element={<AdminLayout />} >
        <Route path={RouteRegistry.adminDashboard.path} element={<AdminDashboard />} />
        <Route path={RouteRegistry.adminPlaces.path} element={<AdminPlaces />} />
        <Route path={RouteRegistry.adminGuides.path} element={<AdminGuides />} />
      </Route>
    </Routes>
  )
}

export default AllRoutes
