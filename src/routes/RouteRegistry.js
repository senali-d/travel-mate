const RouteRegistry = {
  home: {
    path: '/',
    title: 'Travel Mate',
  },
  places: {
    path: '/place',
    title: 'Places',
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
    title: 'Profile',
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
