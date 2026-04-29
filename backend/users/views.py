from django.contrib.auth import login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets, permissions
from .models import UserProfile
from .serializers import RegisterSerializer, LoginSerializer, UserProfileSerializer


# REGISTER
class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created"}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# LOGIN (SESSION AUTH)
class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data["user"]
            login(request, user)
            return Response({"message": "Logged in"})

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# LOGOUT
class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({"message": "Logged out"})


# PROFILE CRUD (ModelViewSet)
class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.AllowAny]
