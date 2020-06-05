# pylint: disable=no-member,
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound


from .editing.filterRouter import router
from .editing.sketchFilter import sketch
from .editing.base64 import encode
from .models import Image
from .serializers import ImageSerializer

class ImageListView(APIView):
  def get(self, _request):
    images = Image.objects.all()
    serialized_images = ImageSerializer(images, many=True)
    return Response(serialized_images.data, status=status.HTTP_200_OK)

  def post(self, request):
    new_image = ImageSerializer(data=request.data)
    
    if new_image.is_valid():

      new_image.save()
      
      image_filtered = router(new_image.data.get('url'),  new_image.data.get('filter_type'), new_image.data.get('filter_options'))

      encoded_image = encode(image_filtered)

      return Response({'image': encoded_image, 'url': new_image.data.get('url') }, status=status.HTTP_201_CREATED)
    return Response(new_image.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)



    # 'https://res.cloudinary.com/jompra/image/upload/v1590680086/kilpipiilea_mufvhi.jpg'
    # 'https://res.cloudinary.com/jompra/image/upload/v1590684847/IMG_0316_uvhoyz.png'
