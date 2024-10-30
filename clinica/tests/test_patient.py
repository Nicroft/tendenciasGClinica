import pytest
from app.Patient.models import Patient

@pytest.mark.django_db
def test_create_patient():
    """Prueba que verifica la creación de un paciente."""
    patient = Patient.objects.create(
        full_name="Laura Gómez",
        birth_date="1990-06-15",
        gender="F",
        address="Calle 45 #12-34",
        phone_number="5551234",
        email="la   ura.gomez@gmail.com",
        emergency_contact_name="Carlos Gómez",
        emergency_contact_phone="5555678",
        insurance_company="Sura",
        policy_number="POL12345",
        policy_status="Vigente",
        policy_expiry="2025-06-15"
    )

    assert patient.id is not None
    assert patient.full_name == "Laura Gómez"
    assert patient.gender == "F"
    assert patient.insurance_company == "Sura"

@pytest.mark.django_db
def test_update_patient_address():
    """Prueba que verifica la actualización de la dirección del paciente."""
    patient = Patient.objects.create(
        full_name="Juan Pérez",
        birth_date="1985-05-20",
        gender="M",
        address="Calle 10 #23-45",
        phone_number="5556789",
        email="juan.perez@gmail.com",
        emergency_contact_name="Ana Pérez",
        emergency_contact_phone="5559999",
        insurance_company="Colsanitas",
        policy_number="POL67890",
        policy_status="Vigente",
        policy_expiry="2026-05-20"
    )

    patient.address = "Carrera 15 #45-67"
    patient.save()

    updated_patient = Patient.objects.get(id=patient.id)
    assert updated_patient.address == "Carrera 15 #45-67"

@pytest.mark.django_db
def test_delete_patient():
    """Prueba que verifica la eliminación de un paciente."""
    patient = Patient.objects.create(
        full_name="Mario Gutiérrez",
        birth_date="1975-08-10",
        gender="M",
        address="Avenida 30 #55-23",
        phone_number="5554321",
        email="mario.gutierrez@gmail.com",
        emergency_contact_name="Sandra Gutiérrez",
        emergency_contact_phone="5558888",
        insurance_company="Compensar",
        policy_number="POL54321",
        policy_status="Vigente",
        policy_expiry="2027-08-10"
    )

    patient_id = patient.id
    patient.delete()

    with pytest.raises(Patient.DoesNotExist):
        Patient.objects.get(id=patient_id)

@pytest.mark.django_db
def test_patient_str_representation():
    """Prueba que verifica la representación en string del paciente."""
    patient = Patient.objects.create(
        full_name="Ana Morales",
        birth_date="1992-04-12",
        gender="F",
        address="Calle 90 #12-34",
        phone_number="5559876",
        email="ana.morales@gmail.com",
        emergency_contact_name="Luis Morales",
        emergency_contact_phone="5551111",
        insurance_company="Sura",
        policy_number="POL98765",
        policy_status="Vigente",
        policy_expiry="2024-04-12"
    )

    assert str(patient) == "Ana Morales"
