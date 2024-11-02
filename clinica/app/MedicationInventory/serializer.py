from rest_framework import serializers
from .models import MedicationInventory

class MedicationInventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicationInventory
        fields = '__all__'
