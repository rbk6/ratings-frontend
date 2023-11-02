import PropTypes from 'prop-types'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { useState } from 'react'
import { Delete, Edit } from '@mui/icons-material'
import CreateModal from '../CreateModal/CreateModal'
import ConfirmModal from '../ConfirmModal/ConfirmModal'
import RatingBar from '../RatingBar/RatingBar'
import style from './Rating.module.css'

const Rating = ({ ratings, setRatings, isMobile }) => {
  const apiUrl = import.meta.env.VITE_API_URL
  const [isEditOpen, setIsEditOpen] = useState(false)
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

  const editRating = async (e, form) => {
    e.preventDefault()
    const token = localStorage.getItem('rate')
    const decoded = jwtDecode(token)
    try {
      const res = await axios.patch(
        `${apiUrl}/ratings/${decoded.id}/${rating.content_id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('rate')}`,
          },
        }
      )
      console.log(res)
      if (res.status === 200) {
        const updatedRatings = ratings.map((rate) =>
          rate.content_id === rating.content_id
            ? {
                ...rate,
                ...form,
                updated_at: res.data.updated_at,
              }
            : rate
        )
        setRatings(updatedRatings)
        handleCancel()
        console.log('edit successful')
      }
    } catch (err) {
      console.error('Error editing rating: ', err)
    }
  }

  const deleteRating = async () => {
    const token = localStorage.getItem('rate')
    const decoded = jwtDecode(token)
    try {
      await axios.delete(
        `${apiUrl}/ratings/${decoded.id}/${rating.content_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('rate')}`,
          },
        }
      )
      setRatings((prevRatings) =>
        prevRatings.filter((rate) => rate.content_id !== rating.content_id)
      )
      handleCancel()
      console.log('deletion successful')
    } catch (err) {
      console.log(err)
    }
  }

  const handleCancel = () => {
    setIsDeleteOpen(false)
    setIsEditOpen(false)
    setDeleteMsg('')
  }

  const setEdit = (rating) => {
    setIsEditOpen(true)
    const user_rating = Number.isInteger(rating.user_rating)
      ? rating.user_rating
      : Math.round(rating.user_rating)
    setRating({
      ...rating,
      user_rating: user_rating,
    })
  }

  const setConfirmDeletion = (rating) => {
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
      {isEditOpen ? (
        <CreateModal
          title={'Edit Rating'}
          rating={rating}
          edit={editRating}
          setRatingIsOpen={handleCancel}
        />
      ) : null}
      <div className={style.wrapper}>
        {ratings.map((rating) => {
          return (
            <div
              className={style.rating}
              key={rating.content_id}
              id={rating.content_id}
            >
              <div className={`${style['btn-group']}`}>
                <button
                  title={`Edit ${rating.title} Rating`}
                  className={style.edit}
                  onClick={() => setEdit(rating)}
                >
                  <Edit />
                </button>
                <button
                  title={`Delete ${rating.title} Rating`}
                  className={style.delete}
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
                <div className={rating.content.length > 0 ? style.content : ''}>
                  <h4>{rating.content.length > 0 ? 'Description:' : ''}</h4>
                  <pre>{rating.content}</pre>
                </div>
              </div>
              <div className={style.info}>
                <h3 title={rating.title}>{rating.title}</h3>
                <span>
                  {rating.updated_at
                    ? `Last edited ${formatDate(rating.updated_at)}`
                    : formatDate(rating.created_at)}
                </span>
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
