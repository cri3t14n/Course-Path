from django.db import models

class CourseInfo(models.Model):
    courseNumber = models.CharField(max_length=7, primary_key=True)
    title = models.CharField(max_length=120)
    language = models.CharField(max_length=15)
    courseType = models.CharField(max_length=10)
    schedule = models.CharField(max_length=255)
    # notAppicableWith = 
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title
