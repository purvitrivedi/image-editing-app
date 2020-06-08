import React from 'react'
import LoadingOverlay from 'react-loading-overlay'
import Loader from 'react-spinners/BeatLoader'

import { getThumbnails, previewFilter } from '../../lib/api'

function Filters({ url, handleImageChange }) {

  const [thumbnails, setThumbnails] = React.useState([])
  const [requestPage, setRequestPage] = React.useState(1)
  const [filterType, setFilterType] = React.useState('sketch')
  const [loading, setLoading] = React.useState(false)

  const changePage = (event) => {
    event === 'left' ? setRequestPage(requestPage - 1) : setRequestPage(requestPage + 1)
    setLoading(true)
  }

  const changeFilterType = event => {
    setFilterType(event.target.value)
  }


  React.useEffect(() => {
    const sendThumbnailRequest = async () => {
      setLoading(true)
      console.log(filterType)
      try {
        const response = await getThumbnails({ url: url, filter: filterType, page: requestPage })
        setThumbnails(response.data)
        setLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    sendThumbnailRequest()
  }, [url, requestPage, filterType] )

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
        <button className={filterType === 'sketch' ? 'type-selected' : ''} onClick={changeFilterType} value="sketch">Sketch</button>
        <button className={filterType === 'histogram' ? 'type-selected' : ''} onClick={changeFilterType} value="histogram">Histogram</button>
        <button className={filterType === 'collage' ? 'type-selected' : ''} onClick={changeFilterType} value="collage">Artist Brush</button>
        <button>Meme Maker</button>
      </div>
      <div className="filters column is-full">
        {!loading && <button className="button filter btn-page" value="left" onClick={changePage}><i className="fas fa-chevron-left"></i></button>}
        {!loading && thumbnails.map(thumbnail => {
          return (
            <img className="filter" src={thumbnail.image} alt={thumbnail.option} key={thumbnail.option} onClick={preview} />
          )
        })}
        {loading &&
          <LoadingOverlay
            className="loading"
            active={loading}
            spinner={<Loader />}
            styles={{
              spinner: (base) => ({
                ...base,
                width: '50px',
                '& svg circle': {
                  stroke: 'rgba(0, 0, 0, 1)'
                }
              })
            }}
          >
          </LoadingOverlay>
        }
        {!loading && <button className="button btn-page filter" value="right" onClick={changePage}><i className="fas fa-chevron-right"></i></button>}
      </div>
    </section>
  )
}


export default Filters