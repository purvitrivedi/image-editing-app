import React from 'react'
import { triggerBase64Download } from 'react-base64-downloader'
import { useParams } from 'react-router-dom'
import { getSingleImage } from '../../lib/api'
import LiveEffects from './LiveEffects'
import LiveEffectChecks from './LiveEffectChecks'
import Filters from './Filters'
import MemeView from './MemeView'
import { Stage, Layer, Image } from 'react-konva'
import Konva from 'konva'
import useImage from 'use-image'




function ImageEdit() {
  const { id: imageId } = useParams()
  const [image, setImage] = React.useState('')
  const [b64, setB64] = React.useState(null)
  const [width, setWidth] = React.useState(null)
  const [height, setHeight] = React.useState(null)
  const [url, setUrl] = React.useState('')
  const [im] = useImage(url, 'Anonimus')
  const imageRef = React.useRef()
  const [liveEffect, setliveEffect] = React.useState({
    blur: 0,
    brightness: 0,
    embossStrength: 0.6,
    embossActive: false,
    grayscaleActive: false,
    enhance: 0,
    alpha: 1
  })
  const [appliedEffect, setAppliedEffect] = React.useState(true)
  const defaultEffect = {
    blur: 0,
    brightness: 0,
    embossStrength: 0.6,
    embossActive: false,
    grayscaleActive: false,
    enhance: 0,
    alpha: 1
  }
  const [meme, setMeme] = React.useState(true)


  React.useEffect(() => {
    const getImage = async () => {
      try {
        const res = await getSingleImage(imageId)
        if (!image) setImage(res.data.url)
        if (!height) setHeight(res.data.height)
        if (!width) setWidth(res.data.width)
        setUrl(res.data.url)
      } catch (err) {
        console.log(err.response)
      }
    }
    getImage()
  }, [imageId])

  React.useEffect(() => {
    if (im) {
      // Copied from the Konva docs
      imageRef.current.cache()
      imageRef.current.getLayer().batchDraw()
    }
  }, [im])

  const imageChange = (image) => {
    setB64(image)
    setUrl(image)
  }

  const showOriginal = () => {
    setUrl(image)
    setAppliedEffect(false)
  }
  const hideOriginal = () => {
    setUrl(b64)
    setAppliedEffect(true)
  }

  const handleLiveChange = data => {
    setliveEffect(data)
  }

  const resetEffects = () => {
    setliveEffect(defaultEffect)
    setUrl(image)
    setB64('')
  }

  const enableMeme = () => {
    setMeme(true)
  }

  return (
    <div className="ImageEdit">
      <div className="box columns is-multiline">
        <div className="column is-full columns buttons">
          <button className=" btn-meme column is-three-quarter" onClick={enableMeme}>Make it a Meme</button>
          <button className=" btn-reset column is-one-quarter" onClick={resetEffects}>Reset</button>
          <button className=" button-process column is-one-quarter" onClick={() => triggerBase64Download(b64, 'my_download_name')}>Process Image</button>

        </div>
        <div className="edit-box column">
          <Stage width={width} height={height}>
            <Layer>
              <Image
                ref={imageRef}
                width={width}
                height={height}
                onMouseEnter={showOriginal}
                onMouseLeave={hideOriginal}
                x={0}
                y={0}
                image={im}
                filters={[
                  Konva.Filters.Blur,
                  Konva.Filters.Brighten,
                  Konva.Filters.Contrast,
                  Konva.Filters.Enhance,
                  Konva.Filters.HSL,
                  //Konva.Filters.Kaleidoscope,

                  // * Have to pass the Konva filters a function even if they are not used to surpress warnings in the console.
                  liveEffect.sepiaActive && appliedEffect ? Konva.Filters.Sepia : function () { },
                  liveEffect.embossActive && appliedEffect ? Konva.Filters.Emboss : function () { },
                  liveEffect.grayscaleActive && appliedEffect ? Konva.Filters.Grayscale : function () { },
                  liveEffect.invertActive && appliedEffect ? Konva.Filters.Invert : function () { }

                ]}
                blurRadius={appliedEffect ? liveEffect.blur : defaultEffect.blur}
                brightness={appliedEffect ? liveEffect.brightness : defaultEffect.brightness}
                contrast={appliedEffect ? liveEffect.contrast : defaultEffect.contrast}
                embossStrength={appliedEffect ? liveEffect.embossStrength : defaultEffect.embossStrength}
                enhance={appliedEffect ? liveEffect.enhance : defaultEffect.enhance}
                hue={appliedEffect ? liveEffect.hue : defaultEffect.hue}
                saturation={appliedEffect ? liveEffect.saturation : defaultEffect.saturation}
                luminance={appliedEffect ? liveEffect.luminance : defaultEffect.luminance}
              />
            </Layer>
          </Stage>
          <LiveEffectChecks liveChange={handleLiveChange} feedback={liveEffect} className="column" />
          {meme && <MemeView width={width} height={height} image={image} handleImageChange={imageChange}/>}
        </div>
        <LiveEffects liveChange={handleLiveChange} reset={resetEffects} feedback={liveEffect} className="column is-one-quarter" />
        <Filters url={image} handleImageChange={imageChange} />
      </div>
    </div>
  )
}
export default ImageEdit