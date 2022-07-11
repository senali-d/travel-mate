import PropTypes from 'prop-types'

const FlatCard = ({ image, title, subtitle }) => {
  return (
    <div className="flex items-center space-x-4 py-3 sm:py-2">
      <div className="flex-shrink-0">
        <img
          className="w-12 h-12 rounded-full"
          src={image}
          alt={title}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {title}
        </p>
        <p className="text-sm text-gray-500 truncate">
          {subtitle}
        </p>
      </div>
    </div>
  )
}

export default FlatCard

FlatCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
}

FlatCard.defaultProps = {
  subtitle: '',
}
