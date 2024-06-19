# Generated by Django 5.0.6 on 2024-06-19 17:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course_info', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='courseinfo',
            name='description',
        ),
        migrations.AddField(
            model_name='courseinfo',
            name='course_url',
            field=models.URLField(default='google.com', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='courseinfo',
            name='department',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='courseinfo',
            name='notAppicableWith',
            field=models.CharField(default='none', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='courseinfo',
            name='recomendedPrerequisites',
            field=models.CharField(default='none', max_length=255),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='courseinfo',
            name='courseNumber',
            field=models.CharField(max_length=7, primary_key=True, serialize=False),
        ),
    ]
