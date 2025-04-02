from rest_framework import serializers
from .models import Franchise

class FranchiseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Franchise
        fields = '__all__'
