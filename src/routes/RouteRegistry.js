const RouteRegistry = {
  home: {
    path: '/',
    title: 'Travel Mate',
  },
  places: {
    path: '/place',
    title: 'Destinations',
  },
  myPlaces: {
    path: '/my-trip',
    title: 'My Trips',
  },
  placeDetail: {
    path: '/place/:id',
    title: 'Place Detail'
  },
  guides: {
    path: '/guide',
    title: 'Guides',
  },
  about: {
    path: '/about',
    title: 'About',
  },
  contact: {
    path: '/contact',
    title: 'Contact',
  },
  profile: {
    path: '/profile',
    title: 'My Profile',
  },
  hotels: {
    path: '/hotel',
    title: 'Hotel',
  },
  hotelDetail: {
    path: '/hotel/:id',
    title: 'Hotel Detail'
  },
  atm: {
    path: '/atm',
    title: 'ATM',
  },
  adminDashboard: {
    path: '/admin',
    title: 'Dashboard',
  },
  adminPlaces: {
    path: '/admin/place',
    title: 'Places',
  },
  adminGuides: {
    path: '/admin/guide',
    title: 'Guides',
  },
}

export default RouteRegistry
