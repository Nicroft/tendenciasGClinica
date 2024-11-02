from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username'],
            full_name=validated_data['full_name'],
            phone_number=validated_data['phone_number'],
            birth_date=validated_data['birth_date'],
            address=validated_data['address'],
            role=validated_data['role'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
