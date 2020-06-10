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
from .serializers import ImageSerializer, FilterSerializer
from .thumbnails import get_thumbs


class ImageListView(APIView):
    def get(self, _request):
        images = Image.objects.all()
        serialized_images = ImageSerializer(images, many=True)
        return Response(serialized_images.data, status=status.HTTP_200_OK)

    def post(self, request):
        new_image = ImageSerializer(data=request.data)
        

        try:
            if new_image.is_valid():
                if Image.objects.filter(url = new_image.validated_data.get('url')).count() == 0:
                  new_image.save()
                image_filtered = router(new_image.data.get('url'),  new_image.data.get(
                    'filter_type'), new_image.data.get('filter_options'))
                print(image_filtered)
                if image_filtered == None:
                    raise ValueError
                encoded_image = encode(image_filtered)
                result = Image.objects.filter(url = new_image.data.get('url'))
                
                for res in result:
                  result_id = res.id
                  result_width = res.width
                  result_height = res.height

                return Response({'id': result_id, 'image': encoded_image, 'url': new_image.data.get('url'), 'width': result_width, 'height': result_height}, status=status.HTTP_201_CREATED)
            return Response(new_image.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        except ValueError:
            value = new_image.data.get('filter_options')
            return Response({'Message': f'{value} Is not a valid option'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        except IndexError:
            return Response({'Message': 'filter_options must contain characters ©π'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        except FileNotFoundError:
            value = new_image.data.get('filter_options')
            return Response({'Message': f'{value} Is not a valid reference image'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


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


class ThumbnailView(APIView):

    def post(self, request):
        print('ran in views')
        thumb_img = FilterSerializer(data=request.data)
        try:
            if thumb_img.is_valid():
                thumbs = get_thumbs(thumb_img.data.get('url'), thumb_img.data.get(
                    'filter'), thumb_img.data.get('page'))
            return Response(thumbs, status=status.HTTP_200_OK)
        except IndexError:
            return Response({'Message': 'Out Of Range'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except UnboundLocalError:
            return Response({'Message': 'No Such FIlter'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
