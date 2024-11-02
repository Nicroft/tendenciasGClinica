import pytest
from django.utils.timezone import now, timedelta
from app.MedicalRecord.models import MedicalRecord
from app.Patient.models import Patient
from app.User.models import User

@pytest.fixture
def create_patient():
    """Fixture que crea un paciente de prueba."""
    return Patient.objects.create(
        full_name="Carlos Pérez",
        birth_date="1990-05-14",
        gender="M",
        address="Calle 123",
        phone_number="5551234",
        email="carlos@gmail.com",
        emergency_contact_name="Ana Pérez",
        emergency_contact_phone="5555678",
        insurance_company="Sura",
        policy_number="12345",
        policy_status="Vigente",
        policy_expiry="2025-01-01"
    )

@pytest.fixture
def create_doctor():
    """Fixture que crea un usuario doctor."""
    return User.objects.create(
        username="dr_juan",
        full_name="Dr. Juan López",
        email="juan@hospital.com",
        phone_number="5556789",
        role="Médico",
        birth_date="1980-06-15",
        address="Avenida 45",
        is_active=True
    )

@pytest.mark.django_db
def test_create_medical_record(create_patient, create_doctor):
    """Prueba que verifica la creación de un registro médico."""
    medical_record = MedicalRecord.objects.create(
        patient=create_patient,
        date=now().date(),
        description="Consulta general",
        doctor=create_doctor
    )

    assert medical_record.id is not None
    assert medical_record.patient == create_patient
    assert medical_record.doctor == create_doctor
    assert medical_record.description == "Consulta general"

@pytest.mark.django_db
def test_update_medical_record_description(create_patient, create_doctor):
    """Prueba que verifica la actualización de la descripción de un registro médico."""
    medical_record = MedicalRecord.objects.create(
        patient=create_patient,
        date=now().date(),
        description="Consulta inicial",
        doctor=create_doctor
    )

    medical_record.description = "Consulta de seguimiento"
    medical_record.save()

    updated_record = MedicalRecord.objects.get(id=medical_record.id)
    assert updated_record.description == "Consulta de seguimiento"

@pytest.mark.django_db
def test_delete_medical_record(create_patient, create_doctor):
    """Prueba que verifica la eliminación de un registro médico."""
    medical_record = MedicalRecord.objects.create(
        patient=create_patient,
        date=now().date(),
        description="Consulta general",
        doctor=create_doctor
    )

    record_id = medical_record.id
    medical_record.delete()

    with pytest.raises(MedicalRecord.DoesNotExist):
        MedicalRecord.objects.get(id=record_id)
