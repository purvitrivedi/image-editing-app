# pylint: disable=no-member,
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from django.core.exceptions import ValidationError

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

        try:
            if new_image.is_valid():
                new_image.save()
                image_filtered = router(new_image.data.get('url'),  new_image.data.get(
                    'filter_type'), new_image.data.get('filter_options'))
                encoded_image = encode(image_filtered)

                return Response({'id': new_image.data.get('id'),'image': encoded_image, 'url': new_image.data.get('url')}, status=status.HTTP_201_CREATED)
            return Response(new_image.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        except ValueError:
            value = new_image.data.get('filter_options')
            return Response({'Message': f'{value} Is not a valid option'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class ImageDetailView(APIView):

    def get_image(self, pk):
        try:
            return Image.objects.get(pk=pk)
        except Image.DoesNotExist:
            raise NotFound()

    def get(self, _request, pk):
        image = self.get_image(pk)
        serialized_image = ImageSerializer(image) 
        return Response(serialized_image.data)

