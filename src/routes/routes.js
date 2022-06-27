import { Routes, Route } from 'react-router-dom'

import RouteRegistry from './RouteRegistry'
import Layout from '../components/common/layout'
import Home from '../components/home'
import About from '../components/about'
import Contact from '../components/contact'
import Places from '../components/places'
import Guides from '../components/guides'
import NotFound from '../components/common/not-found'

const AllRoutes = () => {
  return (
    <Routes>
      <Route exact element={<Layout />} >
        <Route index element={<Home />} />
        <Route path={RouteRegistry.places.path} element={<Places />} />
        <Route path={RouteRegistry.guides.path} element={<Guides />} />
        <Route path={RouteRegistry.about.path} element={<About />} />
        <Route path={RouteRegistry.contact.path} element={<Contact />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AllRoutes
