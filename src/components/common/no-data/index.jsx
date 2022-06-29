import PropTypes from 'prop-types'
import { FaBoxOpen } from 'react-icons/fa'

const NoData = ({ message }) => {
  return (
    <div className="flex flex-col items-center text-[#b1b845]">
      <FaBoxOpen size={50} />
      <div>{message}</div>
    </div>
  )
}

export default NoData

NoData.propTypes = {
  message: PropTypes.string,
};

NoData.defaultProps = {
  message: 'Not Found',
};