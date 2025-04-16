from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WhishlistViewSet

router = DefaultRouter()
router.register(r'whishlist', WhishlistViewSet, basename='whishlist')

urlpatterns = [
    path('', include(router.urls)),
]
