from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework import status
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt

from .serializers import UserSerializer

User = get_user_model()


class RegisterView(APIView):

    def post(self, request):
        created_user = UserSerializer(data=request.data)
        if created_user.is_valid():
            created_user.save()
            dt = datetime.now() + timedelta(days=7)
            token = jwt.encode({
                'sub': created_user.data.get('id'),
                'exp': int(dt.strftime('%s'))
        }, settings.SECRET_KEY)
            print(created_user.data.get('id'))
            return Response({'message': 'Registration Succesful', 'token': token}, status=status.HTTP_201_CREATED)
        return Response(created_user.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class LoginView(APIView):

    def get_user(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied()

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = self.get_user(email)
        if not user.check_password(password):
            raise PermissionDenied()
        dt = datetime.now() + timedelta(days=7)
        token = jwt.encode({
            'sub': user.id,
            'exp': int(dt.strftime('%s'))
        }, settings.SECRET_KEY)
        return Response({'token': token, 'message': f'Welcome back {user.username}'})
