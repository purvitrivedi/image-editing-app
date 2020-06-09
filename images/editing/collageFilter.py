import matplotlib.pyplot as plt
from skimage import io, segmentation, color
from rest_framework.response import Response
from rest_framework import status


def collage(url, type, thumbnail=False):

    img = io.imread(url)
    if type == 'gouache':
        labels1 = segmentation.slic(
            img, n_segments=1000, compactness=5, sigma=1, start_label=1)
    elif type == 'oil':
        labels1 = segmentation.slic(
            img, n_segments=2000, compactness=1, sigma=4, start_label=1)
    elif type == 'blur':
        labels1 = segmentation.slic(
            img, n_segments=3000, compactness=1, sigma=8, start_label=1)
    elif type == 'print':
        labels1 = segmentation.slic(
            img, n_segments=10, compactness=30, sigma=10, start_label=1)
    elif type == 'pixel':
        labels1 = segmentation.slic(
            img, n_segments=2000, compactness=10, sigma=8, start_label=1)
    else:
        return None

    if thumbnail:
        size = (2, 2)
    else:
        # size = (img.shape[0] / 200 * 1.6, img.shape[1] / 200 * 1.6)
        size = (8, 8)

    out1 = color.label2rgb(labels1, img, kind='avg', bg_label=0)

    fig, ax = plt.subplots(nrows=1, sharex=True, sharey=True, figsize=size)
    print(fig)
    ax.imshow(out1)
    ax.axis('off')

    output_filename = url.split('/')[6]

    plt.tight_layout()
    plt.savefig(f'{output_filename}.png', bbox_inches='tight', pad_inches=0)

    return output_filename
