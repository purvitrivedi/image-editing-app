import requests
import numpy as np
import base64
import urllib
from PIL import Image, ImageChops
import matplotlib.pyplot as plt

from skimage import io
from skimage.exposure import match_histograms
from skimage import filters, segmentation, color
from skimage.util import compare_images
from skimage.color import rgb2gray

output_filename = 'histogramTest'


def histogram(url, reference):
    reference = io.imread(reference)
    image = io.imread(url)

    matched = match_histograms(image, reference, multichannel=True)

    im = Image.fromarray(matched)

    im.save(f'{output_filename}.png')

    return output_filename
