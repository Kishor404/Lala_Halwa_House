from django.db import models
from franchise.models import Franchise
from django.utils.text import slugify
import os

class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
def product_image_upload_path(instance, filename):
    """Save the image with the slug name"""
    extension = filename.split('.')[-1]  # Get file extension
    filename = f"{instance.slug}.{extension}"  # Save as slug.extension
    return os.path.join("Assets/Products/", filename)

class Product(models.Model):
    franchise = models.ForeignKey(Franchise, on_delete=models.CASCADE, related_name="products")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="products")
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    is_available = models.BooleanField(default=True)
    image = models.ImageField(upload_to=product_image_upload_path, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(f"{self.franchise.name}-{self.name}")  # Example: "main-branch-product1"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.franchise.name})"
