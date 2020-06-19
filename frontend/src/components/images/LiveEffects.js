import React from 'react'


function LiveEffects({ liveChange, feedback, reset }) {

  const handleChange = event => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    liveChange({ ...feedback, [event.target.name]: event.target.type === 'checkbox' ? value : parseFloat(value) })
  }


  return (
    <div className="live-effects-wrap">
      <div className="live-effects">
        <div className="sliders">
          <div className="field">
            <input
              step="0.2"
              min="0"
              max="100"
              name="blur"
              value={feedback.blur}
              onChange={handleChange}
              type="range">
            </input>
            <label className="label">Blur</label>
          </div>

          <div className="field">
            <input
              step="0.01"
              min="-1"
              max="1"
              name="brightness"
              value={feedback.brightness}
              onChange={handleChange}
              type="range">
            </input>
            <label className="label">Brightness</label>
          </div>

          <div className="field">
            <input
              step="1"
              min="-80"
              max="100"
              name="contrast"
              value={feedback.contrast}
              onChange={handleChange}
              type="range">
            </input>
            <label className="label">Contrast</label>
          </div>

          <div className="field">
            <input
              step="0.01"
              min="0"
              max="20"
              name="enhance"
              value={feedback.enhance}
              onChange={handleChange}
              type="range">
            </input>
            <label className="label">Enhance</label>
          </div>


          <div className="field">
            <input
              step="1"
              min="0"
              max="255"
              name="hue"
              value={feedback.hue}
              onChange={handleChange}
              type="range">
            </input>
            <label className="label">Hue</label>
          </div>

          <div className="field">
            <input
              step="0.01"
              min="0"
              max="4"
              name="saturation"
              value={feedback.saturation}
              onChange={handleChange}
              type="range">
            </input>
            <label className="label">Saturation</label>
          </div>

          <div className="field">
            <input
              step="0.01"
              min="-1"
              max="1"
              name="luminance"
              value={feedback.luminance}
              onChange={handleChange}
              type="range">
            </input>
            <label className="label">Luminance</label>
          </div>


          <div className="field display-none">
            <input
              step="0.01"
              min="-2"
              max="2"
              name="embossStrength"
              value={feedback.embossStrength}
              onChange={handleChange}
              type="range"
            />
            <label className="label">Emboss Level</label>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LiveEffects