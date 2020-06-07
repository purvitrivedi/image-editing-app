from PIL import Image, ImageChops
from skimage import io
from skimage.exposure import match_histograms
#import cloudinary



def histogram(path, ref, thumbnail=False):

    reference = io.imread(ref)
    image = io.imread(path)

    matched = match_histograms(image, reference, multichannel=True)

    im = Image.fromarray(matched)

    if thumbnail:
      im = im.resize((200, 200))

    if path[:4] == 'http':
      output_filename = path.split('/')[6]
    else:
      output_filename = path.strip('.png')

    im.save(f'{output_filename}.png')

    return output_filename
