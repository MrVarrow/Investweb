from django.test import TestCase
from django.contrib.auth.models import User
from users.serializers import RegisterSerializer, LoginSerializer, UserProfileSerializer
from users.models import UserProfile

class RegisterSerializerTest(TestCase):
    def setUp(self):
        self.profile = {
            "username": "john",
            "email": "john@test.com",
            "password": "pass",
            "first_name": "John",
            "last_name": "Doe",
            "date_of_birth": "2000-01-01",
            "gender": "male"
        }

    def test_register_create_user_profile(self):
        serializer = RegisterSerializer(data=self.profile)

        self.assertTrue(serializer.is_valid())

        user = serializer.save()
        self.assertTrue(User.objects.filter(username="john").exists())
        self.assertTrue(User.objects.filter(email="john@test.com").exists())
        self.assertTrue(UserProfile.objects.filter(user=user).exists())
        self.assertTrue(user.check_password("pass"))

    def test_missing_fields(self):
        data = self.profile.copy()
        data.pop('username')

        serializer = RegisterSerializer(data=data)

        self.assertFalse(serializer.is_valid())

class LoginSerializerTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="john",
            password="pass"
        )

        self.valid_data = {
            "username": "john",
            "password": "pass"
        }

        self.invalid_data = {
            "username": "john",
            "password": "wrong"
        }

    def test_valid_login(self):
        serializer = LoginSerializer(data=self.valid_data)


        self.assertTrue(serializer.is_valid())
        self.assertTrue(serializer.validated_data["user"], self.user)
        self.assertTrue(serializer.validated_data["password"], self.user)

    def test_invalid_login(self):
        serializer = LoginSerializer(data=self.invalid_data)

        self.assertFalse(serializer.is_valid())


class UserProfileSerializerTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="john",
            password="pass"
        )

        self.profile = UserProfile.objects.create(
            user=self.user,
            date_of_birth="2000-01-01",
            gender="male"
        )

    def test_profile_output(self):
        serializer = UserProfileSerializer(self.profile)
        data = serializer.data

        self.assertEqual(data["gender"], "male")
        self.assertEqual(data["date_of_birth"], "2000-01-01")
        self.assertEqual(data["user"]["username"], "john")