import base64
import requests


def encode(string):
  print(type(string))
  if string[0:4] == 'http':
    encoded_image = str(base64.b64encode(requests.get(string).content))[2:-1]
  else:
    encoded_image = str(base64.b64encode(open(f'{string}.png', 'rb').read()))[2:-1]
  return f'data:image/png;base64,{encoded_image}'
