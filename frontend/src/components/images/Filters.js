import React from 'react'
import LoadingOverlay from 'react-loading-overlay'
import Loader from 'react-spinners/PropagateLoader'

import { getThumbnails, previewFilter } from '../../lib/api'

function Filters({ url, handleImageChange }) {

  const [thumbnails, setThumbnails] = React.useState([])
  const [requestPage, setRequestPage] = React.useState(1)
  const [filterType, setFilterType] = React.useState('sketch')
  const [loading, setLoading] = React.useState(false)
  const [leftArrowDisabled, setLeftArrowDisabled] = React.useState(true)
  const [rightArrowDisabled, setRightArrowDisabled] = React.useState(false)

  const changePage = (event) => {
    if (filterType === 'sketch' && requestPage === 1 && event.currentTarget.value === 'right')
      setLeftArrowDisabled(false)
    if (filterType === 'sketch' && requestPage === 8 && event.currentTarget.value === 'right') setRightArrowDisabled(true)
    if (filterType === 'sketch' && requestPage === 9 && event.currentTarget.value === 'left') setRightArrowDisabled(false)

    if (filterType === 'histogram' && requestPage === 1 && event.currentTarget.value === 'right') setRightArrowDisabled(true)
    if (requestPage === 2 && event.currentTarget.value === 'left') {
      setRightArrowDisabled(false)
      setLeftArrowDisabled(true)
    }

    if (event.currentTarget.value === 'left') {
      setRequestPage(requestPage - 1)
    } else {
      setLeftArrowDisabled(false)
      setRequestPage(requestPage + 1)
    }
    setLoading(true)
  }

  const changeFilterType = event => {
    setRequestPage(1)
    setLeftArrowDisabled(true)
    setRightArrowDisabled(false)
    setFilterType(event.target.value)
  }


  React.useEffect(() => {
    const sendThumbnailRequest = async () => {
      setLoading(true)
      try {
        const response = await getThumbnails({ url: url, filter: filterType, page: requestPage })
        setThumbnails(response.data)
        setLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    sendThumbnailRequest()
  }, [url, requestPage, filterType])

  const preview = async (event) => {
    try {
      const response = await previewFilter({ url: url, filter_type: filterType, filter_options: event.target.alt })
      handleImageChange(response.data.image)
    } catch (err) {
      console.log(err.response)
    }
  }

  return (
    <section className="section">
      <div className="filters">
        {!loading
          &&
          <button
            className={leftArrowDisabled ? 'button filter btn-page arrow-disabled' : 'button filter btn-page'}
            value="left"
            onClick={leftArrowDisabled ? null : changePage}>
            <i className="fas fa-chevron-left"></i>
          </button>}
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
        {!loading
          && filterType !== 'collage'
          &&
          <button
            className={rightArrowDisabled ? 'button btn-page filter arrow-disabled' : 'button btn-page filter'}
            value="right"
            onClick={rightArrowDisabled ? null : changePage}>
            <i className="fas fa-chevron-right" value="right"></i>
          </button>}
      </div>
      <div className="columns filter-type">
        <button className={filterType === 'sketch' ? 'type-selected' : ''} onClick={changeFilterType} value="sketch">Sketch</button>
        <button className={filterType === 'histogram' ? 'type-selected' : ''} onClick={changeFilterType} value="histogram">Histogram</button>
        <button className={filterType === 'collage' ? 'type-selected' : ''} onClick={changeFilterType} value="collage">Artist Brush</button>
      </div>
    </section>
  )
}


export default Filters