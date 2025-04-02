from rest_framework import serializers
from .models import Product, Category
from franchise.serializers import FranchiseSerializer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    franchise = FranchiseSerializer()
    category = CategorySerializer()

    class Meta:
        model = Product
        fields = '__all__'
