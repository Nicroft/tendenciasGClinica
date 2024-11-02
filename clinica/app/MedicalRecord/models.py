from django.db import models
from app.Patient.models import Patient
from app.User.models import User

class MedicalRecord(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    date = models.DateField()
    description = models.TextField()
    doctor = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'Médico'})

def __str__(self):
    return f"Registro médico de {self.patient.full_name} - {self.date} - Doctor: {self.doctor.full_name}"
