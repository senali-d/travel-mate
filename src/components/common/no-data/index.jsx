import PropTypes from 'prop-types'
import { FaBoxOpen } from 'react-icons/fa'

const NoData = ({ message, icon }) => {
  return (
    <div className="flex flex-col items-center text-[#b1b845]">
      {icon && <FaBoxOpen size={50} />}
      <div>{message}</div>
    </div>
  )
}

export default NoData

NoData.propTypes = {
  message: PropTypes.string,
  icon: PropTypes.bool,
};

NoData.defaultProps = {
  message: 'Not Found',
  icon: true,
};