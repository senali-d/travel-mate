import PropTypes from 'prop-types'

const ProfileCard = ({ image, name, locations, email, mobile }) => {
  return (
    <div className="lg:w-[calc(33%-1rem)] w-[100%] sm:w-[calc(50%-0.5rem)] bg-white rounded-lg border border-gray-200 shadow-md pt-7">
      <div className="flex flex-col items-center pb-10">
        <img
          className="mb-3 w-24 h-24 rounded-full shadow-lg"
          src={image}
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900">
          {name}
        </h5>
        {locations && <span className="text-sm text-gray-500 text-center">
          {locations.map((location, index) => {
            return `${location}${index !== locations.length -1 ? ', ' : ''}`;
          })}
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
  locations: [],
}

export default ProfileCard
