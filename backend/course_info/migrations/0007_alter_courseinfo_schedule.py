# Generated by Django 5.0.6 on 2024-07-04 23:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course_info', '0006_alter_courseinfo_coursenumber'),
    ]

    operations = [
        migrations.AlterField(
            model_name='courseinfo',
            name='schedule',
            field=models.CharField(max_length=500),
        ),
    ]
