import base64
import requests


def encode(url):
  
  encoded_image = str(base64.b64encode(requests.get(url).content))[2:-1]
  
  return f'data:image/png;base64,{encoded_image}'