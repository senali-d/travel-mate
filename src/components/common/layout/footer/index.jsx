import { Link } from 'react-router-dom'
import { AiOutlineTwitter, AiFillGithub} from 'react-icons/ai'

import RouteRegistry from '../../../../routes/RouteRegistry'

const Footer = () => {
  return (
    <footer className=" w-full p-4 sm:p-6 sm:px-4 bg-[#45576f] text-[#bac0cb]">
      <div className="mx-auto max-w-[1080px]">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link to={RouteRegistry.home.path} className="flex items-center mb-4 sm:mb-0">
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              {RouteRegistry.home.title}
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm sm:mb-0">
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
        <hr className="my-6 border-[#bac0cb] sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm sm:text-center">
            {`© 2022 `}
            <Link to={RouteRegistry.home.path} className="hover:underline">
              Travel Mate
            </Link>
            {` | All Rights Reserved | Design & Developed by @Senali`}
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a
              href="https://twitter.com/senali_d"
              className="hover:text-[#b1b845]"
            >
              <AiOutlineTwitter size="20" />
            </a>
            <a
              href="https://github.com/senali-d"
              className="hover:text-[#b1b845]"
            >
              <AiFillGithub size="20" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
