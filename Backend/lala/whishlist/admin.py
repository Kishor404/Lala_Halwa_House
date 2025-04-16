from django.contrib import admin
from .models import Whishlist

admin.site.register(Whishlist)

admin.site.site_header = "Lala's Halwa Karan"
admin.site.site_title = "Lala Admin Portal"
admin.site.index_title = "Welcome to the Admin Dashboard"
