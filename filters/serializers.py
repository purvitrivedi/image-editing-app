from rest_framework import serializers
from .models import Filter

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filter
        fields = '__all__'