from PIL import Image
import requests
from io import BytesIO
from .editing.sketchFilter import sketch
from .editing.histogramFilter import histogram
import base64
import os


def get_thumbs(img, filter, page):

  resize_image(img)
  if filter == 'sketch':
    result = get_sketch_thumbs(img, page)
  elif filter == 'histogram':
    result = get_histogram_thumbs(img, page)
  elif filter == 'collage':
    result = get_collage_thumbs(img, page)
  return result

def resize_image(url):
  print('resize ran')
  filename = url.split('/')[6]
  response = requests.get(url)
  img = Image.open(BytesIO(response.content))
  img = img.resize((200, 200))
  img.save(f'{filename}.png')


def get_sketch_thumbs(img, page):
  thumb_dictionaries = []

  for color in sketch_options[page -1]:
    file_name = sketch(img, color, thumbnail=True)
    encoded_image = str(base64.b64encode(open(f'{file_name}.png', 'rb').read()))[2:-1]
    thumb_dictionaries.append({'color': color, 'image': f'data:image/png;base64,{encoded_image}'})
    os.remove(f'{file_name}.png')
  return thumb_dictionaries

def get_histogram_thumbs(img, page):
  thumb_dictionaries = []

  for reference in histogram_options[page -1]:
    file_name = histogram(img, reference, thumbnail=True)
    encoded_image = str(base64.b64encode(open(f'{file_name}.png', 'rb').read()))[2:-1]
    thumb_dictionaries.append({'reference': reference, 'image': f'data:image/png;base64,{encoded_image}'})
    os.remove(f'{file_name}.png')
  return thumb_dictionaries

def get_collage_thumbs(img, page):
  return {'message': 'ran get collage thumbnails, but it doesn\'t do anything yet'}


sketch_options = [['Accent', 'Accent_r', 'Blues', 'Blues_r', 'BrBG', 'BrBG_r', 'BuGn', 'BuGn_r', 'BuPu', 'BuPu_r'], 
  ['CMRmap', 'CMRmap_r', 'Dark2', 'Dark2_r', 'GnBu', 'GnBu_r', 'Greens', 'Greens_r', 'Greys', 'Greys_r'],
  ['OrRd', 'OrRd_r', 'Oranges', 'Oranges_r', 'PRGn', 'PRGn_r', 'Paired', 'Paired_r', 'Pastel1', 'Pastel1_r'],
  ['Pastel2', 'Pastel2_r', 'PiYG', 'PiYG_r', 'PuBu', 'PuBuGn', 'PuBuGn_r', 'PuBu_r', 'PuOr', 'PuOr_r'],
  ['PuRd', 'PuRd_r', 'Purples', 'Purples_r', 'RdBu', 'RdBu_r', 'RdGy', 'RdGy_r', 'RdPu', 'RdPu_r'],
  ['RdYlBu', 'RdYlBu_r', 'RdYlGn', 'RdYlGn_r', 'Reds', 'Reds_r', 'Set1', 'Set1_r', 'Set2', 'Set2_r'],
  ['Set3', 'Set3_r', 'Spectral', 'Spectral_r', 'Wistia', 'Wistia_r', 'YlGn', 'YlGnBu', 'YlGnBu_r', 'YlGn_r'],
  ['YlOrBr', 'YlOrBr_r', 'YlOrRd', 'YlOrRd_r', 'afmhot', 'afmhot_r', 'autumn', 'autumn_r', 'binary', 'binary_r'],
  ['bone', 'bone_r', 'brg', 'brg_r', 'bwr', 'bwr_r', 'cividis', 'cividis_r', 'cool', 'cool_r'],
  ['coolwarm', 'coolwarm_r', 'copper', 'copper_r', 'cubehelix', 'cubehelix_r', 'flag', 'flag_r', 'gist_earth', 'gist_earth_r'],
  ['gist_gray', 'gist_gray_r', 'gist_heat', 'gist_heat_r', 'gist_ncar', 'gist_ncar_r', 'gist_rainbow', 'gist_rainbow_r', 'gist_stern', 'gist_stern_r'],
  ['gist_yarg', 'gist_yarg_r', 'gnuplot', 'gnuplot2', 'gnuplot2_r', 'gnuplot_r', 'gray', 'gray_r', 'hot', 'hot_r'],
  ['hsv', 'hsv_r', 'inferno', 'inferno_r', 'jet', 'jet_r', 'magma', 'magma_r', 'nipy_spectral', 'nipy_spectral_r'],
  ['ocean', 'ocean_r', 'pink', 'pink_r', 'plasma', 'plasma_r', 'prism', 'prism_r', 'rainbow', 'rainbow_r'],
  ['seismic', 'seismic_r', 'spring', 'spring_r', 'summer', 'summer_r', 'tab10', 'tab10_r', 'tab20', 'tab20_r'],
  ['tab20b', 'tab20b_r', 'tab20c', 'tab20c_r', 'terrain', 'terrain_r', 'twilight', 'twilight_r', 'twilight_shifted', 'twilight_shifted_r'],
  ['viridis', 'viridis_r', 'winter', 'winter_r']]

histogram_options = [
    ['https://res.cloudinary.com/jompra/image/upload/v1591533411/ImageEditor/Histogram-references/bright-pinks.jpg',
    'https://res.cloudinary.com/jompra/image/upload/v1591533367/ImageEditor/Histogram-references/mint-humbug.jpg',
    'https://res.cloudinary.com/jompra/image/upload/v1591533277/ImageEditor/Histogram-references/sunset.jpg',
    'https://res.cloudinary.com/jompra/image/upload/v1591533251/ImageEditor/Histogram-references/beige-tone.jpg',
    'https://res.cloudinary.com/jompra/image/upload/v1591533218/ImageEditor/Histogram-references/summer-sand.jpg',],
    ['https://res.cloudinary.com/jompra/image/upload/v1591533192/ImageEditor/Histogram-references/dusk-blue.jpg',
    'https://res.cloudinary.com/jompra/image/upload/v1591533152/ImageEditor/Histogram-references/autumn-road.jpg',
    'https://res.cloudinary.com/jompra/image/upload/v1591533078/ImageEditor/Histogram-references/indoor-nature.jpg',
    'https://res.cloudinary.com/jompra/image/upload/v1591533051/ImageEditor/Histogram-references/yellow.jpg',
    'https://res.cloudinary.com/jompra/image/upload/v1591533017/ImageEditor/Histogram-references/rose-petal.jpg'],
    ['https://res.cloudinary.com/jompra/image/upload/v1591532979/ImageEditor/Histogram-references/bright-home.jpg',
    'https://res.cloudinary.com/jompra/image/upload/v1591532945/ImageEditor/Histogram-references/abstract-orange.jpg',
    'https://res.cloudinary.com/jompra/image/upload/v1591532919/ImageEditor/Histogram-references/moth.jpg',
    'https://res.cloudinary.com/jompra/image/upload/v1591529780/ImageEditor/Histogram-references/skintones.jpg',
    'https://res.cloudinary.com/jompra/image/upload/v1591529671/ImageEditor/Histogram-references/wild-bird.jpg',],
    ['https://res.cloudinary.com/jompra/image/upload/v1591529587/ImageEditor/Histogram-references/Surf.jpg',
    'https://res.cloudinary.com/jompra/image/upload/v1591528916/ImageEditor/Histogram-references/Scales.jpg',
    'https://res.cloudinary.com/jompra/image/upload/v1591528623/ImageEditor/Histogram-references/bright.jpg',
    'https://res.cloudinary.com/jompra/image/upload/v1591527842/ImageEditor/Histogram-references/midnight.jpg',
    'https://res.cloudinary.com/jompra/image/upload/v1591366065/ImageEditor/Histogram-references/deep-reds.jpg']]