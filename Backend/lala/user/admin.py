from django.contrib import admin
from .models import User

admin.site.register(User)

admin.site.site_header = "Lala's Halwa Karan"
admin.site.site_title = "Lala Admin Portal"
admin.site.index_title = "Welcome to the Admin Dashboard"
