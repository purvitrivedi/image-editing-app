import React from 'react'
import { postURL } from '../../lib/api'
import UploadImage from '../images/UploadImage'
import { useHistory } from 'react-router-dom'


function Home() {
  const history = useHistory()
  const [imageData, setImageData] = React.useState(null)

  const handleImageChange = data => {
    const { url, width, height } = data
    setImageData({
      url,
      width,
      height
    })
  }

  React.useEffect(() => {
    const handlePost = async () => {
      try {
        if (imageData !== null) {
          const res = await postURL(imageData)
          history.push(`/edit/${res.data.id}`)
        }
      } catch (err) {
        console.log(err.response)
      }
    }
    handlePost()
  }, [imageData, history])

  return (
    <>
      <UploadImage handleChange={handleImageChange} />
    </>
  )
}

export default Home