import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import { Close } from '@mui/icons-material'
import style from './ConfirmModal.module.css'

const ConfirmModal = ({ title, msg, confirm, cancel }) => {
  const modalRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) cancel()
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.body.style.overflow = 'auto'
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [cancel, modalRef])

  return (
    <>
      <div className={`${style['modal-wrapper']}`}>
        <div ref={modalRef} className={`${style['confirm-modal']}`}>
          <div className={style.close}>
            <button onClick={() => cancel()}>
              <Close />
            </button>
          </div>
          <h2>{title}</h2>
          <h3>{msg}</h3>
          <div className={`${style['btn-container']}`}>
            <button
              className={
                title.includes('Delete')
                  ? `${style['delete-btn']}`
                  : `${style['confirm-btn']}`
              }
              onClick={() => confirm()}
            >
              Confirm
            </button>
            <button
              className={`${style['cancel-btn']}`}
              onClick={() => cancel()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div className={style.overlay}></div>
    </>
  )
}

ConfirmModal.propTypes = {
  title: PropTypes.string,
  msg: PropTypes.string,
  confirm: PropTypes.func,
  cancel: PropTypes.func,
}

export default ConfirmModal
