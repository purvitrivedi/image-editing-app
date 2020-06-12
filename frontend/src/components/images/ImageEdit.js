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
import LoadingOverlay from 'react-loading-overlay'
import Loader from 'react-spinners/PropagateLoader'

const URLImage = ({ image }) => {
  const [img] = useImage(image.src)
  return (
    <Image
      image={img}
      x={image.x}
      y={image.y}
      height={40}
      width={40}
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
  const [showUndoSaveBtns, setUndoSaveBtns] = React.useState(false)

  const stageRef = React.useRef()
  const imageRef = React.useRef()
  const [images, setImages] = React.useState([])
  const dragUrl = React.useRef()
  const iconRef = React.useRef(null)
  const [previewLoading, setPreviewLoading] = React.useState(false)


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

  const revertButtonImage = 'https://res.cloudinary.com/dx8pt11io/image/upload/v1591890795/download_5_brgk58.png'
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

  const handleIconChange = ref => {
    dragUrl.current = ref
  }

  React.useEffect(() => {
    console.log(iconRef.current, 'Parent Component')
  })

  const imageChange = (image) => {
    setUndoSaveBtns(true)
    setB64(image)
    setUrl(image)
    setPreviewLoading(false)
  }

  const showOriginal = () => {
    setUrl(image)
    setAppliedEffect(false)
    if (url === b64) setShowRevert(true)
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
    setUndoSaveBtns(true)
  }

  const resetEffects = () => {
    setliveEffect(defaultEffect)
    setUrl(image)
    setImages([])
    setB64('')
    // setShowRevert(false)
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
      width={30}
      height={30}
      x={width - 40}
      y={10}
      onClick={() => {
        resetEffects()
        setImages([])
      }}
    />
  }


  return (
    <div className="ImageEdit">
      <div className="box columns is-multiline">
        <div className={showSave ? 'column is-full columns btn-editing' : 'column is-full columns buttons'}>
          {!showSave && <button className="btn-meme column is-three-quarter" onClick={enableMeme}>Make it a Meme</button>}
          {!showSave && showUndoSaveBtns && <button className="btn-reset column is-one-quarter" onClick={resetEffects}>Reset</button>}
          {!showSave && showUndoSaveBtns && <button className="button-process column is-one-quarter" onClick={() => {
            handleSaveImage()
            setShowSave(true)
          }}>Save Image
          </button>
          }
          {showSave && <button className="button-process column is-one-quarter" onClick={() => {
            setShowSave(false)
          }}>Get back to Edit
          </button>}
        </div>
        <div className="edit-box column"
          style={{ width: width, height: height + 40 }}
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

          <div>

            {!previewLoading && <Stage
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

                {/* {showRevert && <RevertIcon />} */}
              </Layer>
            </Stage>}
            {previewLoading &&
              <LoadingOverlay
                className="loading-image"
                active={previewLoading}
                spinner={<Loader />}
                styles={{
                  spinner: (base) => ({
                    ...base,
                    width: '50px',
                    '& svg circle': {
                      stroke: 'rgba(0, 0, 0, 1)'
                    }
                  })
                }}
              >
              </LoadingOverlay>
            }
          </div>



          {!previewLoading && !showSave && <LiveEffectChecks liveChange={handleLiveChange} feedback={liveEffect} className="column" />}
          {meme && !showSave && <MemeView width={width} height={height} image={image} handleImageChange={imageChange} handleClose={disableMeme} base64={b64} id={imageId} />}
        </div>
        {!showSave && <LiveEffects liveChange={handleLiveChange} reset={resetEffects} feedback={liveEffect} className="column is-one-quarter" />}
        {!showSave && <Filters url={image} handleImageChange={imageChange} handleIconChange={handleIconChange} setPreviewLoading={setPreviewLoading} />}
        {showSave && <SaveImage imageData={dataURL} className="column" height={height}/>}
      </div>
    </div>
  )
}
export default ImageEdit