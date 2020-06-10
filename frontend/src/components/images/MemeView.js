import React from 'react'
import { previewFilter } from '../../lib/api'

function MemeView({ handleImageChange, image }) {
  const [topText, setTopText] = React.useState('')
  const [bottomText, setBottomText] = React.useState('')
  const [processed, setProcessed] = React.useState(false)

  const handleChange = (event) => {
    event.target.name === 'topText' ? setTopText(event.target.value) : setBottomText(event.target.value)
  }

  const sendPostRequest = async () => {
    const text = `${topText}©π${bottomText}`
    const res = await previewFilter({ url: image, filter_type: 'meme', filter_options: text })
    handleImageChange(res.data.image)
    setProcessed(true)
  }

  console.log(image)


  return (
    <div className="MemeView">
      <div className="columns is-multiline meme">
        <div className="column right-meme columns is-multiline">
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
            >Memify</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default MemeView