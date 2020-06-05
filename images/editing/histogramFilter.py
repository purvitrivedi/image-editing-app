from PIL import Image, ImageChops
from skimage import io
from skimage.exposure import match_histograms

output_filename = 'histogramTest'


def histogram(url, reference):
    reference = io.imread(reference)
    image = io.imread(url)

    matched = match_histograms(image, reference, multichannel=True)

    im = Image.fromarray(matched)

    im.save(f'{output_filename}.png')

    return output_filename
