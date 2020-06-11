import base64
import requests
import os


def encode(string):
    print('In Encoder')
    print(string)
    # Returns a string of base 64 characters of the image passed to it. This can be a URL or a filepath.
    # If it's a filepath the file will be deleted once the conversion is complete
    if string[0:4] == 'http':
        encoded_image = str(base64.b64encode(
            requests.get(string).content))[2:-1]
    else:
        encoded_image = str(base64.b64encode(
            open(f'{string}.png', 'rb').read()))[2:-1]
        os.remove(f'{string}.png')
    return f'data:image/png;base64,{encoded_image}'
