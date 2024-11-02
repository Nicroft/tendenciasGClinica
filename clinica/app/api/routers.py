from rest_framework.routers import DefaultRouter
from app.User.views import UserViewSet
from app.Patient.views import PatientViewSet
from app.Appointment.views import AppointmentViewSet
from app.Billing.views import BillingViewSet
from app.MedicationInventory.views import MedicationInventoryViewSet
from app.MedicalRecord.views import MedicalRecordViewSet

router = DefaultRouter()

router.register(r'User', UserViewSet, basename='user')
router.register(r'Patient', PatientViewSet, basename='patient')
router.register(r'Appointment', AppointmentViewSet, basename='appointment')
router.register(r'Billing', BillingViewSet, basename='billing')
router.register(r'MedicationInventory', MedicationInventoryViewSet, basename='medication_inventory')
router.register(r'MedicalRecord', MedicalRecordViewSet, basename='medical_record')

urlpatterns = router.urls
