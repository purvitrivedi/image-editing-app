import React from 'react'
import { imageUpload } from '../../lib/api'

const uploadUrl = process.env.REACT_APP_IMAGE_UPLOAD_URL
const uploadPreset = process.env.REACT_APP_IMAGE_UPLOAD_PRESET


function UploadImage({ handleChange }) {

  const handleUpload = async event => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    const res = await imageUpload(uploadUrl, data)
    handleChange(res.data.url)
  }
  return (
    <>
      <input
        className="input"
        type="file"
        onChange={handleUpload}
      />
    </>
  )
}

export default UploadImage