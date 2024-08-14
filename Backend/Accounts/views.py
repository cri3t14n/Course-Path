from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import authenticate

# Create your views here.
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


