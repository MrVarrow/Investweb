from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status

from users.models import UserProfile


# REGISTER
class RegisterViewTest(APITestCase):

    def setUp(self):
        self.valid_data = {
            "username": "john",
            "email": "john@test.com",
            "password": "pass",
            "first_name": "John",
            "last_name": "Doe",
            "date_of_birth": "2000-01-01",
            "gender": "male"
        }

    def test_register_user(self):
        response = self.client.post(
            "/api/register/",
            self.valid_data,
            format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED
        )

        self.assertEqual(
            response.data["message"],
            "User created"
        )

        self.assertTrue(
            User.objects.filter(username="john").exists()
        )

    def test_register_invalid_data(self):
        invalid_data = self.valid_data.copy()
        invalid_data.pop("username")

        response = self.client.post(
            "/api/register/",
            invalid_data,
            format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST
        )


# LOGIN
class LoginViewTest(APITestCase):

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
            "password": "wrongpassword"
        }

    def test_login_success(self):
        response = self.client.post(
            "/api/login/",
            self.valid_data,
            format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )

        self.assertEqual(
            response.data["message"],
            "Logged in"
        )

    def test_login_fail(self):
        response = self.client.post(
            "/api/login/",
            self.invalid_data,
            format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST
        )


# LOGOUT
class LogoutViewTest(APITestCase):

    def test_logout(self):
        response = self.client.post("/api/logout/")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )

        self.assertEqual(
            response.data["message"],
            "Logged out"
        )


# PROFILE VIEWSET
class UserProfileViewSetTest(APITestCase):

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

    # GET /profiles/
    def test_get_profiles(self):
        response = self.client.get("/api/profiles/")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )

        self.assertEqual(len(response.data), 1)

    # GET /profiles/{id}/
    def test_get_single_profile(self):
        response = self.client.get(
            f"/api/profiles/{self.profile.id}/"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )

        self.assertEqual(
            response.data["gender"],
            "male"
        )

    # PATCH /profiles/{id}/
    def test_update_profile(self):
        data = {
            "gender": "female"
        }

        response = self.client.patch(
            f"/api/profiles/{self.profile.id}/",
            data,
            format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )

        self.profile.refresh_from_db()

        self.assertEqual(
            self.profile.gender,
            "female"
        )

    # DELETE /profiles/{id}/
    def test_delete_profile(self):
        response = self.client.delete(
            f"/api/profiles/{self.profile.id}/"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT
        )

        self.assertFalse(
            UserProfile.objects.filter(
                id=self.profile.id
            ).exists()
        )