import React from 'react'
import { useParams } from 'react-router-dom'
import { getSingleImage } from '../../lib/api'
import Filters from './Filters'


function ImageEdit() {
  const { id: imageId } = useParams()
  const [image, setImage] = React.useState('')

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


  return (
    <div className="ImageEdit">
      <div className="box columns is-multiline">
        <div className="column is-full top">
          <img src={image} alt="uploadedimg" />
        </div>
        <Filters />
        <button className="button column is-one-quarter">Process Image</button>
      </div>
    </div>
  )
}
export default ImageEdit