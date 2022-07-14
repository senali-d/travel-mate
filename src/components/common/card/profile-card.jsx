import PropTypes from 'prop-types'
import { GoLocation } from 'react-icons/go'
import Thumbnail from '../../../assets/images/thumbnail.png'

const ProfileCard = ({ image, name, location, email, mobile, stylecss }) => {
  return (
    <div className={`${stylecss} bg-white rounded-lg border border-gray-200 shadow-md pt-7`}>
      <div className="flex flex-col items-center pb-10">
        <img
          className="mb-3 w-24 h-24 rounded-full shadow-lg object-cover"
          src={image === '' ? Thumbnail : image}
          alt={name}
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900">
          {name}
        </h5>
        {location && <span className="flex items-center gap-1 text-sm text-gray-500 text-center">
          <GoLocation className="text-[#b1b845]" />{location}
        </span>}
        {email || mobile && 
          <div className="flex flex-col mt-4 lg:mt-6">
          {email && 
            <span className="text-sm text-gray-500 text-center">
              {email}
            </span>
          }
          {mobile && 
            <span className="text-sm text-gray-500 text-center">
              {mobile}
            </span>
          }
          </div>
        }
      </div>
    </div>
  )
}

ProfileCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  locations: PropTypes.string,
  email: PropTypes.string,
  mobile: PropTypes.string,
  stylecss: PropTypes.string,
}

ProfileCard.defaultProps = {
  image: Thumbnail,
  location: '',
  email: '',
  mobile: '',
  stylecss: 'lg:w-[calc(33%-1rem)] w-[100%] sm:w-[calc(50%-0.5rem)]',
}

export default ProfileCard
