import PropTypes from 'prop-types'
import { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { Menu, Close, LocalMovies, Tv, Person } from '@mui/icons-material'
import slatelistLogo from '../assets/slatelist-logo.png'
import slatelistTypeDark from '../assets/slatelist-type-dark.png'
import '../styles/nav.css'

const NavBar = ({ links, logoutMsg }) => {
  const navigate = useNavigate()
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [isMenuToggled, setIsMenuToggled] = useState(false)

  const handleLogout = () => {
    sessionStorage.removeItem('rate')
    logoutMsg('You have been logged out.')
    navigate('/login')
  }

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768)
  }

  const handleLinkClick = () => {
    if (isMobile && isMenuToggled) toggleMenu()
  }

  const toggleMenu = () => {
    setIsMenuToggled(!isMenuToggled)
  }

  window.addEventListener('resize', handleResize)

  return (
    <>
      <nav className="navbar">
        <ul
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <li className="navbar-left">
            <a
              href="https://www.github.com/rbk6"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                src={slatelistLogo}
                style={{
                  width: '40px',
                  marginLeft: '12px',
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
          {isMobile ? null : (
            <li className="navbar-center">
              {links.map((link) => (
                <NavLink className="link" to={link.to} key={link.to}>
                  {link.icon === 'LocalMovies' && (
                    <LocalMovies className="icon" />
                  )}
                  {link.icon === 'Tv' && <Tv className="icon" />}
                  {link.icon === 'Person' && <Person className="icon" />}
                  {link.label}
                </NavLink>
              ))}
            </li>
          )}
          <li className="navbar-right">
            {isMobile && (
              <button className="hamburger" onClick={toggleMenu}>
                {isMenuToggled ? <Close /> : <Menu />}
              </button>
            )}
            {!isMobile && (
              <button className="logout-btn" onClick={handleLogout}>
                Log out
              </button>
            )}
          </li>
        </ul>
      </nav>
      {isMobile && isMenuToggled ? (
        <div className="navbar navbar-mobile">
          <ul className="navbar-content-wrapper">
            <li className="navbar-content">
              {links.map((link) => (
                <NavLink
                  className="mobile-link"
                  to={link.to}
                  key={link.to}
                  onClick={handleLinkClick}
                >
                  {link.icon === 'LocalMovies' && (
                    <LocalMovies className="icon" />
                  )}
                  {link.icon === 'Tv' && <Tv className="icon" />}
                  {link.icon === 'Person' && <Person className="icon" />}
                  {link.label}
                </NavLink>
              ))}
              <button className="logout-btn" onClick={handleLogout}>
                Log out
              </button>
            </li>
          </ul>
        </div>
      ) : null}
    </>
  )
}

NavBar.propTypes = {
  links: PropTypes.array,
  logoutMsg: PropTypes.func,
}

export default NavBar
