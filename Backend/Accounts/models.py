from django.db import models
from django.contrib.auth.models import User
#dsd
# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    BIO = models.TextField(max_length=500, blank=True)
    def __str__(self):
        return self.user.username