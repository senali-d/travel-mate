import PropTypes from 'prop-types'
import ScaleLoader from 'react-spinners/ScaleLoader'

const Loader = ({ loading, color }) => {
  return <ScaleLoader color={color} loading={loading} height={35} width={4} radius={2} margin={2} />
}

export default Loader

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
  color: PropTypes.string,
};

Loader.defaultProps = {
  loading: false,
  color: '#b1b845',
};