from rest_framework import serializers
from .models import CourseInfo

class CourseInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseInfo
        fields = ('courseNumber', 'department', 'title', 'language', 'courseType', 'schedule', 'notApplicableWith', 'recomendedPrerequisites', 'course_url', 'completed')