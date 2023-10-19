import PropTypes from 'prop-types'
import { useState } from 'react'
import { Add, InfoOutlined, Star } from '@mui/icons-material'
import PreviewInfoModal from '../PreviewInfoModal/PreviewInfoModal'
import RatingModal from '../RatingModal'
import style from './Preview.module.css'

const Preview = ({ previews, type, isMobile }) => {
  const [selectedPreview, setSelectedPreview] = useState(null)
  const [moreInfo, setMoreInfo] = useState(null)
  const [ratingIsOpen, setRatingIsOpen] = useState(false)

  const openRating = (preview) => {
    setRatingIsOpen(true)
    setSelectedPreview(preview)
  }

  const toggleInfo = (preview) => {
    if (moreInfo === preview.id) setMoreInfo(null)
    else {
      setMoreInfo(preview.id)
      setSelectedPreview(preview)
    }
  }

  const formatDate = (date) => {
    const releaseDate = new Date(date)
    const month = releaseDate.getMonth() + 1
    const day = releaseDate.getDate()
    const year = releaseDate.getFullYear()
    return `${month}/${day}/${year}`
  }

  const uniquePreviews = Array.from(
    new Set(previews.map((preview) => preview.id))
  ).map((id) => previews.find((preview) => preview.id === id))

  return (
    <div className={`${style['preview-container']}`}>
      {ratingIsOpen ? (
        <RatingModal
          preview={selectedPreview}
          setRatingIsOpen={setRatingIsOpen}
          type={type}
        />
      ) : null}
      {moreInfo && isMobile ? (
        <PreviewInfoModal
          preview={selectedPreview}
          close={() => setMoreInfo(null)}
        />
      ) : null}
      <div className={style.wrapper}>
        {uniquePreviews.map((preview) => {
          preview.releaseDate = formatDate(preview.releaseDate)
          preview.endDate = formatDate(preview.endDate)

          preview.description = new DOMParser().parseFromString(
            preview.description.replace(/<\/p><p>/g, ' '),
            'text/html'
          ).body.textContent

          return (
            <div className={style.preview} key={preview.id} id={preview.id}>
              <div className={`${style['more-info']}`}>
                <button
                  title={`About ${preview.title}`}
                  onClick={() => toggleInfo(preview)}
                >
                  <InfoOutlined />
                </button>
              </div>
              {moreInfo !== preview.id || isMobile ? (
                <>
                  <div
                    className={style.image}
                    style={{
                      backgroundImage: `url(${preview.image})`,
                    }}
                  ></div>
                  <div className={style.info}>
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
                  </div>
                </>
              ) : (
                <>
                  <div className={`${style['more-info-wrapper']}`}>
                    <div className={style.info}>
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
                    </div>
                  </div>
                </>
              )}
              <div className={`${style['btn-container']}`}>
                <button title={`Add ${preview.title} to List`}>
                  <Add />
                  {isMobile ? 'Add to' : 'Add to List'}
                </button>
                <button
                  title={`Rate ${preview.title}`}
                  style={isMobile ? { width: '60px' } : {}}
                  onClick={() => openRating(preview)}
                >
                  <Star />
                  {isMobile ? 'Rate' : 'Rate This'}
                </button>
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
  isMobile: PropTypes.bool,
}

export default Preview
