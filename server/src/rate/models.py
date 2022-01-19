from django.db import models
from django.contrib.auth.models import User

class Rate(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    user = models.ForeignKey(
        User, related_name="rates", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name
