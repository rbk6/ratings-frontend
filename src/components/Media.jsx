import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Preview from '../components/Preview'
import Loading from '../components/Loading'

const Media = ({ logoutMsg, type }) => {
  const apiUrl = import.meta.env.VITE_API_URL
  const [page, setPage] = useState(1)
  const [mediaPreviews, setMediaPreviews] = useState({ data: [] })
  const navigate = useNavigate()

  useEffect(() => {
    const handleLogout = () => {
      sessionStorage.removeItem('rate')
      logoutMsg('Your session has expired, you have been logged out.')
      navigate('/login')
    }

    const getMediaPreviews = async () => {
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
          setMediaPreviews(updatedRes.data.data)
        } else {
          setMediaPreviews(res.data.data)
        }
      } catch (err) {
        if (err.message.includes('403')) handleLogout()
        else console.log(`Error fetching ${type}`)
      }
    }

    getMediaPreviews()
  }, [apiUrl, logoutMsg, navigate, page, type])

  return (
    <>
      {mediaPreviews.length > 0 ? (
        <Preview previews={mediaPreviews} type={type} />
      ) : (
        <Loading />
      )}
    </>
  )
}

Media.propTypes = {
  logoutMsg: PropTypes.func,
  type: PropTypes.string,
}

export default Media
