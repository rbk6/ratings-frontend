import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import {
  Menu,
  AccountCircle,
  Movie,
  List,
  LiveTv,
  Search,
  Settings,
  Star,
  Close,
  Person,
  Logout,
} from '@mui/icons-material'
import slatelistLogo from '../../assets/slatelist-type-dark.png'
import style from './NavBar.module.css'

const NavBar = ({ logoutMsg, isMobile }) => {
  const navigate = useNavigate()
  const menuRef = useRef(null)
  const [isMenuToggled, setIsMenuToggled] = useState(isMobile ? false : true)
  const [isSettingsToggled, setIsSettingsToggled] = useState(false)

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        (isMenuToggled || isSettingsToggled) &&
        !menuRef.current.contains(e.target)
      ) {
        if (isMobile) setIsMenuToggled(false)
        setIsSettingsToggled(false)
      }
    }

    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [isMobile, isMenuToggled, isSettingsToggled])

  const handleLogout = () => {
    sessionStorage.clear()
    logoutMsg('You have been logged out.')
    navigate('/login')
  }

  const toggleSettings = (e) => {
    e.stopPropagation()
    if (isMobile && isMenuToggled) {
      setIsMenuToggled(!isMenuToggled)
    }
    setIsSettingsToggled(!isSettingsToggled)
  }

  const toggleMenu = (e) => {
    e.stopPropagation()
    if (isMobile && isSettingsToggled) {
      setIsSettingsToggled(!isSettingsToggled)
    }
    setIsMenuToggled(!isMenuToggled)
  }

  const date = new Date()
  const year = date.getFullYear()

  return (
    <>
      <nav className={style.navbar}>
        <ul>
          <li className={style.start}>
            <button
              className={isMenuToggled ? `${style['menu-open']}` : ''}
              onClick={toggleMenu}
            >
              {isMenuToggled ? <Close /> : <Menu />}
            </button>
            <img
              className={style.logo}
              src={slatelistLogo}
              alt="SlateList Logo"
            />
          </li>
          <li className={style.end}>
            <button onClick={toggleSettings}>
              <AccountCircle className={style.profile} />
            </button>
          </li>
        </ul>
      </nav>
      <div
        ref={menuRef}
        className={`${style['start-menu']} ${
          isMenuToggled ? `${style['menu-open']}` : ''
        }`}
      >
        <ul>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${style.navlink} ${style.current}` : style.navlink
              }
              to="/search"
            >
              <Search className={style.icon} />
              Search
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${style.navlink} ${style.current}` : style.navlink
              }
              to="/shows"
            >
              <LiveTv className={style.icon} />
              Shows
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${style.navlink} ${style.current}` : style.navlink
              }
              to="/"
            >
              <Movie className={style.icon} />
              Movies
            </NavLink>
          </li>
          <hr />
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${style.navlink} ${style.current}` : style.navlink
              }
              to="/lists"
            >
              <List className={style.icon} />
              Lists
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${style.navlink} ${style.current}` : style.navlink
              }
              to="/ratings"
            >
              <Star className={style.icon} />
              Ratings
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${style.navlink} ${style.current}` : style.navlink
              }
              to="/settings"
            >
              <Settings className={style.icon} />
              Settings
            </NavLink>
          </li>
        </ul>
        <div className={style.info}>
          <p>
            check out my{' '}
            <a
              href="https://github.com/rbk6"
              target="_blank"
              rel="noopener noreferrer"
            >
              github
            </a>
          </p>
          <hr />
          <p>created using api from:</p>
          <p>
            •{' '}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              tmdb
            </a>
          </p>
          <p>
            •{' '}
            <a
              href="https://www.tvmaze.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              tvmaze
            </a>
          </p>
          <hr />
          <p>
            &copy; rbk6 — <span>{year}</span>
          </p>
        </div>
      </div>
      <div
        ref={menuRef}
        className={`${style['end-menu']} ${
          isSettingsToggled ? `${style['settings-open']}` : ''
        }`}
      >
        <NavLink
          className={style.navlink}
          onClick={toggleSettings}
          to="/profile"
        >
          <Person className={style.icon} />
          Profile
        </NavLink>
        <NavLink
          className={style.navlink}
          onClick={toggleSettings}
          to="/settings"
        >
          <Settings className={style.icon} />
          Settings
        </NavLink>
        <NavLink className={style.navlink} onClick={handleLogout} to="/login">
          <Logout className={style.icon} />
          Logout
        </NavLink>
      </div>
      {isMobile && isMenuToggled ? <div className={style.overlay}></div> : null}
    </>
  )
}

NavBar.propTypes = {
  logoutMsg: PropTypes.func,
  isMobile: PropTypes.bool,
}

export default NavBar
