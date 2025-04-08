# urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CartViewSet

router = DefaultRouter()
router.register(r'cart', CartViewSet, basename='cart')

urlpatterns = [
    path('', include(router.urls)),
]


# 🔥 Sample API Endpoints
# Method	URL	Action
# GET	/cart/	List your carts
# POST	/cart/	Create a new cart
# GET	/cart/{id}/	View a cart
# POST	/cart/{id}/add_item/	Add product to cart
# POST	/cart/{id}/remove_item/	Remove product
