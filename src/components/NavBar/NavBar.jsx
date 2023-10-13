import { useState } from 'react'
import PropTypes from 'prop-types'
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
} from '@mui/icons-material'
import slatelistLogo from '../../assets/slatelist-type-dark.png'
import style from './NavBar.module.css'

const NavBar = ({ logoutMsg }) => {
  const navigate = useNavigate()
  const [isMenuToggled, setIsMenuToggled] = useState(true)

  const handleLogout = () => {
    sessionStorage.removeItem('rate')
    logoutMsg('You have been logged out.')
    navigate('/login')
  }

  const toggleMenu = () => {
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
              className={isMenuToggled ? `${style.open}` : ''}
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
            <button onClick={handleLogout}>
              <AccountCircle className={style.profile} />
            </button>
          </li>
        </ul>
      </nav>
      <div
        className={`${style['start-menu']} ${isMenuToggled ? style.open : ''}`}
      >
        <ul>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${style.navlink} ${style.current}` : style.navlink
              }
              onClick={toggleMenu}
              to="/search"
            >
              <Search className={style.icon} />
              Search
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${style.navlink} ${style.current}` : style.navlink
              }
              onClick={toggleMenu}
              to="/shows"
            >
              <LiveTv className={style.icon} />
              Shows
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${style.navlink} ${style.current}` : style.navlink
              }
              onClick={toggleMenu}
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
              onClick={toggleMenu}
              to="/lists"
            >
              <List className={style.icon} />
              Lists
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${style.navlink} ${style.current}` : style.navlink
              }
              onClick={toggleMenu}
              to="/ratings"
            >
              <Star className={style.icon} />
              Ratings
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${style.navlink} ${style.current}` : style.navlink
              }
              onClick={toggleMenu}
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
    </>
  )
}

NavBar.propTypes = {
  logoutMsg: PropTypes.func,
}

export default NavBar
