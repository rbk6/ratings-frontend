import PropTypes from 'prop-types'
import { useState } from 'react'
import style from './Preview.module.css'
import RatingModal from '../RatingModal'
import { Add, InfoOutlined, Star } from '@mui/icons-material'

const Preview = ({ previews, type }) => {
  const [selectedPreview, setSelectedPreview] = useState(null)
  const [moreInfo, setMoreInfo] = useState(null)
  const [ratingIsOpen, setRatingIsOpen] = useState(false)

  const openRating = (preview) => {
    setRatingIsOpen(true)
    setSelectedPreview(preview)
  }

  const toggleInfo = (id) => {
    if (moreInfo === id) setMoreInfo(null)
    else setMoreInfo(id)
  }

  const formatDate = (date) => {
    const releaseDate = new Date(date)
    const month = releaseDate.getMonth() + 1
    const day = releaseDate.getDate()
    const year = releaseDate.getFullYear()
    return `${month}/${day}/${year}`
  }

  return (
    <div className={`${style['preview-container']}`}>
      {ratingIsOpen ? (
        <RatingModal
          preview={selectedPreview}
          setRatingIsOpen={setRatingIsOpen}
          type={type}
        />
      ) : null}
      <div className={style.wrapper}>
        {previews.map((preview) => {
          const formattedDate = formatDate(preview.releaseDate)
          let endDate = formatDate(preview.endDate)

          let description = new DOMParser().parseFromString(
            preview.description.replace(/<\/p><p>/g, ' '),
            'text/html'
          ).body.textContent

          return (
            <div className={style.preview} key={preview.id} id={preview.id}>
              <div className={`${style['more-info']}`}>
                <button onClick={() => toggleInfo(preview.id)}>
                  <InfoOutlined />
                </button>
              </div>
              {moreInfo !== preview.id ? (
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
                        <h4>{`${formattedDate} - ${endDate}`}</h4>
                      ) : (
                        <h4>{formattedDate} - Present</h4>
                      )
                    ) : (
                      <h4>{`Released ${formattedDate}`}</h4>
                    )}
                  </div>
                </>
              ) : (
                <div className={`${style['more-info-wrapper']}`}>
                  <div className={style.info}>
                    <h3>{preview.title}</h3>
                    {preview.status ? (
                      preview.status === 'Ended' ? (
                        <h4>{`${formattedDate} - ${endDate}`}</h4>
                      ) : (
                        <h4>{formattedDate} - Present</h4>
                      )
                    ) : (
                      <h4>{`Released ${formattedDate}`}</h4>
                    )}
                    <p>{description}</p>
                  </div>
                </div>
              )}
              <div className={`${style['btn-container']}`}>
                <button>
                  <Add /> Add to List
                </button>
                <button onClick={() => openRating(preview)}>
                  <Star />
                  Rate This
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
}

export default Preview
