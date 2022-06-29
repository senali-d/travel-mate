import { Outlet } from 'react-router-dom'
import Header from './header'
import Footer from '../../../common/layout/footer'

const AdminLayout = () => {
  return (
    <div className="bg-indigo-50">
      <Header />
      <div className="min-h-[calc(100vh-165px)] pt-16 px-2 sm:px-4 lg:px-0 mx-auto max-w-[1080px] ">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default AdminLayout