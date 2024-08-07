from django.contrib import admin
from .models import CourseInfo, DegreeRequirements, CoursePlan, Profile

class CourseInfoAdmin(admin.ModelAdmin):
    list_display = ('courseNumber', 'title', 'language')

# Register your models here.

admin.site.register(CourseInfo, CourseInfoAdmin)
admin.site.register(Profile)
admin.site.register(DegreeRequirements)
admin.site.register(CoursePlan)
