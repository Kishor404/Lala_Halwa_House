from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils.translation import gettext_lazy as _

class UserManager(BaseUserManager):
    def create_user(self, phone, password=None, **extra_fields):
        if not phone:
            raise ValueError(_('The Phone field must be set'))
        
        phone = str(phone).strip()  

        user = self.model(phone=phone, **extra_fields)
        user.set_password(password)  # Encrypts the password
        user.save(using=self._db)
        return user

    def create_superuser(self, phone, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'admin')
        
        return self.create_user(phone, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ('user', 'User'),
        ('franchise', 'Franchise'),
        ('admin', 'Admin'),
    )

    phone = models.CharField(_('phone'), max_length=30, unique=True)
    name = models.CharField(_('name'), max_length=30, blank=True)
    cart = models.CharField(_('cart'), max_length=255, blank=True, null=True)
    wishlist = models.CharField(_('wishlist'), max_length=255, blank=True, null=True)
    address = models.JSONField(_('address'), default=dict, blank=True)
    role = models.CharField(
        max_length=10,
        choices=ROLE_CHOICES,
        default='user',
    )
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'phone'
    REQUIRED_FIELDS = []  # No extra required fields

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def __str__(self):
        return self.phone
