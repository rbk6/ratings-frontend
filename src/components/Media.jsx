import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import Preview from '../components/Preview/Preview'
import Loading from '../components/Loading'

const Media = ({ logoutMsg, type, isMobile }) => {
  const apiUrl = import.meta.env.VITE_API_URL
  const [page, setPage] = useState(type === 'movies' ? 1 : 0)
  const [mediaPreviews, setMediaPreviews] = useState({ data: [] })
  const [lists, setLists] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const handleLogout = () => {
      localStorage.clear()
      logoutMsg('Your session has expired, you have been logged out.')
      navigate('/login')
    }

    const getMediaPreviews = async () => {
      const token = localStorage.getItem('rate')
      const decoded = jwtDecode(token)
      if (decoded.exp < Date.now() / 1000) handleLogout()
      const storageKey = `current-${type}`
      if (localStorage.getItem(storageKey)) {
        setMediaPreviews(JSON.parse(localStorage.getItem(storageKey)))
      } else {
        try {
          const headers = { Authorization: `Bearer ${token}` }
          const res = await axios.get(`${apiUrl}/${type}/${page}`, { headers })
          if (res.data.accessToken) {
            localStorage.setItem('rate', res.data.accessToken)
            const updatedRes = await axios.get(`${apiUrl}/${type}/${page}`, {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
            })
            localStorage.setItem(
              storageKey,
              JSON.stringify(updatedRes.data.data)
            )
            setMediaPreviews(updatedRes.data.data)
          } else {
            localStorage.setItem(storageKey, JSON.stringify(res.data.data))
            setMediaPreviews(res.data.data)
          }
        } catch (err) {
          if (err.message.includes('403')) handleLogout()
          else console.log(`Error fetching ${type}`)
        }
      }
    }

    const getListItems = async () => {
      const token = localStorage.getItem('rate')
      const decoded = jwtDecode(token)
      if (decoded.exp < Date.now() / 1000) handleLogout()
      try {
        const headers = { Authorization: `Bearer ${token}` }
        const res = await axios.get(`${apiUrl}/listItems/${decoded.id}`, {
          headers,
        })
        if (res.data.accessToken) {
          localStorage.setItem('rate', res.data.accessToken)
          const updatedRes = await axios.get(
            `${apiUrl}/listItems/${decoded.id}`,
            {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
            }
          )
          const listNames = updatedRes.data.data.map(({ list_name }) => ({
            list_name: list_name,
          }))
          setLists(listNames)
        } else {
          const listNames = res.data.data.map(({ list_name }) => ({
            list_name: list_name,
          }))
          setLists(listNames)
        }
      } catch (err) {
        if (err.message.includes('403')) handleLogout()
        else console.log('Error fetching lists')
      }
    }

    getMediaPreviews()
    getListItems()
  }, [apiUrl, logoutMsg, navigate, page, type])

  return (
    <>
      {mediaPreviews.length > 0 ? (
        <Preview
          previews={mediaPreviews}
          lists={lists}
          type={type}
          isMobile={isMobile}
        />
      ) : (
        <Loading />
      )}
    </>
  )
}

Media.propTypes = {
  logoutMsg: PropTypes.func,
  type: PropTypes.string,
  isMobile: PropTypes.bool,
}

export default Media
