from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserProfile(models.Model):
    gender_choices = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other')
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10, choices=gender_choices)

    def __str__(self):
        return f"{self.user.username} profile"