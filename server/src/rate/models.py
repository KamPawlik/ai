from decimal import Decimal

from django.db import models
from django.contrib.auth.models import User
from django.core import validators

class Rate(models.Model):
    name = models.CharField(max_length=200)

    description = models.TextField(blank=True)

    user = models.ForeignKey(
        User, related_name="rates", on_delete=models.CASCADE
    )

    floor = models.IntegerField()

    year = models.IntegerField()

    sq = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        null=True,
        validators=[validators.MinValueValidator(Decimal("0.00"))],
    )

    rooms = models.IntegerField()

    price = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        null=True,
        validators=[validators.MinValueValidator(Decimal("0.00"))],
    )

    def __str__(self):
        return self.name
