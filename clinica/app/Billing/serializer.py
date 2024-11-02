from rest_framework import serializers
from .models import Billing

class BillingSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.full_name', read_only=True)  

    class Meta:
        model = Billing
        fields = ['id', 'patient', 'patient_name', 'date', 'amount', 'details', 'payment_status'] 
