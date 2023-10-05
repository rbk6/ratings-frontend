import PropTypes from 'prop-types'
import Media from '../components/Media'

const Movies = ({ logoutMsg }) => {
  return <Media type="movies" logoutMsg={logoutMsg} />
}

Movies.propTypes = {
  logoutMsg: PropTypes.func,
}

export default Movies
