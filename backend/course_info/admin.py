from django.contrib import admin
from .models import CourseInfo

class CourseInfoAdmin(admin.ModelAdmin):
    list_display = ('courseNumber', 'title', 'language')

# Register your models here.

admin.site.register(CourseInfo, CourseInfoAdmin)