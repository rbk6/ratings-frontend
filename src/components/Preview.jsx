import PropTypes from 'prop-types'
import '../styles/prev.css'

const Preview = ({ previews }) => {
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
          if (overview.length > 200) {
            overview = overview.slice(0, 200).trimEnd() + '...'
          }
          return (
            <div className="preview" key={preview.id} id={preview.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${preview.poster_path}`}
              ></img>
              <div className="preview-info">
                <h2>{preview.original_title}</h2>
                <h3>{formattedDate}</h3>
                <p>{overview}</p>
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
