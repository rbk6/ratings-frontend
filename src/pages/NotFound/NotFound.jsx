import { NavLink } from 'react-router-dom'
import style from './NotFound.module.css'

const NotFound = () => {
  return (
    <div className={`${style['not-found']}`}>
      <h1>404</h1>
      <h3>page wasn&apos;t found...</h3>
      <NavLink className={style.link} to="/">
        return home
      </NavLink>
    </div>
  )
}

export default NotFound
