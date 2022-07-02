import PropTypes from 'prop-types'
import { AiFillStar } from 'react-icons/ai'

const ImageCard = ({ image, title, description, stars, onClick }) => {
  return (
    <div className="lg:w-[calc(33%-1rem)] sm:w-[calc(50%-0.5rem)]" onClick={onClick}>
      <div className="bg-white rounded-lg border border-gray-200 shadow-md">
        <img
          className="rounded-t-lg"
          src={image}
          alt={title}
        />
        <div className="p-5">
          <div className="flex">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 flex-1">
              {title}
            </h5>
            {stars && <div className="flex items-center"><AiFillStar />{stars.toFixed(2)}</div>}
          </div>
          <p className="mb-3 font-normal text-gray-700">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ImageCard

ImageCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  stars: PropTypes.number,
  onClick: PropTypes.func,
}

ImageCard.defaultProps = {
  stars: 0,
}
