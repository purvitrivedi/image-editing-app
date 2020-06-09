import React from 'react'


function LiveEffects({ liveChange, feedback }) {

  const handleChange = event => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    liveChange({ ...feedback, [event.target.name]: event.target.type === 'checkbox' ? value : parseFloat(value) })
  }




  return (
    <>
      <p>Blur</p>
      <input
        className="slider is-fullwidth is-small is-circle"
        step="1"
        min="0"
        max="100"
        name="blur"
        value={feedback.blur}
        onChange={handleChange}
        type="range">
      </input>

      <p>Brightness</p>
      <input
        className="slider is-fullwidth is-small is-circle"
        step="0.01"
        min="-1"
        max="1"
        name="brightness"
        value={feedback.brightness}
        onChange={handleChange}
        type="range">
      </input>

      <p>Contrast</p>
      <input
        className="slider is-fullwidth is-small is-circle"
        step="1"
        min="-80"
        max="100"
        name="contrast"
        value={feedback.contrast}
        onChange={handleChange}
        type="range">
      </input>

      <p>Enhance</p>
      <input
        className="slider is-fullwidth is-small is-circle"
        step="0.01"
        min="0"
        max="20"
        name="enhance"
        value={feedback.enhance}
        onChange={handleChange}
        type="range">
      </input>


      <p>Emboss</p>
      <input
        type="checkbox"
        name="embossActive"
        checked={feedback.embossActive}
        onChange={handleChange}
      />

      <p>Emboss Level</p>
      <input
        className="slider is-fullwidth is-small is-circle"
        step="0.01"
        min="-2"
        max="2"
        name="embossStrength"
        value={feedback.embossStrength}
        onChange={handleChange}
        type="range"
        disabled={feedback.embossActive ? '' : 'disabled'}>
      </input>

      <p>Grayscale</p>
      <input
        type="checkbox"
        name="grayscaleActive"
        checked={feedback.grayscaleActive}
        onChange={handleChange}
      />

      <p>Invert</p>
      <input
        type="checkbox"
        name="invertActive"
        checked={feedback.invertActive}
        onChange={handleChange}
      /> 

      <p>Sepia</p>
      <input
        type="checkbox"
        name="sepiaActive"
        checked={feedback.sepiaActive}
        onChange={handleChange}
      /> 

      <p>Hue</p>
      <input
        className="slider is-fullwidth is-small is-circle"
        step="1"
        min="0"
        max="255"
        name="hue"
        value={feedback.hue}
        onChange={handleChange}
        type="range">
      </input>
      
      <p>Saturation</p>
      <input
        className="slider is-fullwidth is-small is-circle"
        step="0.01"
        min="0"
        max="4"
        name="saturation"
        value={feedback.saturation}
        onChange={handleChange}
        type="range">
      </input>

      <p>Luminance</p>
      <input
        className="slider is-fullwidth is-small is-circle"
        step="0.01"
        min="-1"
        max="1"
        name="luminance"
        value={feedback.luminance}
        onChange={handleChange}
        type="range">
      </input>
      <button>Reset</button>
    </>
  )
}
export default LiveEffects