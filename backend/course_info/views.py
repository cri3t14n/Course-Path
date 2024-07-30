from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CourseInfoSerializer
from .models import CourseInfo
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json



@csrf_exempt
def submit_login_form(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username', '')
            password = data.get('password', '')

            if username == 'admin@dtu.dk' and password == '1234':
                return JsonResponse({'message': 'Login successful!'}, status=200)
            else:
                return JsonResponse({'message': 'Invalid username or password.'}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON.'}, status=400)

    return JsonResponse({'message': 'Invalid request method.'}, status=405)




class HelloWorld(APIView):
    def get(self, request):
        return Response({"message": "Hello Cristian and Tobias!"}, status=status.HTTP_200_OK)




class CourseInfoView(viewsets.ModelViewSet):
    serializer_class = CourseInfoSerializer
    queryset = CourseInfo.objects.all()
