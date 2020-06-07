from PIL import Image
import requests
from io import BytesIO
from .editing.sketchFilter import sketch
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
  return {'message': 'ran get histogram thumbnails, but it doesn\'t do anything yet'}

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
