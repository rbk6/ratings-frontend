import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import { Close, Add, Star } from '@mui/icons-material'
import style from './PreviewInfoModal.module.css'

const PreviewInfoModal = ({ preview, close }) => {
  const modalRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) close(null)
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.body.style.overflow = 'auto'
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [close, modalRef])

  return (
    <>
      <div className={`${style['modal-wrapper']}`}>
        <div ref={modalRef} className={`${style['info-modal']}`}>
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
            <button>
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
  close: PropTypes.func,
}

export default PreviewInfoModal
