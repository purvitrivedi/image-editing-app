# General Assembly Project 4: Filtr

**Project Members**:

* George Jones: https://github.com/Jompra
* Purvi Trivedi https://github.com/purvitrivedi

**_Timeframe_**

7 Days

## Goal:

To design a full-stack React app using Python, Django and PostgreSQL.

## Technologies Used

- React Hooks
- Python
- Django
- PostgreSQL
- SASS
- scikit - Image
- Pillow
- base64
- rest_framework
- matplotlib
- Numpy
- Konva
- Axios
- Bulma
- HTTP-proxy-middleware
- Git/GitHub

# Filtr

An image editing app where a user can upload an image and add tint, historgram and artist brush image filters. Users can also make use of CSS filters, add emojis and create memes.

![Filtr Home Page](frontend/src/assets/filtr-home.png)

### Deployed version

https://the-filtr-app.herokuapp.com/

## Code Installation

https://github.com/purvitrivedi/image-editing-app

- Clone or download the repo
- <code>pipenv</code> to install Python packages
- <code> python manage.py loaddata images/seeds.json</code>to create initial data for the database
- <code>cd frontend</code> to go to frontend directory
- <code>npm i</code> to install frontend packages
- <code>npm run build</code>
- go back to main directory and run <code>python manage.py runserver</code> to start the app

# Process

## Idea

For my final project, I wanted to push myself and build something different from Project 3's [Hikr](https://hikrr.herokuapp.com/) which was a CRUD app.

When George shared the idea of making an image-editing app, I was immediately interested in pairing up as it was the perfect opportunity to experiment learn something new.

George had already worked out that we could use base64 to quickly send images between frontend and backend. We then created a flowchart to outline the full app journey between the Frontend and the Backend:

![Filtr FlowChart](frontend/src/assets/flowchart.png)

## Experiments

Next up, we needed to expirement with image filters using Skicit-image and Pillow. We used Google Collabotary to experiment with filters in a shared document:

Below are two filters we expriemented with, explained step by step:

**Tint Filter using Skicit-Image**:

    from skimage.color import rgb2gray
    from skimage import filters, io, exposure
    from matplotlib import pyplot as plt

    image = 'https://images.unsplash.com/photo-1593720737821-ce72f91b3db8?    ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'


    color_space = 'pink' // select the filter you would like to apply


    // Turns the image into a 3D array of pixels. Takes the RGB  data from the array, make an average and turn it into a grayscale image.

    image = rgb2gray(io.imread(image))

    // Gaussian filter helps reduce noise and applies slight blurring to keep the image quality high

    edge = filters.gaussian(image, sigma=0.6)

    // Plot converts 3D array of pixels into an image a human can see and enjoy.

    fig, axes = plt.subplots(ncols=1, sharex=True, sharey=True, figsize=(12, 12))

    axes.imshow(edge, cmap=color_space) //Then apply filter, save figure  with a color space.

    axes.axis('off') // Remove the plot axis

    // Save it as a PNG

    output_filename = 'test'
    plt.savefig(f'{output_filename}.png', bbox_inches='tight', pad_inches =     0)
    im.save(f'{output_filename}.png')

Examples:

<img src="frontend/src/assets/tint.png" alt="tint filter" width="500px">

**Meme Filter using Pillow**:

    from PIL import Image, ImageDraw, ImageFilter, ImageFont
    import requests
    from io import BytesIO
    from skimage import io

    // get an image
    response = requests.get('https://imgflip.com/s/meme/Success-Kid.jpg')
    im = Image.open(BytesIO(response.content))
    base = im.convert('RGBA')

    // make a blank image for the text, initialized to transparent text color
    txt = Image.new('RGBA', base.size)

    // get a font
    msg_top="FINALLY REALIZED"
    msg_bottom="THIS KID IS EATING SAND"
    fnt_top = ImageFont.truetype('impact.ttf', 60)
    fnt_btm = ImageFont.truetype('impact.ttf', 40)

    // get a drawing context
    d = ImageDraw.Draw(txt)
    w, h = d.textsize(msg_top, font=fnt_top)
    w2, h2 = d.textsize(msg_bottom, font=fnt_btm)


    // draw text
    d.text(((base.size[0]-w)/2,base.size[1]*0.02), msg_top, font=fnt_top, fill=(255,255,255))
    d.text(((base.size[0]-w)/2,base.size[1]*0.82), msg_bottom, font=fnt_btm, fill=(255,255,255))

    // save image
    out = Image.alpha_composite(base, txt)
    out.save('meme.png')

<img src="frontend/src/assets/meme.png" alt="meme filter" width="500px">

The **Artist Brush** filter was made using scikit-image image segmentation and smoothing function:

<img src="frontend/src/assets/brush.png" alt="artist brush filter" width="500px">

## App Layout

We had a simple 3-page layout for when user Uploads Image, plays around with filters and then saves it.

<img src="frontend/src/assets/miro.png" alt="Miro" width="600px">

Our **MVP** was to ensure our there was smooth exchange of image data between the frontend and the backend. If we were able to reach that goal quickly, we would add CSS filters.

## Backend

On the backend we have two models: Image and User. We created the user model as we intended to add login features, however we later decided that this will be added in the future.

### Image model, view, urls
We have two models: Image and Filter. 

The Filter model was created to create the database of filter options from the seeds file.

The Image Model was the main model towards applying filters and returning the b64 back to the frontend. We send the width and height from the frontend as well, so images are returned with the exact dimensions:
    
    class Image(models.Model):
        url = models.TextField()
        filter_type = models.CharField(
            max_length=10, null=True, validators=[validate_filter])
        filter_options = models.CharField(max_length=200, null=True)
        width = models.IntegerField(null =True)
        height = models.IntegerField(null = True)
    
        def __str__(self):
            return f'{self.url}'
    


The views.py and urls.py has 3 main requests: 

* path '': GET to see all Images Uploaded, POST to upload a new image and get a URL/B64 in response
* path'<int:pk>/': GET a single Image
* path'thumbnails/': GET a list of thumbnails


Image POST request:

<img src="frontend/src/assets/viewspy.png" alt="Views flowchart">

Thumbnails GET Request:

<img src="frontend/src/assets/thumbnails.png" alt="thumbnails flowchart" width= "800px">

For example, for the tint filter:

    def get_sketch_thumbs(img, page):

    thumb_dictionaries = []

    page_index_start = (page - 1) * 10

    sketch_options = Filter.objects.filter(related_filter='sketch')[
        page_index_start:page_index_start + 10]

    for color in sketch_options:
        file_name = sketch(img, color.filter_option, thumbnail=True)
        encoded_image = str(base64.b64encode(
            open(f'{file_name}.png', 'rb').read()))[2:-1]
        thumb_dictionaries.append(
            {'option': color.filter_option, 'image': f'data:image/png;base64,{encoded_image}'})
        os.remove(f'{file_name}.png')
    return thumb_dictionaries

## Frontend

The Frontend was built using React Hooks and for this project, we began working on it at the same time as the backend. This way we could make tweaks to the Backend simultaneously, if needed. For example, we wouldn't have realised that we needed to send the width and height of the image to the Backend, if we hadn't seen the difference on the page.

We wanted the styling of Filtr to be extremely slick and as the last project, used a lot of condition rendering to update the "Edit page" instantly. Before and after images of styling:

<img src="frontend/src/assets/edit-before.png" alt="edit styling early" width="500px">
<img src="frontend/src/assets/edit.png" alt="edit styling final" width="600px">

We also used [Konva](https://konvajs.org/) to apply CSS filters and Emoji frop features. The below example is a great example of how we used Konva and conditional rendering on this page:

      <Stage width={width} height={height} ref={stageRef} id="stage">
        <Layer>
          <Image
            ref={imageRef}
            width={width}
            height={height}
            onMouseEnter={showOriginal} // Onhover to show image without filters
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

              // * Have to pass the Konva filters a function even if they are not used to surpress warnings in the console.
              
              liveEffect.sepiaActive && appliedEffect ? Filters.Sepia : function   () { },
              liveEffect.embossActive && appliedEffect ?Filters.Emboss  : function () { },
              liveEffect.grayscaleActive && appliedEffect ? Filters. Grayscale : function () { },
              liveEffect.invertActive && appliedEffect ? Filters.Invert : function () { }

            ]}

            // * Conditional rendering to set default filters when the image is reset

            blurRadius={appliedEffect ? liveEffect.defaultEffect.blur}
            brightness={appliedEffect ? liveEffect. brightdefaultEffect.brightness}
            contrast={appliedEffect ? liveEffect.contdefaultEffect. contrast}
            embossStrength={appliedEffect ? liveembossStrength : defaultEffect.embossStrength}
            enhance={appliedEffect ? liveEffect.enhdefaultEffect.enhance}
            hue={appliedEffect ? liveEffect.hue : defaulthue}
            saturation={appliedEffect ? liveEffect. saturadefaultEffect.saturation}
            luminance={appliedEffect ? liveEffect.lumindefaultEffect.luminance}
          />
          {images.map((image, i) => {
            return <URLImage key={i} image={image} />
          })}
          </Layer>
      </Stage>

## Challenges

**Learning about image-editing**: This is a massive topic on its own and one of the tools we used (skicit-image) is typically used by researchers and microscopists. For this reason there was a lot of trial and error of settings, documentation reading and stack overflow help that assisted us in getting the right filters.

**Image Size and quality**: This is something we had not considered during the intial plan -- and a good part of day three and four were spend on ensuring we don't compromise on the quality. The Gaussian filter helped reduce noice on the Tint filter, however we still haven't found the answer for Histogram filter.


## Wins

**TeamWork**: George and I worked extremely well for this project. His experience in Python and my passion for UX helped us make a well-functioning and beautiful product. We organised ourselves using a trello board with ideas split between "must do, should do and can do" for Front and Back end.

**Artist Brush, Meme Filter & CSS filters**: I'm particularly happy with how well these filters turned out. Artist brush is extremely creative + Meme and CSS Filters give quick and fun results!

**Styling**: I LOVE the styling for this website. Even though the little touches (like the filter animation on homepage) are time consuming -- It's satisfying and worth it to present a well-designed app!

## Future Improvements

**Histogram Filter**: Our histogram filter needs work as it's quality is completely dependent on the image uploaded by the user.

**User Login & Profile**: The backend for this is all ready, so we could easily make an instagram or pinterest like profile page.
