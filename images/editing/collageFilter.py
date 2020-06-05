
import matplotlib.pyplot as plt
from skimage import io, segmentation, color


def collage(url, segments):

  img = io.imread(url)

  labels1 = segmentation.slic(img, compactness=30, n_segments=int(segments))
  out1 = color.label2rgb(labels1, img, kind='avg', bg_label=0)

  fig, ax = plt.subplots(nrows=1, sharex=True, sharey=True, figsize=(8, 8))
  print(fig)
  ax.imshow(out1)
  ax.axis('off')

  output_filename = url.split('/')[6]

  plt.tight_layout()
  plt.savefig(f'{output_filename}.png', bbox_inches='tight', pad_inches = 0)

  return output_filename