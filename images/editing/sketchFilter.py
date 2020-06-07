from skimage.color import rgb2gray
from skimage import filters, io
from matplotlib import pyplot as plt
plt.switch_backend('Agg')

# The plot saves with a stupidly large whitespace around it so this function finds the color of the top left
# pixel and then removes this in rows and columns until it meets a pixel of a different color

def sketch(path, color, thumbnail=False):
    if thumbnail == True:
        size = (2, 2)
    else:
        size = (8, 8)

    image = rgb2gray(io.imread(path))
    edge = filters.sobel(image)

    fig, axes = plt.subplots(ncols=1, sharex=True, sharey=True, figsize=size)
    print(fig)
    axes.imshow(edge, cmap=color)

    axes.axis('off')

    if path[:4] == 'http':
        output_filename = path.split('/')[6]
    else:
        output_filename = path.strip('.png')

    plt.savefig(f'{output_filename}.png', bbox_inches='tight', pad_inches=0)

    return str(output_filename)
