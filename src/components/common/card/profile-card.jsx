import PropTypes from 'prop-types'
import { GoLocation } from 'react-icons/go'

const ProfileCard = ({ image, name, location, email, mobile }) => {
  return (
    <div className="lg:w-[calc(33%-1rem)] w-[100%] sm:w-[calc(50%-0.5rem)] bg-white rounded-lg border border-gray-200 shadow-md pt-7">
      <div className="flex flex-col items-center pb-10">
        <img
          className="mb-3 w-24 h-24 rounded-full shadow-lg object-cover"
          src={image}
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900">
          {name}
        </h5>
        {location && <span className="flex items-center gap-1 text-sm text-gray-500 text-center">
          <GoLocation className="text-[#b1b845]" />{location}
        </span>}
        <div className="flex flex-col mt-4 lg:mt-6">
          <span className="text-sm text-gray-500 text-center">
            {email}
          </span>
          <span className="text-sm text-gray-500 text-center">
            {mobile}
          </span>
        </div>
      </div>
    </div>
  )
}

ProfileCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  locations: PropTypes.arrayOf(PropTypes.string),
  email: PropTypes.string.isRequired,
  mobile: PropTypes.string.isRequired,
}

ProfileCard.defaultProps = {
  location: '',
}

export default ProfileCard
