import React from 'react'
import { useParams } from 'react-router-dom'
import { getSingleImage, previewFilter } from '../../lib/api'

function MemeView() {
  const { id: imageId } = useParams()
  const [image, setImage] = React.useState('')
  const [topText, setTopText] = React.useState('')
  const [bottomText, setBottomText] = React.useState('')
  const [processed, setProcessed] = React.useState(false)

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

  const handleChange = (event) => {
    event.target.name === 'topText' ? setTopText(event.target.value) : setBottomText(event.target.value)
  }

  const sendPostRequest = async() => {
    const text = `${topText}©π${bottomText}`
    const res = await previewFilter({ url: image, filter_type: 'meme', filter_options: text })
    setImage(res.data.image)
    setProcessed(true)
  }
  
  return (
    <div className="MemeView">
      <div className="columns is-multiline meme">
        {/* <div className="left-meme column">
          <img src={image} alt="formeme" onLoad={onImgLoad} />
          {!processed && <input type="text" className="top-text" value={topText} style={{ width: `${imgWidth}px` }} />}
          {!processed && <input type="text" className="bottom-text" value={bottomText} style={{ width: `${imgWidth}px`, top: `${imgWidth + 120}px` }} />}
        </div> */}
        {!processed && <div className="column right-meme columns is-multiline">
          <div className="field column is-full">
            <input
              type="text"
              className="input"
              onChange={handleChange}
              name="topText"
              value={topText}
              placeholder="Enter top text"
            />
          </div>
          <div className="field column is-full">
            <input
              type="text"
              className="input"
              onChange={handleChange}
              name="bottomText"
              value={bottomText}
              placeholder="Enter bottom text"
            />
          </div>
          <div className="save-btn button" onClick={sendPostRequest}>Memify</div>
        </div>}
        
      </div>
    </div>
  )
}

export default MemeView