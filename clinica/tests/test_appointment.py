import pytest
from django.utils.timezone import now, timedelta
from app.Patient.models import Patient
from app.User.models import User
from app.Appointment.models import Appointment

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
    """Fixture que crea un doctor."""
    return User.objects.create(
        username="dr_juan",
        email="juan@hospital.com",
        full_name="Dr. Juan López",
        phone_number="5556789",
        birth_date="1980-05-20",
        address="Calle 45",
        role="Médico",
        is_active=True,
        is_admin=False
    )

@pytest.mark.django_db
def test_create_appointment(create_patient, create_doctor):
    """Prueba para verificar la creación de una cita."""
    appointment = Appointment.objects.create(
        patient=create_patient,
        doctor=create_doctor,
        date_time=now() + timedelta(days=1),
        reason="Consulta general",
        status="Programada"
    )

    assert appointment.id is not None
    assert appointment.patient == create_patient
    assert appointment.doctor == create_doctor
    assert appointment.status == "Programada"

@pytest.mark.django_db
def test_update_appointment_status(create_patient, create_doctor):
    """Prueba para verificar la actualización del estado de una cita."""
    appointment = Appointment.objects.create(
        patient=create_patient,
        doctor=create_doctor,
        date_time=now() + timedelta(days=1),
        reason="Consulta general",
        status="Programada"
    )

    appointment.status = "Completada"
    appointment.save()

    updated_appointment = Appointment.objects.get(id=appointment.id)
    assert updated_appointment.status == "Completada"

@pytest.mark.django_db
def test_delete_appointment(create_patient, create_doctor):
    """Prueba para verificar la eliminación de una cita."""
    appointment = Appointment.objects.create(
        patient=create_patient,
        doctor=create_doctor,
        date_time=now() + timedelta(days=1),
        reason="Consulta general",
        status="Programada"
    )

    appointment_id = appointment.id
    appointment.delete()

    with pytest.raises(Appointment.DoesNotExist):
        Appointment.objects.get(id=appointment_id)

@pytest.mark.django_db
def test_create_appointment_without_required_fields(create_patient):
    """Prueba que verifica que no se pueda crear una cita sin un doctor."""
    with pytest.raises(Exception):
        Appointment.objects.create(
            patient=create_patient,
            date_time=now() + timedelta(days=1),
            reason="Consulta sin doctor",
            status="Programada"
        )
