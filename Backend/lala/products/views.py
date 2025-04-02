from rest_framework import generics
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer

# Get products by branch
class ProductByFranchiseView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        franchise_id = self.kwargs['franchise_id']
        return Product.objects.filter(franchise__id=franchise_id)

class AllProduct(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.filter(is_available=True, stock__gt=0)