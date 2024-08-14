from django.db import models

# Create your models here.
class Course(models.Model):
    course_number = models.CharField(max_length=10, primary_key=True)
    department = models.CharField(max_length=10)
    title = models.CharField(max_length=120)
    course_objectives = models.CharField(max_length=500)
    learning_objectives = models.CharField(max_length=500)
    content = models.CharField(max_length=500)
    teachers = models.CharField(max_length=100)
    course_responsible = models.CharField(max_length=50)
    language = models.CharField(max_length=15)
    course_type = models.CharField(max_length=10)
    schedule = models.CharField(max_length=500)
    location = models.CharField(max_length=50)
    credits = models.IntegerField()
    type_of_assessment = models.CharField(max_length=50)
    exam_aid = models.CharField(max_length=50)
    exam_duration = models.CharField(max_length=50)
    evaluation_type = models.CharField(max_length=50)
    course_url = models.URLField(max_length=255)
    not_applicable_with = models.ManyToManyField('Course', symmetrical=False, blank=True, related_name='not_applicable_reverse')
    recommended_prerequisites = models.ManyToManyField('Course', related_name='recommended_prerequisites_reverse', symmetrical=False, blank=True)


class Degree(models.Model):
    degree_id = models.AutoField(primary_key=True)
    degree_name = models.CharField(max_length=50)
    required_courses = models.ManyToManyField('Course', related_name='required_courses', symmetrical=False, blank=True)