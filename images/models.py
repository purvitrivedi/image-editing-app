from django.db import models
from django.core.exceptions import ValidationError

def validate_filter(value):
  accepted_filters = ['none', 'sketch', 'histogram', 'collage']
  if value not in accepted_filters:
    raise ValidationError(('%(value)s is not an accepted filter'), params={'value': value},)

class Image(models.Model):
  url = models.CharField(max_length=120)
  filter_type = models.CharField(max_length=10, null=True, validators=[validate_filter])
  filter_options = models.CharField(max_length=120, null=True)
  # save = models.BooleanField(default=True)

  def __str__(self):
    return f'{self.url}'
    