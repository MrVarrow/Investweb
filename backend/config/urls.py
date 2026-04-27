from django.http import JsonResponse
from django.urls import path
from django.contrib import admin

def test_api(request):
    return JsonResponse({"message": "Hello from Django 🚀"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/test/', test_api),
]
