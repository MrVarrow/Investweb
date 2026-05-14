from django.test import TestCase
from django.contrib.auth.models import User
from users.models import UserProfile
from django.db import IntegrityError


class UserProfileModelTest(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            password="testpassword",
        )

        self.profile = UserProfile.objects.create(
            user=self.user,
            date_of_birth="1999-03-05",
            gender="male"
        )
    def test_create_user(self):
        self.assertEqual(self.profile.user.username, "testuser")
        self.assertEqual(self.profile.gender, "male")
        self.assertEqual(str(self.profile), "testuser profile")

    def test_profile_delete(self):
        self.profile.delete()
        self.assertEqual(self.profile.user.username, "testuser")

    def test_unique_profiles(self):
        with self.assertRaises(IntegrityError):
            UserProfile.objects.create(
                user=self.user,
                date_of_birth="1999-03-05",
                gender="male"
            )
