import PropTypes from 'prop-types'

const Profile = ({ logoutMsg, isMobile }) => {
  return (
    <>
      <div>Welcome to your profile!</div>
    </>
  )
}

Profile.propTypes = {
  logoutMsg: PropTypes.func,
  isMobile: PropTypes.bool,
}

export default Profile
