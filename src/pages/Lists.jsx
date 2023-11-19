import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import ListItems from '../components/ListItems/ListItems'
import ListCard from '../components/ListCard/ListCard'
import Loading from '../components/Loading'

const Lists = ({ logoutMsg, isMobile }) => {
  const apiUrl = import.meta.env.VITE_API_URL
  const [lists, setLists] = useState({ data: [] })
  const [loading, setLoading] = useState(true)
  const { list_name } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    const handleLogout = () => {
      localStorage.clear()
      logoutMsg('Your session has expired, you have been logged out.')
      navigate('/login')
    }

    const getLists = async () => {
      try {
        const token = localStorage.getItem('rate')
        const decoded = jwtDecode(token)
        const headers = { Authorization: `Bearer ${token}` }
        const res = await axios.get(`${apiUrl}/listItems/${decoded.id}`, {
          headers,
        })
        if (res.data.accessToken) {
          localStorage.setItem('rate', res.data.accessToken)
          const updatedRes = await axios.get(
            `${apiUrl}/ratings/${decoded.id}`,
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
            }
          )
          setLoading(false)
          setLists(updatedRes.data.data)
        } else {
          setLoading(false)
          setLists(res.data.data)
        }
      } catch (err) {
        if (err.message.includes('403')) handleLogout()
        else if (err.message.includes('404')) setLoading(false)
        else console.log('Error fetching lists')
      }
    }

    getLists()
  }, [apiUrl, logoutMsg, navigate])

  const handleListClick = (list) => navigate(`/lists/${list}`)

  return (
    <>
      {loading ? (
        <Loading />
      ) : list_name ? (
        <ListItems listName={list_name} logoutMsg={logoutMsg} />
      ) : lists.length > 0 ? (
        <>
          <ListCard
            lists={lists}
            setLists={setLists}
            isMobile={isMobile}
            handleListClick={handleListClick}
          />
        </>
      ) : (
        <div
          style={{
            height: '70vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h2>
            No lists yet? <a href="/search">Get started!</a>
          </h2>
        </div>
      )}
    </>
  )
}

Lists.propTypes = {
  logoutMsg: PropTypes.func,
  isMobile: PropTypes.bool,
}

export default Lists
