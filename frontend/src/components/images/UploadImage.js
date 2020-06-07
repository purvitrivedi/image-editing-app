import React from 'react'
import { imageUpload } from '../../lib/api'
import LoadingOverlay from 'react-loading-overlay'
import Loader from 'react-spinners/BarLoader'

const uploadUrl = process.env.REACT_APP_IMAGE_UPLOAD_URL
const uploadPreset = process.env.REACT_APP_IMAGE_UPLOAD_PRESET


function UploadImage({ handleChange }) {

  const [loading, setLoading] = React.useState(false)

  const handleUpload = async event => {
    setLoading(true)
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    const res = await imageUpload(uploadUrl, data)
    handleChange(res.data.url)
  }

  return (
    <div className="box">
      <section className="Home columns">
        <div className="left-side column">
          <div className="img-one"></div>
          <div className="filtr-one"></div>
          <div className="img-two"></div>
          <div className="filtr-two"></div>
          <div className="img-three"></div>
          <div className="filtr-three"></div>
        </div>
        <div className="right-side column columns is-multiline">
          <div className="column right-top is-full">
            <h1>Filtr</h1>
            <h2>Create Beautiful Images Instantly</h2>
          </div>
          <div className="right-btm column is-full">
            {!loading &&
              <label className="upload">
                Upload an Image
                <input
                  className="input"
                  type="file"
                  onChange={handleUpload}
                />
              </label>}
            {loading &&
              <LoadingOverlay
                active={loading}
                spinner={<Loader />}
                styles={{
                  spinner: (base) => ({
                    ...base,
                    width: '100px',
                    '& svg circle': {
                      stroke: 'rgba(0, 0, 0, 1)'
                    }
                  })
                }}
                className="loading"
              >
              </LoadingOverlay>
            }
          </div>
        </div>
      </section>
    </div>
  )
}

export default UploadImage