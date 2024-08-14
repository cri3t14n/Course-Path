from django.contrib import admin
from .models import Profile, CoursePlan, Semester, ScheduleCourse

# Register your models here.
admin.site.register(Profile)
admin.site.register(CoursePlan)
admin.site.register(Semester)
admin.site.register(ScheduleCourse)