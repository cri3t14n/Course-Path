from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CourseInfoSerializer, DegreeRequirementsSerializer, CoursePlanSerializer
from .models import CourseInfo, DegreeRequirements, CoursePlan
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import authenticate
import json



@csrf_exempt
def submit_login_form(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username', '')
            password = data.get('password', '')

            user = authenticate(request, username=username, password=password)
            if user is not None:
                return JsonResponse({'message': 'Login successful!'}, status=200)
            else:
                return JsonResponse({'message': 'Invalid username or password.'}, status=401)

        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON.'}, status=400)

    return JsonResponse({'message': 'Invalid request method.'}, status=405)




class HelloWorld(APIView):
    def get(self, request):
        return Response({"message": "Hello Cristian and Tobias!"}, status=status.HTTP_200_OK)


class CoursePlanDetailAPIView(APIView):
    # Disable authentication and permissions
    authentication_classes = []
    permission_classes = []

    def get(self, request, pk, *args, **kwargs):
        """
        Retrieve a course plan by its primary key/id.
        """
        try:
            plan = CoursePlan.objects.get(pk=pk)
            serializer = CoursePlanSerializer(plan)
            return Response(serializer.data)
        except CoursePlan.DoesNotExist:
            return Response({'message': 'CoursePlan not found'}, status=status.HTTP_404_NOT_FOUND)
        

class CourseInfoAPIView(viewsets.ModelViewSet):
    authentication_classes = []
    permission_classes = []
    queryset = CourseInfo.objects.all()
    serializer_class = CourseInfoSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = self.queryset
        username = self.request.query_params.get('username', None)
        if username is not None:
            queryset = queryset.filter(user__username=username)
        return queryset