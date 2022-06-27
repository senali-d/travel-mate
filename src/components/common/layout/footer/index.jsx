import { Link } from 'react-router-dom'
import { AiOutlineTwitter, AiFillGithub} from 'react-icons/ai'

import RouteRegistry from '../../../../routes/RouteRegistry'

const Footer = () => {
  return (
    <footer className=" w-full p-4 sm:p-6 sm:px-4 bg-indigo-50">
      <div className="mx-auto max-w-[1080px]">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link to={RouteRegistry.home.path} className="flex items-center mb-4 sm:mb-0">
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              {RouteRegistry.home.title}
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0">
            <li>
              <Link to={RouteRegistry.about.path} className="mr-4 hover:underline md:mr-6">
                {RouteRegistry.about.title}
              </Link>
            </li>
            <li>
              <Link to={RouteRegistry.contact.path} className="hover:underline">
                {RouteRegistry.contact.title}
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-300 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            {`© 2022 `}
            <Link to={RouteRegistry.home.path} className="hover:underline">
              Travel Mate
            </Link>
            {` | All Rights Reserved | Design & Developed by @Senali`}
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a
              to="https://twitter.com/senali_d"
              className="text-gray-500 hover:text-gray-900"
            >
              <AiOutlineTwitter />
            </a>
            <a
              to="https://github.com/senali-d"
              className="text-gray-500 hover:text-gray-900"
            >
              <AiFillGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
