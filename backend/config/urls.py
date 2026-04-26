from django.http import HttpResponse
from django.urls import path
from django.contrib import admin

def home(request):
    return HttpResponse("Works!")

urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
]
