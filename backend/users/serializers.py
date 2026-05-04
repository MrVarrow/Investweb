from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import UserProfile


# REGISTER
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    gender = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    date_of_birth = serializers.DateField()

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name', 'date_of_birth', 'gender')

    def create(self, validated_data):
        date_of_birth = validated_data.pop('date_of_birth')
        gender = validated_data.pop('gender')
        first_name = validated_data.pop('first_name')
        last_name = validated_data.pop('last_name')


        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password'],
            first_name=first_name,
            last_name=last_name
        )

        UserProfile.objects.create(
            user=user,
            date_of_birth=date_of_birth,
            gender=gender
        )

        return user

# LOGIN
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(
            username=data.get("username"),
            password=data.get("password")
        )

        if not user:
            raise serializers.ValidationError("Invalid credentials")

        data["user"] = user
        return data


# PROFILE
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'