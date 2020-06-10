import React from 'react'
import { triggerBase64Download } from 'react-base64-downloader'
import { imageUpload } from '../../lib/api'

const uploadUrl = process.env.REACT_APP_IMAGE_UPLOAD_URL
const uploadPreset = process.env.REACT_APP_IMAGE_UPLOAD_PRESET

function SaveImage({ imageData }) {
  const [image, setImage] = React.useState('')

  const [embedCopySuccess, setEmbedCopySuccess] = React.useState('')
  const [urlCopySuccess, setUrlCopySuccess] = React.useState('')
  const embedRef = React.useRef(null)
  const urlRef = React.useRef(null)

  const handleUpload = async () => {
    console.log('image upload ran')
    try {
      //setLoading(true)
      const data = new FormData()
      data.append('file', imageData)
      data.append('upload_preset', uploadPreset)
      const res = await imageUpload(uploadUrl, data)
      setImage(res.data.secure_url)
    } catch (err) {
      console.log(err.response)
    }
  }

  React.useEffect(() => {
    handleUpload()
  }, [imageData])


  const copyToClipboard = (event) => {
    if (event.target.name === 'embedCopyBtn') {
      embedRef.current.select()
      document.execCommand('copy')
      setEmbedCopySuccess('Copied!')
    } else if (event.target.name === 'urlCopyBtn'){
      urlRef.current.select()
      document.execCommand('copy')
      setUrlCopySuccess('Copied!')
    }


  }


  return (
    <>
      <h1>Embed your image</h1>
      <input readOnly ref={embedRef} type="text" name="embed" value={`<img src="${image}" title="Edited with Filtr" alt="Edit your images with Filtr"`} />
      
      <button name="embedCopyBtn" onClick={copyToClipboard}>Copy Embed Info</button>
      {embedCopySuccess}
      <input readOnly ref={urlRef} type="text" name="url" value={image} />
      
      <button name="urlCopyBtn" onClick={copyToClipboard}>Copy Link</button>
      {urlCopySuccess}

      <h1>Download your image</h1>
      <button onClick={() => triggerBase64Download(imageData, 'Filtr_image')}>Download Image</button>
    </>
  )
}
export default SaveImage