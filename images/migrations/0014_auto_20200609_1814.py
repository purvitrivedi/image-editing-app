# Generated by Django 3.0.7 on 2020-06-09 18:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('images', '0013_auto_20200608_1627'),
    ]

    operations = [
        migrations.AddField(
            model_name='image',
            name='height',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='image',
            name='width',
            field=models.IntegerField(null=True),
        ),
    ]