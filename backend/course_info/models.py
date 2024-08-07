from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    degree = models.ForeignKey('DegreeRequirements', on_delete=models.SET_NULL, null=True)
    completed_courses = models.ManyToManyField('CourseInfo', related_name='completed_courses', symmetrical=False, blank=True)

    def __str__(self):
        return self.user.username
    
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

class CourseInfo(models.Model):
    courseNumber = models.CharField(max_length=10, primary_key=True)
    department = models.IntegerField()
    title = models.CharField(max_length=120)
    general_course_objectives = models.CharField(max_length=500)
    learing_objectives = models.CharField(max_length=500)
    content = models.CharField(max_length=500)
    teachers = models.CharField(max_length=100)
    language = models.CharField(max_length=15)
    courseType = models.CharField(max_length=10)
    schedule = models.CharField(max_length=500)
    location = models.CharField(max_length=50)
    credits = models.IntegerField()
    type_of_assessment = models.CharField(max_length=50)
    exam_duration = models.CharField(max_length=50)
    exam_aids = models.CharField(max_length=50)
    evaluation_type = models.CharField(max_length=50)
    course_responsible = models.CharField(max_length=50)
    notApplicableWith = models.ManyToManyField('self', related_name='not_applicable_with', symmetrical=False, blank=True)
    recommendedPrerequisites = models.ManyToManyField('self', related_name='prerequisites', symmetrical=False, blank=True)
    course_url = models.URLField(max_length=255)

    def __str__(self):
        return self.title
    
class DegreeRequirements(models.Model):
    degree_id = models.IntegerField(primary_key=True)
    degree_name = models.CharField(max_length=50)
    required_courses = models.ManyToManyField('CourseInfo', related_name='required_courses', symmetrical=False, blank=True)

    def __str__(self):
        return self.degree_name
    
class CoursePlan(models.Model):
    plan_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    degree_id = models.ForeignKey(DegreeRequirements, on_delete=models.CASCADE)
    elective_courses = models.ManyToManyField(CourseInfo, related_name='courses', symmetrical=False, blank=True)
    plan_name = models.CharField(max_length=50)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.user.username + ' ' + self.plan_name


    