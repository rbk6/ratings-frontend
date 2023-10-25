import PropTypes from 'prop-types'
import style from './Stars.module.css'

const Stars = ({ rating }) => {
  const percentage = (rating / 5) * 100

  return (
    <div
      title={`${rating} stars`}
      className={`${style['star-rating']}`}
      style={{
        backgroundImage: `linear-gradient(to right, #6020dd 0%, #6020dd ${percentage}%, #888 ${percentage}%, #888 100%)`,
      }}
    ></div>
  )
}

Stars.propTypes = {
  rating: PropTypes.number,
}

export default Stars
