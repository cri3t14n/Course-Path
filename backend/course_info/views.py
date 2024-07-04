from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CourseInfoSerializer
from .models import CourseInfo
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


# Create your views here.

class HelloWorld(APIView):
    def get(self, request):
        return Response({"message": "Hello Cristian and Tobias! esxxdrcftvgb"}, status=status.HTTP_200_OK)


class CourseInfoView(viewsets.ModelViewSet):
    serializer_class = CourseInfoSerializer
    queryset = CourseInfo.objects.all()