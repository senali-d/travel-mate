import { useNavigate } from 'react-router-dom'
import { AiOutlineArrowRight } from 'react-icons/ai'

import RouteRegistry from '../../../routes/RouteRegistry'
import backgroundWarning from '../../../assets/images/404-warning.png'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-[calc(100vh-229px)] items-center justify-center text-gray-600">
      <div className="flex justify-center">
        <div className="flex flex-col items-center">
          <img
            className="w-16 my-0 mx-auto"
            src={backgroundWarning}
            alt="404"
          />
          <h1 className="text-center py-3 text-3xl font-bold">
            Page Not Found
          </h1>
          <h6 className="text-center py-3 text-md">
            The page you are looking for doesn"t exist or <br /> has been moved.
          </h6>
          <button
            className="flex justify-center items-center w-[200px] mx-auto bg-[#b1b845] py-3 text-white rounded-md"
            onClick={() => navigate(RouteRegistry.home.path)}
          >
            <span className="pr-2">Back to Home</span>
            <AiOutlineArrowRight className="pt-1" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
