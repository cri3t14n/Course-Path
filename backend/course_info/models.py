from django.db import models

class CourseInfo(models.Model):
    courseNumber = models.CharField(max_length=7, primary_key=True)
    department = models.IntegerField()
    title = models.CharField(max_length=120)
    language = models.CharField(max_length=15)
    courseType = models.CharField(max_length=10)
    schedule = models.CharField(max_length=255)
    notApplicableWith = models.CharField(max_length=255)
    recomendedPrerequisites = models.CharField(max_length=255)
    course_url = models.URLField(max_length=255)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title
