import PropTypes from 'prop-types'
import { useNavigate, NavLink } from 'react-router-dom'
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
            <a
              href="https://www.github.com/rbk6"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <img
                src={slatelistLogo}
                style={{
                  width: '40px',
                  paddingLeft: '24px',
                }}
              />
              <img
                src={slatelistTypeDark}
                style={{
                  filter: 'drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.50))',
                  width: '125px',
                  paddingLeft: '12px',
                }}
              />
            </a>
          </li>
          <li className="navbar-center">
            {links.map((link) => (
              <NavLink className="link" to={link.to} key={link.to}>
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
