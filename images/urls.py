from django.urls import path
from .views import ImageListView, ImageDetailView, ThumbnailView

urlpatterns = [
    path('', ImageListView.as_view()),
    path('thumbnails/', ThumbnailView.as_view()),
    path('<int:pk>/', ImageDetailView.as_view()),
]