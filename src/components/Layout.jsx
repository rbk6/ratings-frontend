import PropTypes from 'prop-types'
import Navbar from './NavBar'
import { Outlet } from 'react-router-dom'

function Layout({ logoutMsg }) {
  const navLinks = [
    { to: '/', label: 'Movies', icon: 'LocalMovies' },
    { to: '/shows', label: 'Shows', icon: 'Tv' },
    { to: '/profile', label: 'Profile', icon: 'Person' },
  ]
  return (
    <div>
      <Navbar links={navLinks} logoutMsg={logoutMsg} />
      <div style={{ marginTop: '100px' }}>
        <Outlet />
      </div>
    </div>
  )
}

Layout.propTypes = {
  logoutMsg: PropTypes.func,
}

export default Layout
