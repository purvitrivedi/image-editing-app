from django.urls import path
from .views import ImageListView, ImageDetailView

urlpatterns = [
    path('', ImageListView.as_view()),
    path('<int:pk>/', ImageDetailView.as_view()),
]