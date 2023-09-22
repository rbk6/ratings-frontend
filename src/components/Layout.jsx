import PropTypes from 'prop-types'
import Navbar from './NavBar'
import { Outlet } from 'react-router-dom'

function Layout({ logoutMsg }) {
  const navLinks = [
    { to: '/', label: 'Movies' },
    { to: '/shows', label: 'Shows' },
    { to: '/profile', label: 'Profile' },
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
