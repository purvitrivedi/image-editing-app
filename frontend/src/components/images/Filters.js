import React from 'react'
import { getThumbnails, previewFilter } from '../../lib/api'

function Filters({ url, handleImageChange }) {

  const [thumbnails, setThumbnails] = React.useState([])
  const [requestPage, setRequestPage] = React.useState(1)
  const [filterType, setFilterType] = React.useState('sketch')

  const changePage = (event) => {
    event === 'left' ? setRequestPage(requestPage - 1) : setRequestPage(requestPage + 1)
  }

  const sendThumbnailRequest = async (event) => {

    if (event) {
      setFilterType(event.target.value)
    }


    try {
      const response = await getThumbnails({ url: url, filter: filterType, page: requestPage })
      setThumbnails(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  React.useEffect(() => {
    sendThumbnailRequest(false)
  }, [url, requestPage])

  const preview = async (event) => {
    try {
      const response = await previewFilter({ url: url, filter_type: filterType, filter_options: event.target.alt })
      handleImageChange(response.data.image)
    } catch (err) {
      console.log(err.response)
    }

  }

  return (
    <section className="section column is-full">
      <div className="columns filter-type">
        <button className="button column" onClick={sendThumbnailRequest} value="sketch">Sketch</button>
        <button className="button column" onClick={sendThumbnailRequest} value="histogram">Histogram</button>
        <button className="button column" onClick={sendThumbnailRequest} value="collage">Artist Brush</button>
        <button className="button column">Meme Maker</button>
      </div>
      <div className="filters column is-full">
        <button className="button" value="left" onClick={changePage}>Left</button>
        {thumbnails.map(thumbnail => {
          return (
            <img className="filter" src={thumbnail.image} alt={thumbnail.option} key={thumbnail.option} onClick={preview} />
          )
        })}
        <button className="button" value="right" onClick={changePage}>Right</button>
      </div>
    </section>
  )
}


export default Filters