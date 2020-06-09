from matplotlib import pyplot as plt
from skimage import exposure
from skimage.exposure import match_histograms
from skimage import io
from skimage.color import rgbcie2rgb, rgb2gray, rgba2rgb
import numpy as np

def histogram(path, ref, thumbnail=False):



  reference = io.imread(ref)
  image = io.imread(path)

  if thumbnail == True:
      size = (1, 1)
  else:
      # size = (image.shape[0] / 200 * 1.6, image.shape[1] / 200 * 1.6)
      size = (8, 8)
  # The match_histograms function needs an identical number of channels in each pixel to work.
  # this checks whether the image is RGBA and converts to RGB if it is
  print(image.shape)
  if image.shape[2] == 4:
    image = rgba2rgb(image)

  if reference.shape[2] == 4:
    reference = rgba2rgb(reference)
  

  matched = match_histograms(image, reference, multichannel=True)

  fig, axes = plt.subplots(nrows=1, ncols=1, figsize=size, dpi=200, sharex=True, sharey=True)
  axes.set_axis_off()
  print(fig.get_size_inches()*fig.dpi)
  axes.imshow(matched.astype('uint8'))

  plt.tight_layout()

  if path[:4] == 'http':
      output_filename = path.split('/')[6]
  else:
      output_filename = path.strip('.png')
  print('hist ran ok')
  plt.savefig(f'{output_filename}.png', bbox_inches='tight', pad_inches=0)
  return output_filename