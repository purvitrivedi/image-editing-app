from PIL import Image, ImageDraw, ImageFont
import requests
from io import BytesIO
import math
my_font = 'images/editing/impact.ttf'

output_filename = 'meme'

#! Be aware that this may work for other fonts but is designed only to work with Impact.

def get_visual_width(string, font_height):
  return len(string) * (font_height * 0.505)

def format_text(text, img_width):
  print('Format text Ran')
  string_len_px = get_visual_width(text, 60)
  
  if string_len_px >= img_width:
    split_string = text.split(' ')
    middle_position = math.floor(len(split_string) / 2)

    split_string.insert(middle_position, '\n')
    reformed_string = ' '.join(split_string)

    return reformed_string.upper()
  
  return text

def btm_text_position(text):
  if '\n' in text:
    return 0.78
  return 0.86


def meme(url, text):

    response = requests.get(url)
    im = Image.open(BytesIO(response.content))
    
    text = text.split('©π')

    # get an image
    base = im.convert('RGBA')

    # make a blank image for the text, initialized to transparent text color
    txt = Image.new('RGBA', base.size)

    # get a font
    msg_top = format_text(text[0], base.size[0])
    msg_bottom = format_text(text[1], base.size[0])

    fnt_top = ImageFont.truetype(my_font, 60)
    fnt_btm = ImageFont.truetype(my_font, 40)

    # get a drawing context
    d = ImageDraw.Draw(txt)
    
    w, h = d.textsize(msg_top, font=fnt_top)
    w2, h2 = d.textsize(msg_bottom, font=fnt_btm)

    d.text(((base.size[0]-w)/2, base.size[1] * 0.02), msg_top, font=fnt_top, fill=(255, 255, 255), align="center")
    d.text(((base.size[0]-w2)/2, base.size[1] * btm_text_position(msg_bottom)), msg_bottom, font=fnt_btm, fill=(255, 255, 255), align="center")

    final_image = Image.alpha_composite(base, txt)
    final_image.save(f'{output_filename}.png')
    return output_filename
