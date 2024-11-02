from django.db import models
from app.Patient.models import Patient
from app.User.models import User

class Appointment(models.Model):
    STATUS_CHOICES = (
        ('Programada', 'Programada'),
        ('Completada', 'Completada'),
        ('Cancelada', 'Cancelada'),
    )

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'Médico'})
    date_time = models.DateTimeField()
    reason = models.TextField()
    status = models.CharField(max_length=50, choices=STATUS_CHOICES)

    def __str__(self):
        return f"{self.patient.full_name} - {self.date_time}"
