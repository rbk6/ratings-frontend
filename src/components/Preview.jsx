import PropTypes from 'prop-types'
import { useState } from 'react'
import '../styles/prev.css'
import RatingModal from '../components/RatingModal'

const Preview = ({ previews, type }) => {
  const [expandOverview, setExpandOverview] = useState([])
  const [selectedPreview, setSelectedPreview] = useState(null)
  const [ratingIsOpen, setRatingIsOpen] = useState(false)

  const openRating = (preview) => {
    setRatingIsOpen(true)
    setSelectedPreview(preview)
  }

  const toggleOverview = (id) => {
    setExpandOverview((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }))
  }

  const formatDate = (date) => {
    const releaseDate = new Date(date)
    const month = releaseDate.getMonth() + 1
    const day = releaseDate.getDate()
    const year = releaseDate.getFullYear()
    return `${month}/${day}/${year}`
  }

  const formatDesc = (desc) => {
    if (desc.length > 60) {
      desc = desc.slice(0, 60).trimEnd()
      let lastChar = desc.charAt(desc.length - 1)
      if (['.', '!', '?', ','].includes(lastChar)) desc = desc.slice(0, -1)
    }

    return desc + '...'
  }

  return (
    <div className="prev-container">
      {ratingIsOpen ? (
        <RatingModal
          preview={selectedPreview}
          setRatingIsOpen={setRatingIsOpen}
        />
      ) : null}
      <div className="preview-wrapper">
        {previews.map((preview) => {
          const formattedDate = formatDate(
            type === 'movie' ? preview.release_date : preview.premiered
          )
          let endDate = formatDate(type === 'show' ? preview.ended : null)

          let overviewFull =
            type === 'movie' ? preview.overview : preview.summary
          overviewFull = overviewFull.replace(/<\/p><p>/g, ' ')
          overviewFull = new DOMParser().parseFromString(
            overviewFull,
            'text/html'
          ).body.textContent

          const overview = formatDesc(overviewFull)
          const shouldExpand = expandOverview[preview.id]
          const displayOverview = shouldExpand ? overviewFull : overview

          return (
            <div className="preview" key={preview.id} id={preview.id}>
              <div
                className="image-container"
                style={{
                  backgroundImage: `url(${
                    type === 'movie'
                      ? `https://image.tmdb.org/t/p/w500/${preview.poster_path}`
                      : preview.image.original
                  })`,
                }}
              ></div>
              <div className="preview-info">
                <h3>
                  {type === 'movie' ? preview.original_title : preview.name}
                </h3>
                {preview.status ? (
                  preview.status === 'Ended' ? (
                    <h4
                      style={{ textAlign: 'center' }}
                    >{`${formattedDate} - ${endDate}`}</h4>
                  ) : (
                    <h4 style={{ textAlign: 'center' }}>
                      {formattedDate} - Present
                    </h4>
                  )
                ) : (
                  <h4>{`Released ${formattedDate}`}</h4>
                )}
                <p>
                  {displayOverview}
                  {overviewFull.length > 70 && (
                    <span>
                      <a
                        href="#"
                        className="prev-link"
                        onClick={(e) => {
                          e.preventDefault()
                          toggleOverview(preview.id)
                        }}
                        style={{ marginLeft: '8px' }}
                      >
                        {shouldExpand ? 'Show Less' : 'Read More'}
                      </a>
                    </span>
                  )}
                </p>
                <div className="btn-container">
                  <button
                    style={{
                      borderBottomLeftRadius: '12px',
                      borderTopRightRadius: '12px',
                    }}
                    className="prev-btn"
                  >
                    Add to List
                  </button>
                  <button
                    style={{
                      borderBottomRightRadius: '12px',
                      borderTopLeftRadius: '12px',
                    }}
                    className="prev-btn"
                    onClick={() => openRating(preview)}
                  >
                    Create Rating
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

Preview.propTypes = {
  previews: PropTypes.array,
  type: PropTypes.string,
}

export default Preview
