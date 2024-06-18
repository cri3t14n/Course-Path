from rest_framework import serializers
from .models import CourseInfo

class CourseInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseInfo
        fields = ('courseNumber', 'title', 'language')