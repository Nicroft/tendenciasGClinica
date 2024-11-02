import pytest
from app.MedicationInventory.models import MedicationInventory

@pytest.mark.django_db
def test_create_medication():
    """Prueba que verifica la creación de un medicamento en el inventario."""
    medication = MedicationInventory.objects.create(
        name="Paracetamol",
        description="Medicamento para reducir la fiebre y aliviar el dolor",
        quantity_available=100,
        cost=5.00
    )

    assert medication.id is not None
    assert medication.name == "Paracetamol"
    assert medication.description == "Medicamento para reducir la fiebre y aliviar el dolor"
    assert medication.quantity_available == 100
    assert medication.cost == 5.00

@pytest.mark.django_db
def test_update_medication_quantity():
    """Prueba que verifica la actualización de la cantidad disponible de un medicamento."""
    medication = MedicationInventory.objects.create(
        name="Ibuprofeno",
        description="Analgésico y antiinflamatorio",
        quantity_available=50,
        cost=10.00
    )

    medication.quantity_available = 75
    medication.save()

    updated_medication = MedicationInventory.objects.get(id=medication.id)
    assert updated_medication.quantity_available == 75

@pytest.mark.django_db
def test_delete_medication():
    """Prueba que verifica la eliminación de un medicamento del inventario."""
    medication = MedicationInventory.objects.create(
        name="Aspirina",
        description="Medicamento para el dolor y fiebre",
        quantity_available=200,
        cost=8.00
    )

    medication_id = medication.id
    medication.delete()

    with pytest.raises(MedicationInventory.DoesNotExist):
        MedicationInventory.objects.get(id=medication_id)

@pytest.mark.django_db
def test_medication_str_representation():
    """Prueba que verifica la representación en string de un medicamento."""
    medication = MedicationInventory.objects.create(
        name="Amoxicilina",
        description="Antibiótico para el dolor",
        quantity_available=30,
        cost=12.50
    )

    assert str(medication) == "Amoxicilina"
