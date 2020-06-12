import React from 'react'
import { previewFilter } from '../../lib/api'

function MemeView({ handleImageChange, image, handleClose, width, height, base64, id }) {
  const [topText, setTopText] = React.useState('')
  const [bottomText, setBottomText] = React.useState('')

  const handleChange = (event) => {
    event.target.name === 'topText' ? setTopText(event.target.value) : setBottomText(event.target.value)
  }

  const sendPostRequest = async () => {
    const text = `${topText.toUpperCase()}©π${bottomText.toUpperCase()}`
    let url
    if (base64) {
      url = `${id}&&${width}&&${height}&&${base64}`
    } else {
      url = image
    }
    const res = await previewFilter({ url: url, filter_type: 'meme', filter_options: text })
    handleImageChange(res.data.image)
  }

  return (
    <div className="MemeView">
      <div className="columns is-multiline meme">
        <div className="column right-meme columns is-multiline">
          <div className="field column is-full">
            <p onClick={handleClose}><i className="fas fa-times"></i></p>
          </div>
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
          <div className="field column is-full">
            <div className="save-btn button"
              onClick={sendPostRequest}
            >Meme it</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default MemeView