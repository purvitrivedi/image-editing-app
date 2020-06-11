import React from 'react'
import { triggerBase64Download } from 'react-base64-downloader'
import { imageUpload } from '../../lib/api'
import LoadingOverlay from 'react-loading-overlay'
import Loader from 'react-spinners/SyncLoader'



const uploadUrl = process.env.REACT_APP_IMAGE_UPLOAD_URL
const uploadPreset = process.env.REACT_APP_IMAGE_UPLOAD_PRESET

function SaveImage({ imageData, height }) {
  const [image, setImage] = React.useState('')
  const [loading, setLoading] = React.useState(true)

  const [embedCopySuccess, setEmbedCopySuccess] = React.useState(false)
  const [urlCopySuccess, setUrlCopySuccess] = React.useState(false)
  const embedRef = React.useRef(null)
  const urlRef = React.useRef(null)

  const copied = 'Copied!'

  const handleUpload = async () => {
    console.log('image upload ran')

    try {
      //setLoading(true)
      const data = new FormData()
      data.append('file', imageData)
      data.append('upload_preset', uploadPreset)
      const res = await imageUpload(uploadUrl, data)
      setImage(res.data.secure_url)
      setLoading(false)
    } catch (err) {
      console.log(err.response)
    }
  }

  React.useEffect(() => {
    handleUpload()
    setLoading(true)
  }, [imageData])


  const copyToClipboard = (event) => {
    if (event.target.name === 'embedCopyBtn') {
      embedRef.current.select()
      document.execCommand('copy')
      setEmbedCopySuccess(true)
      setTimeout(() => {
        setEmbedCopySuccess(false)
      }, 2000)
    } else if (event.target.name === 'urlCopyBtn') {
      urlRef.current.select()
      document.execCommand('copy')
      setUrlCopySuccess(true)
      setTimeout(() => {
        setUrlCopySuccess(false)
      }, 2000)
    }

  }

  console.log(embedCopySuccess)
  return (
    <div className="SaveImage" style={{ height: height }}>
      <div className="columns is-multiline">
        <div className="field column is-full embed">
          <label className="label">Embed</label>
          {!loading && <input className="animate-this" readOnly ref={embedRef} type="text" name="embed" value={`<img src="${image}" title="Edited with Filtr" alt="Edit your images with Filtr />`} />}
          {!loading && <button className={embedCopySuccess ? 'button-animate' : 'animate-button'} name="embedCopyBtn" onClick={copyToClipboard}>{embedCopySuccess ? 'Copied!' : 'Copy Embed Info'}</button>}
          {loading &&
            <LoadingOverlay
              active={loading}
              spinner={<Loader />}
              styles={{
                spinner: (base) => ({
                  ...base,
                  width: '100px',
                  height: '100px',
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


        <div className="field column is-full share">
          <label className="label">Share</label>
          {!loading && <input className="animate-this" readOnly ref={urlRef} type="text" name="url" value={image} />}
          {!loading && <button className={urlCopySuccess ? 'button-animate' : 'animate-button'} onClick={copyToClipboard} name="urlCopyBtn">{urlCopySuccess ? 'Copied!' : 'Copy Link'}</button>}
          {loading &&
            <LoadingOverlay
              active={loading}
              spinner={<Loader />}
              styles={{
                spinner: (base) => ({
                  ...base,
                  width: '100px',
                  height: '100px',
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
        <div className="field column is-full download">
          <label className="label">Or simply...</label>
          <button onClick={() => triggerBase64Download(imageData, 'Filtr_image')}>Download</button>
        </div>
      </div>
    </div>
  )
}
export default SaveImage