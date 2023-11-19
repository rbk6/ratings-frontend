import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import Loading from '../Loading'
import style from './ListItems.module.css'

const ListItems = ({ listName, logoutMsg }) => {
  const apiUrl = import.meta.env.VITE_API_URL
  const [listItems, setListItems] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const handleLogout = () => {
      localStorage.clear()
      logoutMsg('Your session has expired, you have been logged out.')
      navigate('/login')
    }

    const getListItems = async () => {
      const token = localStorage.getItem('rate')
      const decoded = jwtDecode(token)
      if (decoded.exp < Date.now() / 1000) handleLogout()
      try {
        const headers = { Authorization: `Bearer ${token}` }
        const res = await axios.get(
          `${apiUrl}/listItems/${decoded.id}/${listName}`,
          { headers }
        )
        if (res.data.accessToken) {
          localStorage.setItem('rate', res.data.accessToken)
          const updatedRes = await axios.get(
            `${apiUrl}/listItems/${decoded.id}/${listName}`,
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
            }
          )
          setLoading(false)
          setListItems(updatedRes.data.data)
        } else {
          setLoading(false)
          setListItems(res.data.data)
        }
      } catch (err) {
        if (err.message.includes('403')) handleLogout()
        else console.log(`Error fetching items from ${listName} list`)
      }
    }

    getListItems()
  }, [apiUrl, listName, logoutMsg, navigate])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={`${style['list-item-container']}`}>
          <h1>{listItems[0].list_name}</h1>
          <div className={style.wrapper}>
            <ul className={style.list}>
              {listItems.map((item, index) => (
                <li key={index}>
                  <img src={item.image} />
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

ListItems.propTypes = {
  listName: PropTypes.string,
  logoutMsg: PropTypes.string,
}

export default ListItems
