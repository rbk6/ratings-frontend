import PropTypes from 'prop-types'
import { useState } from 'react'
import '../styles/prev.css'

const Preview = ({ previews }) => {
  const [expandOverview, setExpandOverview] = useState([])

  const toggleOverview = (id) => {
    setExpandOverview((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }))
  }

  return (
    <div className="prev-container">
      <div className="preview-wrapper">
        {previews.map((preview) => {
          const releaseDate = new Date(preview.release_date)
          const month = releaseDate.getMonth() + 1
          const day = releaseDate.getDate()
          const year = releaseDate.getFullYear()

          const formattedDate = `${month}-${day}-${year}`

          let overview = preview.overview
          if (overview.length > 70 && !expandOverview[preview.id]) {
            overview = overview.slice(0, 70).trimEnd()
            let lastChar = overview.charAt(overview.length - 1)
            if (['.', '!', '?', ','].includes(lastChar)) {
              overview = overview.slice(0, -1)
            }

            overview = overview + '...'
          }
          return (
            <div className="preview" key={preview.id} id={preview.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${preview.poster_path}`}
                alt={`poster image for ${preview.original_title}`}
              />
              <div className="preview-info">
                <h3>{preview.original_title}</h3>
                <h4>Released {formattedDate}</h4>
                <p>
                  {overview}
                  {preview.overview.length > 70 && (
                    <span>
                      {' '}
                      <a
                        href="#"
                        className="prev-link"
                        onClick={(e) => {
                          e.preventDefault()
                          toggleOverview(preview.id)
                        }}
                      >
                        {expandOverview[preview.id] ? 'Show Less' : 'Read More'}
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
}

export default Preview
