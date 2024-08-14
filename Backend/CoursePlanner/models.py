from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from GeneralData.models import Course, Degree
from Accounts.models import Profile


    
class CoursePlan(models.Model):
    plan_id = models.AutoField(primary_key=True)
    degree_id = models.ForeignKey(Degree, on_delete=models.SET_NULL, null=True)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    elective_courses = models.ManyToManyField(Course, related_name='course_plans', blank=True)

    
class Semester(models.Model):
    semester_id = models.AutoField(primary_key=True)
    plan_id = models.ForeignKey(CoursePlan, on_delete=models.CASCADE, related_name='semesters')
    semester_date = models.CharField(max_length=20)


    

class ScheduleCourse(models.Model):
    id = models.AutoField(primary_key=True)
    semester_id = models.ForeignKey(Semester, on_delete=models.CASCADE, related_name='scheduled_courses')
    is_taken = models.BooleanField(default=False)
    grade = models.IntegerField(null=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='dtu_courses')

    


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()