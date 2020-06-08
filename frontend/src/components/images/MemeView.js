import React from 'react'
import { useParams } from 'react-router-dom'
import { getSingleImage } from '../../lib/api'

function MemeView() {
  const { id: imageId } = useParams()
  const [image, setImage] = React.useState('')
  const [topText, setTopText] = React.useState('')
  const [bottomText, setBottomText] = React.useState('')

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
  }, [])

  const handleChange = (event) => {
    event.target.name === 'topText' ? setTopText(event.target.value) : setBottomText(event.target.value)
  }

  return (
    <div className="MemeView">
      <div className="box columns meme">
        <div className="left-meme column">
          <img src={image} alt="formeme" />
          <input type="text" className="input top-text" value={topText}/>
        </div>
        <div className="column right-meme">
          <div className="field">
            <label className="label">Enter top text</label>
            <input
              type="text"
              className="input"
              onChange={handleChange}
              name="topText"
              value={topText}
            />
          </div>
          <div className="field">
            <label className="label">Enter bottom text</label>
            <input
              type="text"
              className="input"
              onChange={handleChange}
              name="bottomText"
              value={bottomText}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemeView