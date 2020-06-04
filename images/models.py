from django.db import models

class Image(models.Model):
  url = models.CharField(max_length=120)
  
  def __str__(self):
    return f'{self.url}'
