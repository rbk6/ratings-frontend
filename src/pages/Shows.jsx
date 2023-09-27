import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Preview from '../components/Preview'

const Shows = ({ logoutMsg }) => {
  const apiUrl = import.meta.env.VITE_API_URL
  let page = 0
  const [showPreviews, setShowPreviews] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const handleLogout = () => {
      sessionStorage.removeItem('rate')
      logoutMsg('Your session has expired, you have been logged out.')
      navigate('/login')
    }

    const getShowPreviews = async () => {
      try {
        const res = await axios.get(`${apiUrl}/shows/${page}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('rate')}`,
          },
        })
        if (res.data.accessToken) {
          const updatedToken = res.data.accessToken
          sessionStorage.setItem('rate', updatedToken)
          const updatedRes = await axios.get(`${apiUrl}/shows/${page}`, {
            headers: {
              Authorization: `Bearer ${updatedToken}`,
            },
          })
          setShowPreviews(updatedRes.data.data)
        } else {
          setShowPreviews(res.data.data)
        }
      } catch (err) {
        if (err.message.includes('403')) handleLogout()
        else console.log('Error fetching shows: ', err)
      }
    }

    getShowPreviews()
  }, [apiUrl, logoutMsg, navigate, page])

  return (
    <>
      {showPreviews ? (
        <Preview previews={showPreviews} type="show" />
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

Shows.propTypes = {
  logoutMsg: PropTypes.func,
}

export default Shows
