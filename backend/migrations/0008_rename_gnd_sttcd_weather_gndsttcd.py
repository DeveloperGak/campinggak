# Generated by Django 4.0.2 on 2022-02-14 07:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0007_rename_clfm_abbrcd_weather_clfmabbrcd_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='weather',
            old_name='gnd_sttCd',
            new_name='gndsttCd',
        ),
    ]