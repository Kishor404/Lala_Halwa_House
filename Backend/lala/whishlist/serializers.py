from rest_framework import serializers
from .models import Whishlist
from products.serializers import ProductSerializer
from products.models import Product

class WhishlistSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source='product',
        write_only=True
    )

    class Meta:
        model = Whishlist
        fields = ['id', 'product', 'product_id', 'added_at']
