import PropTypes from 'prop-types'
import Navbar from '../components/NavBar/NavBar'
import { Outlet } from 'react-router-dom'

function Layout({ logoutMsg }) {
  return (
    <div style={{ width: '100%' }}>
      <Navbar logoutMsg={logoutMsg} />
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
