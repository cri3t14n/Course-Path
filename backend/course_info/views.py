from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CourseInfoSerializer
from .models import CourseInfo

# Create your views here.

class CourseInfoView(viewsets.ModelViewSet):
    serializer_class = CourseInfoSerializer
    queryset = CourseInfo.objects.all()