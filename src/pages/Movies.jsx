import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Preview from '../components/Preview'
import Loading from '../components/Loading'

const Movies = ({ logoutMsg }) => {
  const apiUrl = import.meta.env.VITE_API_URL
  let page = 1
  const [moviePreviews, setMoviePreviews] = useState({ data: { results: [] } })

  const navigate = useNavigate()

  useEffect(() => {
    const handleLogout = () => {
      sessionStorage.removeItem('rate')
      logoutMsg('Your session has expired, you have been logged out.')
      navigate('/login')
    }

    const getMoviePreviews = async () => {
      try {
        const res = await axios.get(`${apiUrl}/movies/${page}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('rate')}`,
          },
        })

        if (res.data.accessToken) {
          console.log('updating token')
          const updatedToken = res.data.accessToken
          sessionStorage.setItem('rate', updatedToken)
          const updatedRes = await axios.get(`${apiUrl}/movies/${page}`, {
            headers: {
              Authorization: `Bearer ${updatedToken}`,
            },
          })
          setMoviePreviews(updatedRes.data)
        } else {
          setMoviePreviews(res.data)
        }
      } catch (err) {
        if (err.message.includes('403')) handleLogout()
        else console.log('Error fetching movies: ', err)
      }
    }

    getMoviePreviews()
  }, [apiUrl, logoutMsg, navigate, page])

  return (
    <>
      {moviePreviews.data.results.length > 0 ? (
        <Preview previews={moviePreviews.data.results} type={'movie'} />
      ) : (
        <Loading />
      )}
    </>
  )
}

Movies.propTypes = {
  logoutMsg: PropTypes.func,
}

export default Movies
