import React from 'react'
import { triggerBase64Download } from 'react-base64-downloader'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { getSingleImage } from '../../lib/api'
import LiveEffects from './LiveEffects'
import Filters from './Filters'
import { Stage, Layer, Rect, Image } from 'react-konva'
import Konva from 'konva'
import useImage from 'use-image'



function ImageEdit() {
  const { id: imageId } = useParams()
  const [image, setImage] = React.useState('')
  const [b64, setB64] = React.useState(null)
  const [original, setOriginal] = React.useState(false)
  const [width, setWidth] = React.useState(null)
  const [height, setHeight] = React.useState(null)
  const url = b64 ? b64 : image
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
  

  React.useEffect(() => {
    const getImage = async () => {
      try {
        const res = await getSingleImage(imageId)
        if (!image) setImage(res.data.url)
        if (!height) setHeight(res.data.height)
        if (!width) setWidth(res.data.width)
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
  }

  const showOriginal = () => {
    console.log('mouse has entered')
    setOriginal(true)
  }
  const hideOriginal = () => {
    console.log('mouse has left')
    setOriginal(false)
  }

  const handleLiveChange = data => {
    console.log(data)
    setliveEffect(data)
  }

  return (
    <div className="ImageEdit">
      <div className="box columns is-multiline">
        <div className="edit-box">
          <Stage width={width} height={height} >
            <Layer>
              <Image
                ref={imageRef}
                width={width}
                height={height}
                x={0}
                y={0}
                image={im}
                filters={ [
                  Konva.Filters.Blur, 
                  Konva.Filters.Brighten,
                  Konva.Filters.Contrast,
                  Konva.Filters.Enhance,
                  Konva.Filters.HSL,
                  
                  
                  //Konva.Filters.Kaleidoscope,
                  liveEffect.sepiaActive ? Konva.Filters.Sepia : null,
                  liveEffect.embossActive ? Konva.Filters.Emboss : null,
                  liveEffect.grayscaleActive ? Konva.Filters.Grayscale : null,
                  liveEffect.invertActive ? Konva.Filters.Invert : null
                  
                ] }
                blurRadius={liveEffect.blur}
                brightness={liveEffect.brightness}
                contrast={liveEffect.contrast}
                embossStrength={liveEffect.embossStrength}
                enhance={liveEffect.enhance}
                hue={liveEffect.hue}
                saturation={liveEffect.saturation}
                luminance={liveEffect.luminance}
                
              />
            </Layer>
          </Stage>
        </div>
        <div>
          <LiveEffects liveChange={handleLiveChange} feedback={liveEffect}/>
        </div>
        {/* <div className="column is-full top editable-img">
          {b64 && original === false && <img src={b64} alt="uploadedimg" onMouseEnter={showOriginal} />}
          {!b64 && <img src={image} alt="uploadedimg" />}
          {original && <img src={image} alt="uploadedimg" onMouseLeave={hideOriginal} />}
        </div> */}
        <Filters url={image} handleImageChange={imageChange} />
        <button className="button button-process column is-one-quarter" onClick={() => triggerBase64Download(b64, 'my_download_name')}>Process Image</button>
        <Link to={`/edit/${imageId}/meme`} className="btn-meme column is-full">Make it a Meme</Link>
      </div>
    </div>
  )
}
export default ImageEdit