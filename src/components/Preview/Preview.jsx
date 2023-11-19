import PropTypes from 'prop-types'
import { useState } from 'react'
import { Add, InfoOutlined, Star } from '@mui/icons-material'
import PreviewInfoModal from '../PreviewInfoModal/PreviewInfoModal'
import CreateModal from '../CreateModal/CreateModal'
import style from './Preview.module.css'
import AddToList from '../AddToList/AddToList'

const Preview = ({ previews, lists, type, isMobile }) => {
  const [selectedPreview, setSelectedPreview] = useState(null)
  const [moreInfo, setMoreInfo] = useState(null)
  const [ratingIsOpen, setRatingIsOpen] = useState(false)
  const [addToListIsOpen, setAddToListIsOpen] = useState(false)

  const openRating = (preview) => {
    setRatingIsOpen(true)
    setSelectedPreview(preview)
  }

  const openAddToList = (preview) => {
    if (addToListIsOpen && selectedPreview.title === preview.title)
      setAddToListIsOpen(false)
    else {
      setAddToListIsOpen(true)
      setSelectedPreview(preview)
    }
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
        <CreateModal
          title={'Create Rating'}
          preview={selectedPreview}
          setRatingIsOpen={setRatingIsOpen}
          type={type}
        />
      ) : null}
      {moreInfo && isMobile ? (
        <PreviewInfoModal
          preview={selectedPreview}
          openRating={openRating}
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
                    <h3 title={preview.title}>{preview.title}</h3>
                    {preview.status ? (
                      preview.status === 'Ended' ? (
                        <span>{`${preview.releaseDate} - ${preview.endDate}`}</span>
                      ) : (
                        <span>{preview.releaseDate} - Present</span>
                      )
                    ) : (
                      <span>{`Released ${preview.releaseDate}`}</span>
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
                          <span>{`${preview.releaseDate} - ${preview.endDate}`}</span>
                        ) : (
                          <span>{preview.releaseDate} - Present</span>
                        )
                      ) : (
                        <span>{`Released ${preview.releaseDate}`}</span>
                      )}
                      <p>{preview.description}</p>
                    </div>
                  </div>
                </>
              )}
              <div className={`${style['btn-container']}`}>
                {addToListIsOpen &&
                selectedPreview &&
                selectedPreview === preview ? (
                  <AddToList
                    preview={selectedPreview}
                    lists={lists}
                    isOpen={addToListIsOpen}
                    onClose={() => setAddToListIsOpen(false)}
                  />
                ) : null}
                <button
                  title={`Add ${preview.title} to List`}
                  onClick={() => openAddToList(preview)}
                >
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
  lists: PropTypes.array,
  type: PropTypes.string,
  isMobile: PropTypes.bool,
}

export default Preview
