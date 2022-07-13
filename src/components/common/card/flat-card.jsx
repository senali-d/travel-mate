import PropTypes from 'prop-types'

const FlatCard = ({ image, title, subtitle, onClick }) => {
  return (
    <div onClick={onClick} className="flex items-center space-x-4 py-3 sm:py-2 hover:cursor-pointer">
      <div className="flex-shrink-0">
        <img
          className="w-12 h-12 rounded-full"
          src={image}
          alt={title}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate text-left">
          {title}
        </p>
        <p className="text-sm text-gray-500 truncate text-left">
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
  onClick: PropTypes.func,
}

FlatCard.defaultProps = {
  subtitle: '',
}
