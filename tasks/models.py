from django.db import models


# Create your models here.
class UserTable(models.Model):
    user_name = models.CharField(max_length=200)
    first_name = models.CharField(max_length=200, default="joe")
    last_name = models.CharField(max_length=200, default="bob")
    cash = models.FloatField(default=100000.00)
    btc = models.FloatField(default=0.00)
    eth = models.FloatField(default=0.00)
    ltc = models.FloatField(default=0.00)
