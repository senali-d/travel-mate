import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Dropdown, Menu } from 'antd'
import { AiOutlineMenu } from 'react-icons/ai'
import { BsGoogle } from 'react-icons/bs'
import { FaUserCircle } from 'react-icons/fa'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { GoogleLogin } from 'react-google-login'

import AuthContainer from '../../../../containers/auth'
import RouteRegistry from '../../../../routes/RouteRegistry'

const Header = () => {
  const { signIn, logOut, isAuthenticated, getUserInfo } = AuthContainer.useContainer()
  const { pathname } = useLocation()
  
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [userInfo, setUserInfo] = useState()

  useEffect(() => {
    const user = getUserInfo()
    if(user !== undefined) {
      setUserInfo(user)
    }
  }, [getUserInfo])
  
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <Link to={RouteRegistry.hotels.path} className="text-gray-700 block px-4 py-2 text-sm hover:text-[#b1b845]">{RouteRegistry.hotels.title}</Link>
          ),
        },
        {
          key: '2',
          label: (
            <Link to={RouteRegistry.atm.path} className="text-gray-700 block px-4 py-2 text-sm hover:text-[#b1b845]">{RouteRegistry.atm.title}</Link>
          ),
        },
      ]}
    />
  );

  const profileMenu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <Link to={RouteRegistry.profile.path} className="text-gray-700 block px-4 py-2 text-sm hover:text-[#b1b845]">{RouteRegistry.profile.title}</Link>
          ),
        },
        {
          key: '2',
          label: (
            <Link to={RouteRegistry.myPlaces.path} className="text-gray-700 block px-4 py-2 text-sm hover:text-[#b1b845]">{RouteRegistry.myPlaces.title}</Link>
          ),
        },
        {
          key: '3',
          label: (
            <div onClick={logOut} className="text-gray-700 block px-4 py-2 text-sm hover:text-[#b1b845]">Sign Out</div>
          ),
        },
      ]}
    />
  );

  return (
    <nav className="fixed z-10 w-full mx-auto bg-indigo-50 border-gray-200 px-2 sm:px-4 py-2.5 rounded shadow">
      <div className="max-w-[1080px] container flex flex-wrap justify-between items-center mx-auto">
        <Link to={RouteRegistry.home.path} className="flex items-center flex-1">
          <span className="self-center text-xl font-bold whitespace-nowrap text-[#45576f]">
            {RouteRegistry.home.title}
          </span>
        </Link>
        <div className="flex md:order-2">
          {isAuthenticated() ? 
            <>
              <Dropdown overlay={profileMenu}>
              {userInfo ? 
                  <img src={userInfo.image} alt={userInfo.name} className="rounded-full ml-4 cursor-pointer w-8 h-8" /> :
                  <FaUserCircle className=" flex self-center text:lg md:text-2xl text-[#6d86a8] cursor-pointer ml-4" size={30} />
                }
              </Dropdown>
            </> :
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              render={renderProps => (
                <button
                  type="button"
                  className="text-white bg-[#b1b845] hover:bg-[#969c3b] focus:ring-4 focus:outline-none focus:ring-transparent font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 ml-5 flex items-center gap-1"
                  onClick={renderProps.onClick} 
                  disabled={renderProps.disabled}
                >
                  <BsGoogle />Sign In
                </button>
              )}
              onSuccess={signIn}
              onFailure={signIn}
              cookiePolicy={'single_host_origin'}
            />
          }
          <button
            data-collapse-toggle="mobile-menu-4"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={() => setIsOpenMenu(!isOpenMenu)}
          >
            <span className="sr-only">Open main menu</span>
            <AiOutlineMenu />
          </button>
        </div>
        <div
          className={`${
            isOpenMenu ? "block" : "hidden"
          } justify-between items-center w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li className="flex items-center">
              <a href={RouteRegistry.about.path} className={`block py-2 pr-4 pl-3 rounded md:bg-transparent ${pathname === RouteRegistry.about.path ? 'md:text-[#b1b845] text-white w-full bg-[#b1b845]' : 'text-[#6d86a8]'} md:hover:text-[#b1b845] md:p-0`}>
                {RouteRegistry.about.title}
              </a>
            </li>
            <li className="flex items-center">
              <a href={RouteRegistry.places.path} className={`block py-2 pr-4 pl-3 rounded md:bg-transparent ${pathname === RouteRegistry.places.path ? 'md:text-[#b1b845] text-white w-full bg-[#b1b845]' : 'text-[#6d86a8]'} md:hover:text-[#b1b845] md:p-0`}>
                {RouteRegistry.places.title}
              </a>
            </li>
            <li className="flex items-center">
              <a href={RouteRegistry.guides.path} className={`block py-2 pr-4 pl-3 rounded md:bg-transparent ${pathname === RouteRegistry.guides.path ? 'md:text-[#b1b845] text-white w-full bg-[#b1b845]' : 'text-[#6d86a8]'} md:hover:text-[#b1b845] md:p-0`}>
                {RouteRegistry.guides.title}
              </a>
            </li>
            <li className="flex items-center">
              <a href={RouteRegistry.traveller.path} className={`block py-2 pr-4 pl-3 rounded md:bg-transparent ${pathname === RouteRegistry.traveller.path ? 'md:text-[#b1b845] text-white w-full bg-[#b1b845]' : 'text-[#6d86a8]'} md:hover:text-[#b1b845] md:p-0`}>
                {RouteRegistry.traveller.title}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header