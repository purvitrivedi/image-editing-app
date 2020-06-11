import React from 'react'


function LiveEffectsChecks({ liveChange, feedback }) {

  const handleChange = event => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    liveChange({ ...feedback, [event.target.name]: event.target.type === 'checkbox' ? value : parseFloat(value) })
  }
  return (
    <div className="live-effects columns is-multiline">
      <div className="column checkboxes">
        <div className="column">
          <label className="label">Sepia</label>
          <input
            type="checkbox"
            name="sepiaActive"
            checked={feedback.sepiaActive}
            onChange={handleChange}
          />
        </div>
        <div className="column">
          <label className="label">Invert</label>
          <input
            type="checkbox"
            name="invertActive"
            checked={feedback.invertActive}
            onChange={handleChange}
          />
        </div>

        <div className="column">
          <label className="label">Grayscale</label>
          <input
            type="checkbox"
            name="grayscaleActive"
            checked={feedback.grayscaleActive}
            onChange={handleChange}
          />
        </div>
        <div className="column">
          <label className="label">Emboss</label>
          <input
            type="checkbox"
            name="embossActive"
            checked={feedback.embossActive}
            onChange={handleChange}
          /></div>
      </div>
      
    </div>
  )
}
export default LiveEffectsChecks