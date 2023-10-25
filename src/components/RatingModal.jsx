import PropTypes from 'prop-types'
import axios from 'axios'
import { useState } from 'react'
import { Close } from '@mui/icons-material'

const RatingModal = ({ preview, setRatingIsOpen, type }) => {
  const apiUrl = import.meta.env.VITE_API_URL
  const [form, setForm] = useState({
    title: preview.title,
    user_rating: '5',
    content: '',
    image: '',
    movie_id: null,
    show_id: null,
  })

  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const closeRating = () => {
    setForm({ title: '', content: '' })
    setRatingIsOpen(false)
  }

  const onFieldUpdate = (e) => {
    const { name, value } = e.target
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let updatedForm = { ...form, image: preview.image }
    if (type === 'movie') updatedForm = { ...updatedForm, movie_id: preview.id }
    else updatedForm = { ...updatedForm, show_id: preview.id }
    setForm(updatedForm)
    try {
      const res = await axios.post(`${apiUrl}/ratings`, updatedForm, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('rate')}`,
        },
      })

      if (res.data.accessToken) {
        const updatedToken = res.data.accessToken
        localStorage.setItem('rate', updatedToken)
        await axios.post(`${apiUrl}/ratings`, updatedForm, {
          headers: {
            Authorization: `Bearer ${updatedToken}`,
          },
        })
      }
      if (res.status === 201) {
        setErrorMsg('')
        setSuccessMsg('Rating created.')
      }
    } catch (err) {
      if (!err) setErrorMsg('There was an error creating this rating')
      else setErrorMsg(err.response.data.msg || err.response.data || err)
    }
  }

  return (
    <>
      <div className="modal-wrapper">
        <div className="overlay"></div>
        <div className="rating-box">
          <h1>Create Rating</h1>
          <button className="close" onClick={closeRating}>
            <Close className="close-icon" />
          </button>
          <form className="rating-form" onSubmit={handleSubmit}>
            <div className="form-field title">
              <label htmlFor="title">Title:</label>
              <input
                value={preview.title}
                onChange={onFieldUpdate}
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                readOnly
                autoComplete="on"
              />
            </div>
            <div className="form-field rating">
              <label htmlFor="rating">Rating: {`${form.user_rating}`}</label>
              <input
                onChange={onFieldUpdate}
                type="range"
                max="5.0"
                min="0.0"
                step="0.1"
                id="rating"
                name="user_rating"
                placeholder="0-5"
                required
                autoComplete="on"
              />
            </div>
            <div className="form-field desc">
              <label htmlFor="content">Description:</label>
              <textarea
                onChange={onFieldUpdate}
                type="text"
                id="content"
                name="content"
                placeholder="Share your thoughts..."
                autoComplete="on"
                maxLength="500"
                style={{ resize: 'none' }}
              />
            </div>
            {successMsg && !errorMsg ? (
              <p style={{ color: '#2ff46a' }}>{successMsg}</p>
            ) : errorMsg ? (
              <p style={{ color: 'red' }}>{`${errorMsg}`}</p>
            ) : null}
            <button
              className="rating-btn"
              type="submit"
              onSubmit={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

RatingModal.propTypes = {
  preview: PropTypes.object,
  setRatingIsOpen: PropTypes.func,
  type: PropTypes.string,
}

export default RatingModal
