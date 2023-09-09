import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const Home = ({ logoutMsg }) => {
  const navigate = useNavigate()
  const handleLogout = () => {
    sessionStorage.removeItem('rate')
    logoutMsg('You have been logged out.')
    navigate('/login')
  }
  return (
    <>
      <div>Welcome home!</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}

Home.propTypes = {
  logoutMsg: PropTypes.func,
}

export default Home
