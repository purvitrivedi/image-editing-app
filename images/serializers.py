from rest_framework import serializers
from .models import Image

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'

    #def create(self, validated_data):
        #return Image.objects.create(**validated_data)

class FilterSerializer(serializers.Serializer):

    url = serializers.CharField(max_length=200)
    filter = serializers.CharField(max_length=100)
    page = serializers.IntegerField()