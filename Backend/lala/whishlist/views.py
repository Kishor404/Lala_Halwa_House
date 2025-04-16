from rest_framework import viewsets, permissions
from .models import Whishlist
from .serializers import WhishlistSerializer

class WhishlistViewSet(viewsets.ModelViewSet):
    serializer_class = WhishlistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Whishlist.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
