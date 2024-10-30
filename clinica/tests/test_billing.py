import pytest
from app.Billing.models import Billing
from app.Patient.models import Patient
from django.utils.timezone import now, timedelta

@pytest.fixture
def create_patient():
    """Fixture para crear un paciente de prueba."""
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

@pytest.mark.django_db
def test_create_billing(create_patient):
    """Prueba la creación de una factura."""
    billing = Billing.objects.create(
        patient=create_patient,
        date=now().date(),
        amount=100.50,
        details="Consulta general",
        payment_status="Pendiente"
    )

    assert billing.id is not None
    assert billing.patient == create_patient
    assert billing.amount == 100.50
    assert billing.payment_status == "Pendiente"

@pytest.mark.django_db
def test_update_billing(create_patient):
    """Prueba la actualización de una factura."""
    billing = Billing.objects.create(
        patient=create_patient,
        date=now().date(),
        amount=100.50,
        details="Consulta general",
        payment_status="Pendiente"
    )

    billing.amount = 150.75
    billing.payment_status = "Pagado"
    billing.save()

    updated_billing = Billing.objects.get(id=billing.id)
    assert updated_billing.amount == 150.75
    assert updated_billing.payment_status == "Pagado"

@pytest.mark.django_db
def test_delete_billing(create_patient):
    """Prueba la eliminación de una factura."""
    billing = Billing.objects.create(
        patient=create_patient,
        date=now().date(),
        amount=100.50,
        details="Consulta general",
        payment_status="Pendiente"
    )

    billing_id = billing.id
    billing.delete()

    with pytest.raises(Billing.DoesNotExist):
        Billing.objects.get(id=billing_id)

@pytest.mark.django_db
def test_billing_str_representation(create_patient):
    """Prueba la representación en string de una factura."""
    billing = Billing.objects.create(
        patient=create_patient,
        date=now().date(),
        amount=100.50,
        details="Consulta general",
        payment_status="Pagado"
    )

    expected_str = f"Factura de {create_patient.full_name} - {now().date()}"
    assert str(billing) == expected_str
