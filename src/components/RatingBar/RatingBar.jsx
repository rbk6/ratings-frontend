import PropTypes from 'prop-types'
import style from './RatingBar.module.css'

const RatingBar = ({ rating }) => {
  const percentage = (rating / 5) * 100
  const displayRating = rating % 1 === 0 ? rating.toFixed(0) : rating.toFixed(1)

  return (
    <div
      title={`${percentage.toFixed(0)}% Rating`}
      className={style['rating-bar-container']}
    >
      <div className={style['rating-text']}>{displayRating}/5 Stars</div>
      <div
        className={style['rating-bar']}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  )
}

RatingBar.propTypes = {
  rating: PropTypes.number.isRequired,
}

export default RatingBar
