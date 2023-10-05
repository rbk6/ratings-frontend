import PropTypes from 'prop-types'
import Media from '../components/Media'

const Shows = ({ logoutMsg }) => {
  return <Media type="shows" logoutMsg={logoutMsg} />
}

Shows.propTypes = {
  logoutMsg: PropTypes.func,
}

export default Shows
