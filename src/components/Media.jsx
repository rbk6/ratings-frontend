import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Preview from '../components/Preview/Preview'
import Loading from '../components/Loading'

const Media = ({ logoutMsg, type, isMobile }) => {
  const apiUrl = import.meta.env.VITE_API_URL
  const [page, setPage] = useState(type === 'movies' ? 1 : 0)
  const [mediaPreviews, setMediaPreviews] = useState({ data: [] })
  const navigate = useNavigate()

  useEffect(() => {
    const handleLogout = () => {
      sessionStorage.clear()
      logoutMsg('Your session has expired, you have been logged out.')
      navigate('/login')
    }

    const getMediaPreviews = async () => {
      const storageKey = `current-${type}`
      if (sessionStorage.getItem(storageKey)) {
        setMediaPreviews(JSON.parse(sessionStorage.getItem(storageKey)))
      } else {
        try {
          const token = sessionStorage.getItem('rate')
          const headers = { Authorization: `Bearer ${token}` }
          const res = await axios.get(`${apiUrl}/${type}/${page}`, { headers })
          if (res.data.accessToken) {
            sessionStorage.setItem('rate', res.data.accessToken)
            const updatedRes = await axios.get(`${apiUrl}/${type}/${page}`, {
              headers: {
                Authorization: `Bearer ${res.data.accessToken}`,
              },
            })
            sessionStorage.setItem(
              storageKey,
              JSON.stringify(updatedRes.data.data)
            )
            setMediaPreviews(updatedRes.data.data)
          } else {
            sessionStorage.setItem(storageKey, JSON.stringify(res.data.data))
            setMediaPreviews(res.data.data)
          }
        } catch (err) {
          if (err.message.includes('403')) handleLogout()
          else console.log(`Error fetching ${type}`)
        }
      }
    }

    getMediaPreviews()
  }, [apiUrl, logoutMsg, navigate, page, type])

  return (
    <>
      {mediaPreviews.length > 0 ? (
        <Preview previews={mediaPreviews} type={type} isMobile={isMobile} />
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
