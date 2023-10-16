import PropTypes from 'prop-types'
import Media from '../components/Media'

const Movies = ({ logoutMsg, isMobile }) => {
  return <Media type="movies" logoutMsg={logoutMsg} isMobile={isMobile} />
}

Movies.propTypes = {
  logoutMsg: PropTypes.func,
  isMobile: PropTypes.bool,
}

export default Movies
