from rest_framework import serializers
from .models import CourseInfo, DegreeRequirements, CoursePlan

class CourseInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseInfo
        fields = '__all__'

class DegreeRequirementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DegreeRequirements
        fields = '__all__'

class CoursePlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoursePlan
        fields = '__all__'