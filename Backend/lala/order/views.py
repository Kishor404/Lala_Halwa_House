from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Order
from .serializers import OrderSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    authentication_classes = []  # optional
    permission_classes = [AllowAny]
