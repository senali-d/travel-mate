import PropTypes from 'prop-types'

import Button from '../button'

const FlatCard = ({ image, title, subtitle, onClick, stylecss, btnTitle, btnClick }) => {
  return (
    <div onClick={onClick} className={`flex bg-white items-center space-x-4 py-3 sm:py-2 ${onClick && 'hover:cursor-pointer'} rounded-lg px-5 ${stylecss}`}>
      <div className="flex-shrink-0">
        <img
          className="w-12 h-12 rounded-full"
          src={image}
          alt={title}
        />
      </div>
      <div className={`flex-1 min-w-0 ${btnTitle ? 'flex-row flex items-center justify-between' : 'flex-col' }`}>
        <p className="text-sm font-medium text-gray-900 truncate text-left">
          {title}
        </p>
        {subtitle && <p className="text-sm text-gray-500 truncate text-left">
          {subtitle}
        </p>}
        {btnTitle &&
          <Button
            title={btnTitle}
            size="sm"
            stylecss="align-self"
            onClick={btnClick}
          />
        }
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
  stylecss: PropTypes.string,
  btnTitle: PropTypes.string,
  btnClick: PropTypes.func,
}

FlatCard.defaultProps = {
  subtitle: '',
  stylecss: 'w-full',
  btnTitle: '',
}
