from django.db import models
from app.Patient.models import Patient

class Billing(models.Model):
    PAYMENT_STATUS = (
        ('Pagado', 'Pagado'),
        ('Pendiente', 'Pendiente'),
    )

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    details = models.TextField()
    payment_status = models.CharField(max_length=50, choices=PAYMENT_STATUS)

    def __str__(self):
        return f"Factura de {self.patient.full_name} - {self.date}"
