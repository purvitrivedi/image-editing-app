from skimage.color import rgb2gray
from skimage import filters, io, exposure
from matplotlib import pyplot as plt
plt.switch_backend('Agg')

# The plot saves with a stupidly large whitespace around it so this function finds the color of the top left
# pixel and then removes this in rows and columns until it meets a pixel of a different color


def sketch(path, type, thumbnail=False):
    print(type)
    image = rgb2gray(io.imread(path))
    
    if thumbnail == True:
        size = (2, 2)
    else:
        # size = (image.shape[0] / 200 * 1.6, image.shape[1] / 200 * 1.6)
        size = (8, 8)

    

    if type == 'pencil':
        edge = filters.sobel(image)
        color = 'gist_gray_r'
    elif type == 'grey':
        edge = filters.meijering(image)
        color = 'Greys'
    elif type == 'twilight':
        edge = filters.sobel(image)
        color = 'twilight'
    elif type == 'mono':
        edge = filters.gaussian(image, sigma=0.4)
        color = 'gist_gray'
    else:
        edge = filters.gaussian(image, sigma=0.4)
        color = type

    fig, axes = plt.subplots(ncols=1, sharex=True, sharey=True, figsize=size)
    axes.imshow(edge, cmap=color)

    axes.axis('off')

    if path[:4] == 'http':
        output_filename = path.split('/')[6]
    else:
        output_filename = path.strip('.png')

    plt.savefig(f'{output_filename}.png', bbox_inches='tight', pad_inches=0)
    return str(output_filename)
