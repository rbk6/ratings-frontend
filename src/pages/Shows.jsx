import PropTypes from 'prop-types'
import Media from '../components/Media'

const Shows = ({ logoutMsg, isMobile }) => {
  return <Media type="shows" logoutMsg={logoutMsg} isMobile={isMobile} />
}

Shows.propTypes = {
  logoutMsg: PropTypes.func,
  isMobile: PropTypes.bool,
}

export default Shows
