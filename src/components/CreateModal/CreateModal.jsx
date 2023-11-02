import PropTypes from 'prop-types'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Close } from '@mui/icons-material'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import ConfirmModal from '../ConfirmModal/ConfirmModal'
import style from './CreateModal.module.css'

const CreateModal = ({
  title,
  preview,
  rating,
  edit,
  setRatingIsOpen,
  type,
}) => {
  const apiUrl = import.meta.env.VITE_API_URL
  const [form, setForm] = useState({
    title: !rating ? preview.title : rating.title,
    user_rating: !rating ? 5 : rating.user_rating,
    content: !rating ? '' : rating.content,
    image: !rating ? '' : rating.image,
    content_id: type ? `${type[0]}${preview.id}` : rating.content_id,
  })

  const modalRef = useRef(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [isOverwriteOpen, setIsOverwriteOpen] = useState(false)
  const [overwriteMsg, setOverwriteMsg] = useState(false)

  useEffect(() => {
    const overflow = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'
    return () => (document.body.style.overflow = overflow)
  }, [])

  const closeRating = useCallback(() => {
    setForm({ title: '', content: '' })
    setRatingIsOpen(false)
    setOverwriteMsg('')
  }, [setRatingIsOpen])

  const onFieldUpdate = (e) => {
    const { name, value } = e.target
    const trimEnd = name === 'content' ? value.trimEnd() : value
    setForm((prevForm) => ({
      ...prevForm,
      [name]: trimEnd,
    }))
  }

  const overwriteRating = async () => {
    const token = localStorage.getItem('rate')
    const decoded = jwtDecode(token)
    try {
      await axios.patch(
        `${apiUrl}/ratings/${decoded.id}/${form.content_id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('rate')}`,
          },
        }
      )
      handleCancel()
      setRatingIsOpen(false)
      console.log('overwrite successful')
    } catch (err) {
      console.log(err)
    }
  }

  const handleCancel = () => setIsOverwriteOpen(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.content.length > 500) {
      setErrorMsg('Description cannot exceed 500 characters.')
      return
    }
    if (overwriteMsg) {
      setIsOverwriteOpen(true)
      return
    }
    let updatedForm = { ...form, image: preview.image }
    if (type === 'movies')
      updatedForm = { ...updatedForm, content_id: 'm' + preview.id }
    else updatedForm = { ...updatedForm, content_id: 's' + preview.id }
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
        setRatingIsOpen(false)
      }
    } catch (err) {
      if (err.response && err.response.data.msg.includes('already have')) {
        setOverwriteMsg(
          `You already have a rating for ${form.title}, do you want to overwrite it?`
        )
        setIsOverwriteOpen(true)
      } else if (!err) setErrorMsg('There was an error creating this rating')
      else setErrorMsg(err.response.data.msg || err.response.data || err)
    }
  }

  return (
    <>
      <div className={`${style['modal-wrapper']}`}>
        {isOverwriteOpen ? (
          <ConfirmModal
            title={'Overwrite Rating'}
            msg={overwriteMsg}
            confirm={() => {
              setIsOverwriteOpen(false)
              overwriteRating()
            }}
            cancel={handleCancel}
          />
        ) : null}
        <div ref={modalRef} className={`${style['create-modal']}`}>
          <div className={style.close}>
            <button tabIndex={0} onClick={closeRating}>
              <Close />
            </button>
          </div>
          <h2>{title}</h2>
          <form
            className={`${style['create-form']}`}
            onSubmit={(e) => (!rating ? handleSubmit(e) : edit(e, form))}
          >
            <div>
              <label htmlFor="title">Title:</label>
              <input
                title={!rating ? preview.title : rating.title}
                value={!rating ? preview.title : rating.title}
                onChange={onFieldUpdate}
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                readOnly
                autoComplete="on"
              />
            </div>
            <div>
              <label htmlFor="rating">Rating: {`${form.user_rating}/5`}</label>
              <input
                title={`${((parseFloat(form.user_rating) / 5) * 100).toFixed(
                  0
                )}%`}
                className={style.slider}
                onChange={onFieldUpdate}
                defaultValue={!rating ? 5 : rating.user_rating}
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
            <div>
              <label htmlFor="content">Description:</label>
              <textarea
                onChange={onFieldUpdate}
                defaultValue={!rating ? '' : rating.content}
                type="text"
                id="content"
                name="content"
                placeholder="Share your thoughts..."
                autoComplete="on"
                style={{ resize: 'none' }}
              />
              <span style={form.content.length > 500 ? { color: 'red' } : {}}>
                {form.content.length}
                /500
              </span>
            </div>
            {errorMsg ? (
              <p
                style={{
                  color: 'red',
                  width: '75%',
                  alignSelf: 'center',
                }}
              >{`${errorMsg}`}</p>
            ) : null}
            <button type="submit">{!rating ? 'Create' : 'Edit'}</button>
          </form>
        </div>
      </div>
      <div className={style.overlay}></div>
    </>
  )
}

CreateModal.propTypes = {
  title: PropTypes.string,
  preview: PropTypes.object,
  rating: PropTypes.object,
  edit: PropTypes.func,
  setRatingIsOpen: PropTypes.func,
  type: PropTypes.string,
}

export default CreateModal
