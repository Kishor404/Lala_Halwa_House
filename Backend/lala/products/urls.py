from django.urls import path
from .views import ProductByFranchiseView, AllProduct

urlpatterns = [
    path('franchise/<int:franchise_id>/products/', ProductByFranchiseView.as_view(), name='product-by-franchise'),
    path('products/', AllProduct.as_view(), name='all-products')
]
