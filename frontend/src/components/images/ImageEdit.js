import React from 'react'
import { useParams } from 'react-router-dom'
import { getSingleImage } from '../../lib/api'


function ImageEdit() {
  const { id: imageId } = useParams()
  const [ image, setImage ] = React.useState('')

  React.useEffect(() => {
    const getImage = async () => {
      try {
        const res = await getSingleImage(imageId)
        setImage(res.data.url)
      } catch (err) {
        console.log(err.response)
      }
    }
    getImage()
  }, [imageId])

  console.log('rendering')

  return (
    <>
      <img src={image} alt="uploaded image"/>
    </>
  )
}
export default ImageEdit