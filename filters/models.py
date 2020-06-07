from django.db import models


# Create your models here.
class Filter(models.Model):
  filter_option = models.CharField(max_length=20)
  
  def __str__(self):
    return f'{self.filter_option}'