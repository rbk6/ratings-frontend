import PropTypes from 'prop-types'
import { Close, Add, Star } from '@mui/icons-material'
import { useEffect } from 'react'
import style from './PreviewInfoModal.module.css'

const PreviewInfoModal = ({ preview, openRating, close }) => {
  useEffect(() => {
    const overflow = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'
    return () => (document.body.style.overflow = overflow)
  }, [])

  return (
    <>
      <div className={`${style['modal-wrapper']}`}>
        <div className={`${style['info-modal']}`}>
          <div className={`${style['info-btn']}`}>
            <button className={style.close} onClick={() => close(null)}>
              <Close className="close-icon" />
            </button>
          </div>
          <h3>{preview.title}</h3>
          {preview.status ? (
            preview.status === 'Ended' ? (
              <h4>{`${preview.releaseDate} - ${preview.endDate}`}</h4>
            ) : (
              <h4>{preview.releaseDate} - Present</h4>
            )
          ) : (
            <h4>{`Released ${preview.releaseDate}`}</h4>
          )}
          <p>{preview.description}</p>
          <div className={`${style['btn-container']}`}>
            <button>
              <Add /> Add to List
            </button>
            <button
              onClick={() => {
                openRating(preview)
                close(null)
              }}
            >
              <Star />
              Rate This
            </button>
          </div>
        </div>
      </div>
      <div className={style.overlay}></div>
    </>
  )
}

PreviewInfoModal.propTypes = {
  preview: PropTypes.object,
  openRating: PropTypes.func,
  close: PropTypes.func,
}

export default PreviewInfoModal
