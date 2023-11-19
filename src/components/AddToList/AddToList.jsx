import PropTypes from 'prop-types'
import style from './AddToList.module.css'

const AddToList = ({ preview, lists, isOpen, onClose }) => {
  return (
    <div className={style.popup} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className={style['list-label']}>
        <div className={style['create-list']}>
          <input placeholder="Create New List" type="text" />
          <label>
            <input className={style.check} type="checkbox" />
          </label>
        </div>
        <hr />
        <div className={style.lists}>
          {lists.map((list, index) => (
            <label htmlFor={list.list_name} key={index}>
              {list.list_name}
              <input
                id={list.list_name}
                className={style.check}
                type="checkbox"
              />
            </label>
          ))}
        </div>
      </div>
      <hr />

      <button>Update Lists</button>
    </div>
  )
}

AddToList.propTypes = {
  preview: PropTypes.object,
  lists: PropTypes.array,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
}

export default AddToList
