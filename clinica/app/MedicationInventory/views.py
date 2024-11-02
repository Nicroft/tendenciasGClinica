from rest_framework import viewsets
from .models import MedicationInventory
from .serializer import MedicationInventorySerializer

class MedicationInventoryViewSet(viewsets.ModelViewSet):
    queryset = MedicationInventory.objects.all()
    serializer_class = MedicationInventorySerializer
