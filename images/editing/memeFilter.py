from PIL import Image, ImageDraw, ImageFont
import requests
from io import BytesIO
my_font = 'images/editing/impact.ttf'

output_filename = 'meme'


def meme(url, text):
    response = requests.get(url)
    im = Image.open(BytesIO(response.content))
    
    text = text.split('©π')
    # get an image
    base = im.convert('RGBA')

    # make a blank image for the text, initialized to transparent text color
    txt = Image.new('RGBA', base.size)

    # get a font
    msg_top = text[0]
    msg_bottom = text[1]

    fnt_top = ImageFont.truetype(my_font, 60)
    fnt_btm = ImageFont.truetype(my_font, 40)

    # get a drawing context
    d = ImageDraw.Draw(txt)
    w, h = d.textsize(msg_top, font=fnt_top)
    w2, h2 = d.textsize(msg_bottom, font=fnt_btm)

    d.text(((base.size[0]-w)/2, base.size[1]*0.02),
        msg_top, font=fnt_top, fill=(255, 255, 255))
    d.text(((base.size[0]-w2)/2, base.size[1]*0.82),
        msg_bottom, font=fnt_btm, fill=(255, 255, 255))

    final_image = Image.alpha_composite(base, txt)
    final_image.save(f'{output_filename}.png')
    return output_filename


