from .sketchFilter import sketch
from .histogramFilter import histogram
from .collageFilter import collage


def router(url, filter_type=None, filter_options=None):
  if filter_type == 'sketch':
    print('Routed Request to Sketch Filter')
    return sketch(url, filter_options)
  if filter_type == 'histogram':
    print('Routed Request to Histogram Filter')
    return histogram(url, filter_options)
  if filter_type == 'collage':
    print('Routed Request to collage Filter')
    return collage(url, filter_options)

  return url

