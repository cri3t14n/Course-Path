"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from course_info import views


router = routers.DefaultRouter()
router.register(r'Course-Info', views.CourseInfoAPIView, basename='course-info')

urlpatterns = [
    path('api/login/', views.submit_login_form, name='submit_login_form'),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/hello/', views.HelloWorld.as_view(), name='hello_world'),
    path('api/Course-Plan/<int:pk>/', views.CoursePlanDetailAPIView.as_view(), name='course_plan'),
    
    path('api/Course-Info/<int:pk>/', views.CourseInfoAPIView.as_view({
        'get': 'retrieve',  # Retrieve a single instance
        'put': 'update',    # Update a single instance
        'patch': 'partial_update',  # Partially update a single instance
        'delete': 'destroy' # Delete a single instance
    }), name='course_info_detail'),
]
