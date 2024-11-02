from django.db import models

class Patient(models.Model):
    GENDER_CHOICES = (
        ('M', 'Masculino'),
        ('F', 'Femenino'),
    )

    full_name = models.CharField(max_length=255)
    birth_date = models.DateField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField()
    emergency_contact_name = models.CharField(max_length=255)
    emergency_contact_phone = models.CharField(max_length=20)
    insurance_company = models.CharField(max_length=255)
    policy_number = models.CharField(max_length=255)
    policy_status = models.CharField(max_length=50)
    policy_expiry = models.DateField()

    def __str__(self):
        return self.full_name
