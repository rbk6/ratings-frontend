import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/NavBar/NavBar'

function Layout({ logoutMsg, isMobile }) {
  useEffect(() => window.scrollTo(0, 0), [])
  return (
    <div style={{ width: '100%' }}>
      <Navbar logoutMsg={logoutMsg} isMobile={isMobile} />
      <div style={{ marginTop: '70px' }}>
        <Outlet />
      </div>
    </div>
  )
}

Layout.propTypes = {
  logoutMsg: PropTypes.func,
  isMobile: PropTypes.bool,
}

export default Layout
