# pylint: disable=no-member,
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

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
      return Response(new_image.data, status=status.HTTP_201_CREATED)
    return Response(new_image.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)