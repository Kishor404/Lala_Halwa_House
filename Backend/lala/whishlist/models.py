from django.db import models
from user.models import User
from products.models import Product

class Whishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='whishlists')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='whishlisted_by')
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'product')  # Prevent duplicates
        ordering = ['-added_at']

    def __str__(self):
        return f"{self.user.phone}'s whishlist - {self.product.name}"
