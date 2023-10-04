import PropTypes from 'prop-types'
import { useState } from 'react'
import { Close } from '@mui/icons-material'

const RatingModal = ({ preview, setRatingIsOpen }) => {
  const [form, setForm] = useState({
    title: preview.original_title || preview.name,
    rating: '5',
    content: '',
  })

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
    console.log(form)
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
                value={form.title}
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
              <label htmlFor="rating">Rating: {`${form.rating}`}</label>
              <input
                onChange={onFieldUpdate}
                type="range"
                max="5.0"
                min="0.0"
                step="0.1"
                id="rating"
                name="rating"
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
                style={{ resize: 'none' }}
              />
            </div>
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
}

export default RatingModal
