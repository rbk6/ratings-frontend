import PropTypes from 'prop-types'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { useState } from 'react'
import { Delete } from '@mui/icons-material'
import ConfirmModal from '../ConfirmModal/ConfirmModal'
import RatingBar from '../RatingBar/RatingBar'
import style from './Rating.module.css'

const Rating = ({ ratings, setRatings, isMobile }) => {
  const apiUrl = import.meta.env.VITE_API_URL
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [deleteMsg, setDeleteMsg] = useState(false)
  const [rating, setRating] = useState(null)

  const formatDate = (date) => {
    const formattedDate = new Date(
      new Date(date) - new Date().getTimezoneOffset() * 60 * 1000
    ).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })

    const [monthDay, year, time] = formattedDate.split(', ')
    return `${monthDay}, ${year} at ${time}`
  }

  const deleteRating = async () => {
    const token = localStorage.getItem('rate')
    const decoded = jwtDecode(token)
    try {
      await axios.delete(
        `${apiUrl}/ratings/${decoded.id}/${rating.rating_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('rate')}`,
          },
        }
      )
      setRatings((prevRatings) =>
        prevRatings.filter((rate) => rate.rating_id !== rating.rating_id)
      )
      handleCancel()
      console.log('deletion successful')
    } catch (err) {
      console.log(err)
    }
  }

  const handleCancel = () => {
    setIsDeleteOpen(false)
    setDeleteMsg('')
  }

  const setConfirmDeletion = async (rating) => {
    setIsDeleteOpen(true)
    setRating(rating)
    setDeleteMsg(
      `Are you sure you want to delete your rating of ${rating.title}?`
    )
  }

  return (
    <div className={`${style['rating-container']}`}>
      {isDeleteOpen ? (
        <ConfirmModal
          title={'Delete Rating'}
          msg={deleteMsg}
          confirm={deleteRating}
          cancel={handleCancel}
        />
      ) : null}
      <div className={style.wrapper}>
        {ratings.map((rating) => {
          return (
            <div
              className={style.rating}
              key={rating.rating_id}
              id={rating.rating_id}
            >
              <div className={style.delete}>
                <button
                  title={`Delete ${rating.title} Rating`}
                  onClick={() => setConfirmDeletion(rating)}
                >
                  <Delete />
                </button>
              </div>
              <div
                className={style.image}
                style={{
                  backgroundImage: `url(${rating.image})`,
                }}
              >
                <p className={rating.content.length > 0 ? style.content : ''}>
                  {rating.content}
                </p>
              </div>
              <div className={style.info}>
                <h3 title={rating.title}>{rating.title}</h3>
                <span>{formatDate(rating.created_at)}</span>
                <RatingBar rating={parseFloat(rating.user_rating)} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

Rating.propTypes = {
  ratings: PropTypes.array,
  setRatings: PropTypes.func,
  isMobile: PropTypes.bool,
}

export default Rating
