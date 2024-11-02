import pytest
from app.User.models import User

@pytest.mark.django_db
def test_create_user():
    """Prueba que verifica la creación de un usuario."""
    user = User.objects.create_user(
        email="juan.perez@example.com",
        username="juanperez",
        password="securepassword123",
        full_name="Juan Pérez",
        phone_number="5556789",
        birth_date="1990-01-01",
        address="Calle 123",
        role="Médico",
    )

    assert user.id is not None
    assert user.email == "juan.perez@example.com"
    assert user.check_password("securepassword123") is True
    assert user.is_active is True
    assert user.is_admin is False

@pytest.mark.django_db
def test_create_superuser():
    """Prueba que verifica la creación de un superusuario."""
    superuser = User.objects.create_superuser(
        email="admin@example.com",
        username="admin",
        password="adminpassword123",
        full_name="Admin User",  
        phone_number="5550000",  
        birth_date="1990-01-01",  
        address="Calle 1",        
        role="Médico",            
    )

    assert superuser.id is not None
    assert superuser.email == "admin@example.com"
    assert superuser.is_admin is True
    assert superuser.is_staff is True

@pytest.mark.django_db
def test_update_user_role():
    """Prueba que verifica la actualización del rol de un usuario."""
    user = User.objects.create_user(
        email="maria.lopez@example.com",
        username="marialopez",
        password="password123",
        full_name="Maria López",
        phone_number="5551234",
        birth_date="1985-05-15",
        address="Carrera 10",
        role="Administrativo",
    )

    user.role = "Enfermera"
    user.save()

    updated_user = User.objects.get(id=user.id)
    assert updated_user.role == "Enfermera"

@pytest.mark.django_db
def test_delete_user():
    """Prueba que verifica la eliminación de un usuario."""
    user = User.objects.create_user(
        email="carlos.mendez@example.com",
        username="carlosmendez",
        password="password321",
        full_name="Carlos Méndez",
        phone_number="5554567",
        birth_date="1978-12-30",
        address="Avenida 30",
        role="Médico",
    )

    user_id = user.id
    user.delete()

    with pytest.raises(User.DoesNotExist):
        User.objects.get(id=user_id)

@pytest.mark.django_db
def test_user_str_representation():
    """Prueba que verifica la representación en string de un usuario."""
    user = User.objects.create_user(
        email="ana.martinez@example.com",
        username="anamartinez",
        password="securepass",
        full_name="Ana Martínez",
        phone_number="5556789",
        birth_date="1992-04-10",
        address="Calle 45",
        role="Médico",
    )

    assert str(user) == "Ana Martínez"
