from django.db import models

class Image(models.Model):
  url = models.CharField(max_length=120)
  filter_type = models.CharField(max_length=10, null=True)
  filter_options = models.CharField(max_length=120, null=True)
  # save = models.BooleanField(default=True)

  def __str__(self):
    return f'{self.url}'
    