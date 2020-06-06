import React from 'react'
import { postURL } from '../../lib/api'
import UploadImage from '../images/UploadImage'
import { useHistory } from 'react-router-dom'


function Home() {
  const history = useHistory()
  const [imageURL, setImageURL] = React.useState('')

  const handleImageChange = (url) => {
    setImageURL(url)
  }

  React.useEffect(() => {
    const handlePost = async () => {
      try {
        if (imageURL !== '') {
          const res = await postURL(imageURL)
          history.push(`/edit/${res.data.id}`)
        }
      } catch (err) {
        console.log(err.response)
      }
    }
    handlePost()
  }, [imageURL])


  return (
    <>
      <UploadImage handleChange={handleImageChange} />
    </>
  )
}

export default Home