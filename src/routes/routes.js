import { Routes, Route } from 'react-router-dom'

import RouteRegistry from './RouteRegistry'
import { Roles } from '../constants/enums'
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
import Profile from '../components/profile'
import PlaceDetail from '../components/places/place-detail'
import Hotel from '../components/hotel'
import HotelDetail from '../components/hotel/hotel-detail'
import MyPlaces from '../components/places/my-places'
import TravellerDetail from '../components/traveller/traveller-detail'
import Traveller from '../components/traveller'

const AllRoutes = () => {
  return (
    <Routes>
      <Route exact element={<Layout />} >
        <Route index element={<Home />} />
        <Route path={RouteRegistry.places.path} element={<Places />} />
        <Route path={RouteRegistry.placeDetail.path} element={<PlaceDetail />} />
        <Route path={RouteRegistry.guides.path} element={<Guides />} />
        <Route path={RouteRegistry.about.path} element={<About />} />
        <Route path={RouteRegistry.contact.path} element={<Contact />} />
        <Route path={RouteRegistry.hotels.path}element={<Hotel />} />
        <Route path={RouteRegistry.hotelDetail.path} element={<HotelDetail />} />
        <Route path={RouteRegistry.traveller.path} element={<Traveller />} />
        <Route path={RouteRegistry.travellerDetail.path} element={<TravellerDetail />} />
        <Route 
          path={RouteRegistry.profile.path} 
          element={
            <PrivateRoute role={Roles.TRAVELLER}>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route 
          path={RouteRegistry.myPlaces.path} 
          element={
            <PrivateRoute role={Roles.TRAVELLER}>
              <MyPlaces />
            </PrivateRoute>
          } 
        />
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
