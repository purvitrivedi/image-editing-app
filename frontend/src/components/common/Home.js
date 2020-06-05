import React from 'react'
import axios from 'axios'

const uploadUrl = process.env.REACT_APP_IMAGE_UPLOAD_URL

const uploadPreset =  process.env.REACT_APP_IMAGE_UPLOAD_PRESET


function Home() {
  const [imageURL, setImageURL] = React.useState('')
  const [imageB64, setImageB64] = React.useState('')

  const uploadImage = async event => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)

    const res = await axios.post(uploadUrl, data)
    setImageURL(res.data.url)
  }

  React.useEffect(() => {
    const postURL = async () => {
      try {
        if (imageURL !== '') {
          const res = await axios.post('/api/images/', { 'url': imageURL })
          setImageB64(res.data.image)
        }
      } catch (err) {
        console.log(err.response)
      }
    }
    postURL()
  }, [imageURL])

  console.log(imageB64)

  return (
    <>
      <input
        className="input"
        type="file"
        onChange={uploadImage}
      />
      <img src={imageB64} alt="upload" />
    </>
  )
}

export default Home