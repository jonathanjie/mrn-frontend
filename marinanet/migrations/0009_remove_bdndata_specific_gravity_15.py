# Generated by Django 4.1.1 on 2023-01-14 07:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("marinanet", "0008_voyagelegdata_revolution_count_standby_to_cosp_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="bdndata",
            name="specific_gravity_15",
        ),
    ]