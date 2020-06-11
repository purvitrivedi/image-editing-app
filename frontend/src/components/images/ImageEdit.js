import React from 'react'
import { useParams } from 'react-router-dom'
import { getSingleImage } from '../../lib/api'
import LiveEffects from './LiveEffects'
import LiveEffectChecks from './LiveEffectChecks'
import Filters from './Filters'
import MemeView from './MemeView'
import { Stage, Layer, Image } from 'react-konva'
import Konva from 'konva'
import useImage from 'use-image'
import SaveImage from './SaveImage'

const revertButtonDefaultImage = 'https://res.cloudinary.com/jompra/image/upload/v1591872989/ImageEditor/Site%20Assets/RevertButton_ygagaj.png'
const revertButtonDoneImage = 'https://res.cloudinary.com/jompra/image/upload/v1591872989/ImageEditor/Site%20Assets/DoneButton_rr77tc.png'

const URLImage = ({ image }) => {
  const [img] = useImage(image.src)
  return (
    <Image
      image={img}
      x={image.x}
      y={image.y}
      height={20}
      width={20}
      draggable="true"
    />
  )
}


function ImageEdit() {
  const { id: imageId } = useParams()
  const [image, setImage] = React.useState('')
  const [b64, setB64] = React.useState(null)
  const [width, setWidth] = React.useState(null)
  const [height, setHeight] = React.useState(null)
  const [url, setUrl] = React.useState('')
  const [im] = useImage(url, 'anonymous')
  const [dataURL, setDataURL] = React.useState('')
  const [showSave, setShowSave] = React.useState(false)
  const [showRevert, setShowRevert] = React.useState(false)
  const [revertButtonImage, setRevertButtonImage] = React.useState('https://res.cloudinary.com/jompra/image/upload/v1591872989/ImageEditor/Site%20Assets/RevertButton_ygagaj.png')
  const stageRef = React.useRef()
  const imageRef = React.useRef()
  const [images, setImages] = React.useState([])
  const dragUrl = React.useRef()

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
  const [meme, setMeme] = React.useState(false)


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
  }, [imageId, height, image, width])

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
    setShowRevert(true)
    setAppliedEffect(false)
    console.log('mouse has entered')
  }

  const hideOriginal = () => {
    setAppliedEffect(true)
    setShowRevert(false)
    setUrl(b64)
    console.log('mouse has left')
  }

  const handleLiveChange = data => {
    setliveEffect(data)
  }

  const resetEffects = () => {
    setliveEffect(defaultEffect)
    setUrl(image)
    setB64('')
  }



  const handleSaveImage = () => {
    const dataURL = stageRef.current.toDataURL()
    setDataURL(dataURL)
  }
  const enableMeme = () => {
    setMeme(true)
  }

  const disableMeme = () => {
    setMeme(false)
  }

  
  
  const RevertIcon = () => {
    const [revertButton] = useImage(revertButtonImage)
    return <Image 
      image={revertButton}
      width={150}
      height={50}
      x={width - 200}
      y={20}
      onClick={ () => {
        resetEffects()
        setRevertButtonImage(revertButtonDoneImage)
        setImages([])
        setTimeout(() => {
          setRevertButtonImage(revertButtonDefaultImage)
        }, 3000)
      }}
    />
  }
  console.log(showRevert)
  return (
    <div className="ImageEdit">
      <div className="box columns is-multiline">
        <div className="column is-full columns buttons">
          <button className="btn-meme column is-three-quarter" onClick={enableMeme}>Make it a Meme</button>
          <button className="btn-reset column is-one-quarter" onClick={resetEffects}>Revert</button>
          <button className="button-process column is-one-quarter" onClick={() => {
            handleSaveImage()
            setShowSave(true)
          }}>Save Image</button>
        </div>
        {showSave && <SaveImage imageData={dataURL} />}

        <div className="edit-box column"

          onDrop={event => {
            // register event position
            stageRef.current.setPointersPositions(event)
            // add image
            setImages(
              images.concat([
                {
                  ...stageRef.current.getPointerPosition(),
                  src: dragUrl.current
                }
              ])
            )
          }}
          onDragOver={event => event.preventDefault()}
        >
          <div className="column is-one-fifth">
            <img
              alt="Heart"
              src="https://www.iconexperience.com/_img/v_collection_png/256x256/shadow/heart.png"
              draggable="true"
              width={20}
              onDragStart={event => {
                dragUrl.current = event.target.src
              }}
            />
            <img
              alt="map pin"
              src="https://freeiconshop.com/wp-content/uploads/edd/location-pin-compact-outline.png"
              draggable="true"
              width={20}
              onDragStart={event => {
                dragUrl.current = event.target.src
              }}

            />
          </div>
          <div>

            <Stage
              width={width}
              height={height}
              ref={stageRef}
              id="stage"
            >

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
                {images.map((image, i) => {
                  return <URLImage key={i} image={image} />
                })}
                
                {showRevert && <RevertIcon />}
              </Layer>
            </Stage>

          </div>



          <LiveEffectChecks liveChange={handleLiveChange} feedback={liveEffect} className="column" />
          {meme && <MemeView width={width} height={height} image={image} handleImageChange={imageChange} handleClose={disableMeme} base64={b64} id={imageId}/>}
        </div>
        <LiveEffects liveChange={handleLiveChange} reset={resetEffects} feedback={liveEffect} className="column is-one-quarter" />
        <Filters url={image} handleImageChange={imageChange} />
      </div>
    </div>
  )
}
export default ImageEdit