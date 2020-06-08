# from PIL import Image, ImageChops
# from skimage import io
# from skimage.exposure import match_histograms
# from skimage.color import rgbcie2rgb, rgb2gray, rgba2rgb
# from matplotlib import pyplot as plt
# # import cloudinary

# # cloudinary.config(cloud_name = "jompra")


# def histogram(path, ref, thumbnail=False):

#     print(path)
#     print(ref)
#     reference = io.imread(ref)
#     image = io.imread(path)
#     reference = rgba2rgb(reference)
#     image = rgba2rgb(image)
#     print(reference[0][0])
#     print(image[0][0])


#     matched = match_histograms(image, reference, multichannel=True)
#     print(matched)

#     #print(mapped_match)
#     im = Image.fromarray(matched)

#     #if thumbnail:
#       #im = im.resize((200, 200))

#     if path[:4] == 'http':
#       output_filename = path.split('/')[6]
#     else:
#       output_filename = path.strip('.png')

#     im.save(f'{output_filename}.png')

#     return output_filename

from matplotlib import pyplot as plt
from skimage import exposure
from skimage.exposure import match_histograms
from skimage import io
from skimage.color import rgbcie2rgb, rgb2gray, rgba2rgb
import numpy as np

def histogram(path, ref, thumbnail=False):

  if thumbnail == True:
      size = (2, 2)
  else:
      size = (8, 8)

  reference = io.imread(ref)
  image = io.imread(path)

  # The match_histograms function needs an identical number of channels in each pixel to work.
  # this checks whether the image is RGBA and converts to RGB if it is

  if image.shape[2] == 4:
    image = rgba2rgb(image)

  if reference.shape[2] == 4:
    reference = rgba2rgb(reference)
  

  matched = match_histograms(image, reference, multichannel=True)

  fig, axes = plt.subplots(nrows=1, ncols=1, figsize=size, sharex=True, sharey=True)
  axes.set_axis_off()

  axes.imshow(matched.astype('uint8'))

  plt.tight_layout()

  if path[:4] == 'http':
      output_filename = path.split('/')[6]
  else:
      output_filename = path.strip('.png')
  print('hist ran ok')
  plt.savefig(f'{output_filename}.png', bbox_inches='tight', pad_inches=0)
  return output_filename