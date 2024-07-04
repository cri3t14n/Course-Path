# Generated by Django 5.0.6 on 2024-07-04 13:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course_info', '0003_rename_notappicablewith_courseinfo_notapplicablewith'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='courseinfo',
            name='recomendedPrerequisites',
        ),
        migrations.AddField(
            model_name='courseinfo',
            name='recommendedPrerequisites',
            field=models.ManyToManyField(blank=True, related_name='prerequisites', to='course_info.courseinfo'),
        ),
        migrations.RemoveField(
            model_name='courseinfo',
            name='notApplicableWith',
        ),
        migrations.AddField(
            model_name='courseinfo',
            name='notApplicableWith',
            field=models.ManyToManyField(blank=True, related_name='not_applicable_with', to='course_info.courseinfo'),
        ),
    ]
