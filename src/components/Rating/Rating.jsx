import PropTypes from 'prop-types'
import style from './Rating.module.css'
import Stars from '../Stars/Stars'

const Rating = ({ ratings, isMobile }) => {
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

  return (
    <div className={`${style['rating-container']}`}>
      <div className={style.wrapper}>
        {ratings.map((rating) => {
          return (
            <div
              className={style.rating}
              key={rating.rating_id}
              id={rating.rating_id}
            >
              <div
                className={style.image}
                style={{
                  backgroundImage: `url(${rating.image})`,
                }}
              >
                <p className={style.content}>{rating.content}</p>
              </div>
              <div className={style.info}>
                <h3>{rating.title}</h3>
                <span>{formatDate(rating.created_at)}</span>
                <Stars rating={parseFloat(rating.user_rating)} />
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
  isMobile: PropTypes.bool,
}

export default Rating
