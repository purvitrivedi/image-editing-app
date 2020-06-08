#pylint: disable=no-member
from PIL import Image
import requests
from io import BytesIO
from .editing.sketchFilter import sketch
from .editing.histogramFilter import histogram
from .editing.collageFilter import collage
from .models import Filter
import base64
import os

# * Remember that there's a difference between the Filter method and an image filter


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

#* Wrote this after two glasses of wine so probably needs refactoring
def encode_and_make_dict(file_name, query_item):
  thumb_dictionaries = []

  encoded_image = str(base64.b64encode(open(f'{file_name}.png', 'rb').read()))[2:-1]

  thumb_dictionaries.append({'option': query_item.filter_option, 'image': f'data:image/png;base64,{encoded_image}'})


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


def get_histogram_thumbs(img, page):
    print('in histogram thumbs')
    thumb_dictionaries = []

    page_index_start = (page - 1) * 10

    histogram_options = Filter.objects.filter(related_filter='histogram')[
        page_index_start:page_index_start + 10]

    for reference in histogram_options:
        file_name = histogram(img, reference.filter_option, thumbnail=True)
        encoded_image = str(base64.b64encode(
            open(f'{file_name}.png', 'rb').read()))[2:-1]
        thumb_dictionaries.append(
            {'option': reference.filter_option, 'image': f'data:image/png;base64,{encoded_image}'})
        os.remove(f'{file_name}.png')
    return thumb_dictionaries

    for reference in histogram_options:
      file_name = histogram(img, reference.filter_option, thumbnail=True)
      encoded_image = str(base64.b64encode(open(f'{file_name}.png', 'rb').read()))[2:-1]
      thumb_dictionaries.append({'option': reference.filter_option, 'image': f'data:image/png;base64,{encoded_image}'})
      os.remove(f'{file_name}.png')
    return thumb_dictionaries

def get_collage_thumbs(img, page):
    thumb_dictionaries = []

    collage_options = Filter.objects.filter(related_filter='collage')

    for option in collage_options:
        file_name = collage(img, option.filter_option, thumbnail=True)
        encoded_image = str(base64.b64encode(
            open(f'{file_name}.png', 'rb').read()))[2:-1]
        thumb_dictionaries.append(
            {'option': option.filter_option, 'image': f'data:image/png;base64,{encoded_image}'})
        os.remove(f'{file_name}.png')
    return thumb_dictionaries
