import PropTypes from 'prop-types'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel as ResCarousel } from 'react-responsive-carousel'

const Carousel = ({ images, showThumbs, showIndicators }) => {
  return (
    <ResCarousel
      infiniteLoop
      autoPlay
      interval="3000"
      showThumbs={showThumbs}
      showIndicators={showIndicators}
      showArrows={false}
      showStatus={false}
      className="mt-[-7rem]"
    >
      {
        images && images.map((image, index) => (
          <div key={index} className="carousel">
              <img src={image} alt="Carousel" className="opacity-80" />
          </div>
        ))
      }
    </ResCarousel>
  )
}

export default Carousel

Carousel.propTypes = {
  images: PropTypes.array.isRequired,
  showThumbs: PropTypes.bool,
  showIndicators: PropTypes.bool,
};

Carousel.defaultProps = {
  showThumbs: false,
  showIndicators: false,
};