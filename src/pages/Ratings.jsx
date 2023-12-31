import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import Loading from '../components/Loading'
import Rating from '../components/Rating/Rating'

const Ratings = ({ logoutMsg, isMobile }) => {
  const apiUrl = import.meta.env.VITE_API_URL
  const [ratings, setRatings] = useState({ data: [] })
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const handleLogout = () => {
      localStorage.clear()
      logoutMsg('Your session has expired, you have been logged out.')
      navigate('/login')
    }

    const getRatings = async () => {
      try {
        const token = localStorage.getItem('rate')
        const decoded = jwtDecode(token)
        const headers = { Authorization: `Bearer ${token}` }
        const res = await axios.get(`${apiUrl}/ratings/${decoded.id}`, {
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
          setRatings(updatedRes.data.data)
        } else {
          setLoading(false)
          setRatings(res.data.data)
        }
      } catch (err) {
        if (err.message.includes('403')) handleLogout()
        else if (err.message.includes('404')) setLoading(false)
        else console.log('Error fetching ratings')
      }
    }

    getRatings()
  }, [apiUrl, logoutMsg, navigate])

  return (
    <>
      {loading ? (
        <Loading />
      ) : ratings.length > 0 ? (
        <Rating ratings={ratings} setRatings={setRatings} isMobile={isMobile} />
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
            No ratings yet? <a href="/search">Get started!</a>
          </h2>
        </div>
      )}
    </>
  )
}

Ratings.propTypes = {
  logoutMsg: PropTypes.func,
  isMobile: PropTypes.bool,
}

export default Ratings
