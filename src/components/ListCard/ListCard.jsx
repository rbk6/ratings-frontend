import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import style from './ListCard.module.css'

const ListItem = ({ lists, setLists, isMobile, handleListClick }) => {
  return (
    <div className={`${style['list-container']}`}>
      <div className={style.wrapper}>
        {lists.map((list, index) => {
          const numberOfImages = list.list_items.length
          return (
            <div className={style.list} key={index} id={list.list_name}>
              <NavLink
                className={`${style['img-container']} ${
                  numberOfImages === 1 ? style['single-image'] : ''
                }`}
                title={`Open ${list.list_name}`}
                onClick={() => handleListClick(list.list_name)}
                to={`/lists/${list.list_name}`}
              >
                {list.list_items.slice(0, 3).map((item, index) => (
                  <img src={item.image} key={index} />
                ))}
              </NavLink>
              <h3>{list.list_name}</h3>
            </div>
          )
        })}
      </div>
    </div>
  )
}

ListItem.propTypes = {
  lists: PropTypes.array,
  setLists: PropTypes.func,
  isMobile: PropTypes.bool,
  handleListClick: PropTypes.func,
}

export default ListItem
