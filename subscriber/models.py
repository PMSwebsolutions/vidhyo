from django.db import models

# Create your models here.
class Subscriber(models.Model):
    email = models.EmailField(max_length=254,unique=True)
    def __str__(self):
        return str(self.email)
