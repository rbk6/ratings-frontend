import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import slatelistLogo from '../assets/slatelist-logo.png'
import slatelistTypeDark from '../assets/slatelist-type-dark.png'
import '../styles/nav.css'

const NavBar = ({ links, logoutMsg }) => {
  const navigate = useNavigate()
  const handleLogout = () => {
    sessionStorage.removeItem('rate')
    logoutMsg('You have been logged out.')
    navigate('/login')
  }

  return (
    <>
      <nav className="navbar">
        <ul>
          <li className="navbar-left">
            <img
              src={slatelistLogo}
              style={{
                width: '50px',
                paddingLeft: '24px',
              }}
            />
            <img
              src={slatelistTypeDark}
              style={{
                filter: 'drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.50))',
                width: '150px',
                paddingLeft: '12px',
              }}
            />
          </li>
          <li className="navbar-center">
            {links.map((link) => (
              <NavLink to={link.to} key={link.to}>
                {link.label}
              </NavLink>
            ))}
          </li>
          <li className="navbar-right">
            <button className="logout-btn" onClick={handleLogout}>
              Log out
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}

NavBar.propTypes = {
  links: PropTypes.array,
  logoutMsg: PropTypes.func,
}

export default NavBar
