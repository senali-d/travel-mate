import PropTypes from 'prop-types'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Button = ({ title, loading, onClick, size, stylecss }) => {
  return (
    <button 
      className={`flex items-center text-white bg-[#b1b845] border-0 focus:outline-none hover:bg-[#b1b845] rounded ${size === 'md' ? 'text-lg py-2 px-6' : 'text-md py-2 px-3'} ${stylecss}`} 
      onClick={onClick}
    >
      {loading && <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-3" />}
      {title}
    </button>
  )
}

export default Button

Button.propTypes = {
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  size: PropTypes.string,
}

Button.defaultProps = {
  title: 'Submit',
  loading: false,
  size: 'md',
}